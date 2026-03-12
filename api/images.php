<?php
/**
 * Images/Media API — list and delete media files.
 *
 * GET    /api/images.php         → list all media files
 * GET    /api/images.php?id=123  → get single media file
 * DELETE /api/images.php?id=123  → delete media file (requires auth)
 * PUT    /api/images.php         → update media metadata (requires auth)
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

// -------------------------------------------------------------------------
// GET — list or single media file
// -------------------------------------------------------------------------
if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare('
            SELECT id, original_name, stored_name, url, mime_type, size_bytes, width, height, alt_text, created_at
            FROM media_files WHERE id = :id
        ');
        $stmt->execute(['id' => $id]);
        $file = $stmt->fetch();

        if (!$file) {
            jsonResponse(['success' => false, 'error' => 'File not found'], 404);
        }

        jsonResponse(['success' => true, 'file' => $file]);
    }

    // List all files
    $mimeFilter = $_GET['mime'] ?? null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

    $sql = 'SELECT id, original_name, stored_name, url, mime_type, size_bytes, width, height, alt_text, created_at FROM media_files';
    $params = [];

    if ($mimeFilter) {
        $sql .= ' WHERE mime_type LIKE :mime';
        $params['mime'] = $mimeFilter . '%';
    }

    $sql .= ' ORDER BY created_at DESC LIMIT :limit OFFSET :offset';

    $stmt = $pdo->prepare($sql);

    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value, PDO::PARAM_STR);
    }
    $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue('offset', $offset, PDO::PARAM_INT);

    $stmt->execute();
    $files = $stmt->fetchAll();

    // Get total count
    $countSql = 'SELECT COUNT(*) FROM media_files';
    if ($mimeFilter) {
        $countSql .= ' WHERE mime_type LIKE :mime';
        $countStmt = $pdo->prepare($countSql);
        $countStmt->execute(['mime' => $mimeFilter . '%']);
    } else {
        $countStmt = $pdo->query($countSql);
    }
    $total = (int)$countStmt->fetchColumn();

    jsonResponse(['success' => true, 'files' => $files, 'total' => $total]);
}

// -------------------------------------------------------------------------
// PUT — update media metadata (requires auth)
// -------------------------------------------------------------------------
if ($method === 'PUT') {
    $user = requireAuth();
    $input = getJsonBody();

    $mediaId = (int)($input['id'] ?? 0);
    if (!$mediaId) {
        jsonResponse(['success' => false, 'error' => 'Media ID is required'], 400);
    }

    // Check file exists
    $existing = $pdo->prepare('SELECT id FROM media_files WHERE id = :id');
    $existing->execute(['id' => $mediaId]);
    if (!$existing->fetch()) {
        jsonResponse(['success' => false, 'error' => 'File not found'], 404);
    }

    $updates = [];
    $params = ['id' => $mediaId];

    if (isset($input['alt_text'])) {
        $updates[] = 'alt_text = :alt_text';
        $params['alt_text'] = trim($input['alt_text']);
    }

    if (empty($updates)) {
        jsonResponse(['success' => false, 'error' => 'No fields to update'], 400);
    }

    $sql = 'UPDATE media_files SET ' . implode(', ', $updates) . ' WHERE id = :id';
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    // Fetch updated file
    $stmt = $pdo->prepare('
        SELECT id, original_name, stored_name, url, mime_type, size_bytes, width, height, alt_text, created_at
        FROM media_files WHERE id = :id
    ');
    $stmt->execute(['id' => $mediaId]);
    $file = $stmt->fetch();

    jsonResponse(['success' => true, 'file' => $file]);
}

// -------------------------------------------------------------------------
// DELETE — delete media file (requires auth)
// -------------------------------------------------------------------------
if ($method === 'DELETE') {
    $user = requireAuth();

    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Media ID is required'], 400);
    }

    // Get file info
    $stmt = $pdo->prepare('SELECT disk_path FROM media_files WHERE id = :id');
    $stmt->execute(['id' => $id]);
    $file = $stmt->fetch();

    if (!$file) {
        jsonResponse(['success' => false, 'error' => 'File not found'], 404);
    }

    // Delete from database
    $stmt = $pdo->prepare('DELETE FROM media_files WHERE id = :id');
    $stmt->execute(['id' => $id]);

    // Delete physical file
    if ($file['disk_path'] && is_file($file['disk_path'])) {
        @unlink($file['disk_path']);
    }

    jsonResponse(['success' => true]);
}

// Method not allowed
jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
