<?php
/**
 * Upload API — handle file uploads.
 *
 * POST /api/upload.php  → upload a file (requires auth)
 *   Form data:
 *     - file: the file to upload
 *     - alt_text: optional alt text for images
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
}

// Require authentication
$user = requireAuth();

// Check if file was uploaded
if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE   => 'File exceeds upload_max_filesize',
        UPLOAD_ERR_FORM_SIZE  => 'File exceeds MAX_FILE_SIZE',
        UPLOAD_ERR_PARTIAL    => 'File was only partially uploaded',
        UPLOAD_ERR_NO_FILE    => 'No file was uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temp folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        UPLOAD_ERR_EXTENSION  => 'Upload blocked by extension',
    ];
    $errorCode = $_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE;
    $errorMsg = $errorMessages[$errorCode] ?? 'Unknown upload error';
    jsonResponse(['success' => false, 'error' => $errorMsg], 400);
}

$file = $_FILES['file'];
$altText = trim($_POST['alt_text'] ?? '');

// Validate file size
$maxSize = $config['max_upload_size'] ?? 5 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    jsonResponse(['success' => false, 'error' => 'File too large. Maximum: ' . round($maxSize / 1024 / 1024) . ' MB'], 400);
}

// Validate MIME type
$allowedMimes = $config['allowed_mimes'] ?? ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file['tmp_name']);

if (!in_array($mimeType, $allowedMimes, true)) {
    jsonResponse(['success' => false, 'error' => 'File type not allowed: ' . $mimeType], 400);
}

// Validate extension
$originalName = $file['name'];
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

if (!in_array($extension, $allowedExtensions, true)) {
    jsonResponse(['success' => false, 'error' => 'File extension not allowed'], 400);
}

// Create upload directory if needed
$uploadDir = $config['upload_dir'] ?? __DIR__ . '/../uploads';
$uploadUrl = $config['upload_url'] ?? '/uploads';

// Organize by year/month
$subDir = date('Y/m');
$fullDir = $uploadDir . '/' . $subDir;

if (!is_dir($fullDir)) {
    if (!mkdir($fullDir, 0755, true)) {
        jsonResponse(['success' => false, 'error' => 'Failed to create upload directory'], 500);
    }
}

// Generate unique filename
$storedName = uniqid() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
$diskPath = $fullDir . '/' . $storedName;
$publicUrl = $uploadUrl . '/' . $subDir . '/' . $storedName;

// Move uploaded file
if (!move_uploaded_file($file['tmp_name'], $diskPath)) {
    jsonResponse(['success' => false, 'error' => 'Failed to save uploaded file'], 500);
}

// Get image dimensions if applicable
$width = null;
$height = null;
if (strpos($mimeType, 'image/') === 0 && $mimeType !== 'image/svg+xml') {
    $imageInfo = @getimagesize($diskPath);
    if ($imageInfo) {
        $width = $imageInfo[0];
        $height = $imageInfo[1];
    }
}

// Save to database
try {
    $stmt = $pdo->prepare('
        INSERT INTO media_files (original_name, stored_name, disk_path, url, mime_type, size_bytes, width, height, alt_text, uploaded_by)
        VALUES (:original_name, :stored_name, :disk_path, :url, :mime_type, :size_bytes, :width, :height, :alt_text, :uploaded_by)
    ');
    $stmt->execute([
        'original_name' => $originalName,
        'stored_name' => $storedName,
        'disk_path' => $diskPath,
        'url' => $publicUrl,
        'mime_type' => $mimeType,
        'size_bytes' => $file['size'],
        'width' => $width,
        'height' => $height,
        'alt_text' => $altText,
        'uploaded_by' => $user['id'],
    ]);

    $mediaId = (int)$pdo->lastInsertId();

    // Fetch the created record
    $stmt = $pdo->prepare('
        SELECT id, original_name, stored_name, url, mime_type, size_bytes, width, height, alt_text, created_at
        FROM media_files WHERE id = :id
    ');
    $stmt->execute(['id' => $mediaId]);
    $mediaFile = $stmt->fetch();

    jsonResponse(['success' => true, 'file' => $mediaFile], 201);

} catch (Exception $e) {
    // Clean up the uploaded file if database insert fails
    @unlink($diskPath);
    error_log('Upload save error: ' . $e->getMessage());
    jsonResponse(['success' => false, 'error' => 'Failed to save file metadata'], 500);
}
