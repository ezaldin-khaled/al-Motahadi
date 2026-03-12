<?php
/**
 * Redirects API — manage URL redirects.
 *
 * GET    /api/redirects.php         → list all redirects
 * GET    /api/redirects.php?id=123  → get single redirect
 * POST   /api/redirects.php         → create redirect (requires auth)
 * PUT    /api/redirects.php         → update redirect (requires auth)
 * DELETE /api/redirects.php?id=123  → delete redirect (requires auth)
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

// -------------------------------------------------------------------------
// GET — list or single redirect
// -------------------------------------------------------------------------
if ($method === 'GET') {
    if ($id) {
        $stmt = $pdo->prepare('SELECT * FROM redirects WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $redirect = $stmt->fetch();

        if (!$redirect) {
            jsonResponse(['success' => false, 'error' => 'Redirect not found'], 404);
        }

        jsonResponse(['success' => true, 'redirect' => $redirect]);
    }

    // List all redirects
    $activeOnly = isset($_GET['active']) ? (int)$_GET['active'] : null;

    $sql = 'SELECT * FROM redirects';
    $params = [];

    if ($activeOnly !== null) {
        $sql .= ' WHERE is_active = :is_active';
        $params['is_active'] = $activeOnly;
    }

    $sql .= ' ORDER BY created_at DESC';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $redirects = $stmt->fetchAll();

    jsonResponse(['success' => true, 'redirects' => $redirects]);
}

// -------------------------------------------------------------------------
// POST — create redirect (requires auth)
// -------------------------------------------------------------------------
if ($method === 'POST') {
    $user = requireAuth();
    $input = getJsonBody();

    $errors = validateRequired($input, ['source_path', 'destination_url']);
    if (!empty($errors)) {
        jsonResponse(['success' => false, 'error' => implode('. ', $errors)], 400);
    }

    $sourcePath = trim($input['source_path']);
    $destinationUrl = trim($input['destination_url']);
    $statusCode = (int)($input['status_code'] ?? 301);
    $isActive = (int)($input['is_active'] ?? 1);

    // Validate status code
    $validCodes = [301, 302, 307, 308];
    if (!in_array($statusCode, $validCodes, true)) {
        $statusCode = 301;
    }

    // Check for duplicate source path
    $check = $pdo->prepare('SELECT id FROM redirects WHERE source_path = :source_path');
    $check->execute(['source_path' => $sourcePath]);
    if ($check->fetch()) {
        jsonResponse(['success' => false, 'error' => 'Redirect for this path already exists'], 400);
    }

    try {
        $stmt = $pdo->prepare('
            INSERT INTO redirects (source_path, destination_url, status_code, is_active, created_by)
            VALUES (:source_path, :destination_url, :status_code, :is_active, :created_by)
        ');
        $stmt->execute([
            'source_path' => $sourcePath,
            'destination_url' => $destinationUrl,
            'status_code' => $statusCode,
            'is_active' => $isActive,
            'created_by' => $user['id'],
        ]);

        $redirectId = (int)$pdo->lastInsertId();

        $stmt = $pdo->prepare('SELECT * FROM redirects WHERE id = :id');
        $stmt->execute(['id' => $redirectId]);
        $redirect = $stmt->fetch();

        jsonResponse(['success' => true, 'redirect' => $redirect], 201);

    } catch (Exception $e) {
        error_log('Redirect create error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to create redirect'], 500);
    }
}

// -------------------------------------------------------------------------
// PUT — update redirect (requires auth)
// -------------------------------------------------------------------------
if ($method === 'PUT') {
    $user = requireAuth();
    $input = getJsonBody();

    $redirectId = (int)($input['id'] ?? 0);
    if (!$redirectId) {
        jsonResponse(['success' => false, 'error' => 'Redirect ID is required'], 400);
    }

    // Check redirect exists
    $existing = $pdo->prepare('SELECT id FROM redirects WHERE id = :id');
    $existing->execute(['id' => $redirectId]);
    if (!$existing->fetch()) {
        jsonResponse(['success' => false, 'error' => 'Redirect not found'], 404);
    }

    // Check for duplicate source path (if changed)
    if (!empty($input['source_path'])) {
        $check = $pdo->prepare('SELECT id FROM redirects WHERE source_path = :source_path AND id != :id');
        $check->execute(['source_path' => $input['source_path'], 'id' => $redirectId]);
        if ($check->fetch()) {
            jsonResponse(['success' => false, 'error' => 'Redirect for this path already exists'], 400);
        }
    }

    $updates = [];
    $params = ['id' => $redirectId];

    $fields = ['source_path', 'destination_url', 'status_code', 'is_active'];
    foreach ($fields as $field) {
        if (isset($input[$field])) {
            $updates[] = "$field = :$field";
            $params[$field] = $input[$field];
        }
    }

    if (empty($updates)) {
        jsonResponse(['success' => false, 'error' => 'No fields to update'], 400);
    }

    try {
        $sql = 'UPDATE redirects SET ' . implode(', ', $updates) . ' WHERE id = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        $stmt = $pdo->prepare('SELECT * FROM redirects WHERE id = :id');
        $stmt->execute(['id' => $redirectId]);
        $redirect = $stmt->fetch();

        jsonResponse(['success' => true, 'redirect' => $redirect]);

    } catch (Exception $e) {
        error_log('Redirect update error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to update redirect'], 500);
    }
}

// -------------------------------------------------------------------------
// DELETE — delete redirect (requires auth)
// -------------------------------------------------------------------------
if ($method === 'DELETE') {
    $user = requireAuth();

    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Redirect ID is required'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM redirects WHERE id = :id');
    $stmt->execute(['id' => $id]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['success' => false, 'error' => 'Redirect not found'], 404);
    }

    jsonResponse(['success' => true]);
}

// Method not allowed
jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
