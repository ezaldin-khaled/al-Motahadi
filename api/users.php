<?php
/**
 * Users API — manage admin users.
 *
 * GET    /api/users.php              → list all users (requires admin role)
 * GET    /api/users.php?id=123       → get single user
 * POST   /api/users.php              → create user (requires admin role)
 * PUT    /api/users.php              → update user (requires admin role)
 * POST   /api/users.php?action=toggle → toggle user active status
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

// -------------------------------------------------------------------------
// GET — list users or single user
// -------------------------------------------------------------------------
if ($method === 'GET') {
    requireRole(['admin']);

    if ($id) {
        $stmt = $pdo->prepare('
            SELECT id, username, email, name, role, is_active, last_login_at, created_at, updated_at
            FROM users WHERE id = :id
        ');
        $stmt->execute(['id' => $id]);
        $user = $stmt->fetch();

        if (!$user) {
            jsonResponse(['success' => false, 'error' => 'User not found'], 404);
        }

        jsonResponse(['success' => true, 'user' => $user]);
    }

    $stmt = $pdo->query('
        SELECT id, username, email, name, role, is_active, last_login_at, created_at, updated_at
        FROM users ORDER BY created_at DESC
    ');
    $users = $stmt->fetchAll();

    jsonResponse(['success' => true, 'users' => $users]);
}

// -------------------------------------------------------------------------
// POST ?action=toggle — toggle user active status
// -------------------------------------------------------------------------
if ($method === 'POST' && $action === 'toggle') {
    requireRole(['admin']);
    $input = getJsonBody();

    $userId = (int)($input['id'] ?? 0);
    $isActive = (int)($input['is_active'] ?? 0);

    if (!$userId) {
        jsonResponse(['success' => false, 'error' => 'User ID is required'], 400);
    }

    // Prevent disabling yourself
    $currentUser = getCurrentUser();
    if ($currentUser && $currentUser['id'] == $userId && !$isActive) {
        jsonResponse(['success' => false, 'error' => 'Cannot disable your own account'], 400);
    }

    $stmt = $pdo->prepare('UPDATE users SET is_active = :is_active WHERE id = :id');
    $stmt->execute(['is_active' => $isActive, 'id' => $userId]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['success' => false, 'error' => 'User not found'], 404);
    }

    jsonResponse(['success' => true]);
}

// -------------------------------------------------------------------------
// POST — create new user
// -------------------------------------------------------------------------
if ($method === 'POST' && $action === '') {
    requireRole(['admin']);
    $input = getJsonBody();

    $errors = validateRequired($input, ['username', 'email', 'password', 'name']);
    if (!empty($errors)) {
        jsonResponse(['success' => false, 'error' => implode('. ', $errors)], 400);
    }

    // Validate email
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'error' => 'Invalid email address'], 400);
    }

    // Check username uniqueness
    $check = $pdo->prepare('SELECT id FROM users WHERE username = :username OR email = :email');
    $check->execute(['username' => $input['username'], 'email' => $input['email']]);
    if ($check->fetch()) {
        jsonResponse(['success' => false, 'error' => 'Username or email already exists'], 400);
    }

    // Validate role
    $validRoles = ['admin', 'editor', 'seo'];
    $role = $input['role'] ?? 'editor';
    if (!in_array($role, $validRoles, true)) {
        $role = 'editor';
    }

    try {
        $stmt = $pdo->prepare('
            INSERT INTO users (username, email, password_hash, name, role, is_active)
            VALUES (:username, :email, :password_hash, :name, :role, :is_active)
        ');
        $stmt->execute([
            'username' => trim($input['username']),
            'email' => trim($input['email']),
            'password_hash' => password_hash($input['password'], PASSWORD_DEFAULT),
            'name' => trim($input['name']),
            'role' => $role,
            'is_active' => $input['is_active'] ?? 1,
        ]);

        $userId = (int)$pdo->lastInsertId();

        $stmt = $pdo->prepare('
            SELECT id, username, email, name, role, is_active, created_at
            FROM users WHERE id = :id
        ');
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch();

        jsonResponse(['success' => true, 'user' => $user], 201);

    } catch (Exception $e) {
        error_log('User create error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to create user'], 500);
    }
}

// -------------------------------------------------------------------------
// PUT — update existing user
// -------------------------------------------------------------------------
if ($method === 'PUT') {
    requireRole(['admin']);
    $input = getJsonBody();

    $userId = (int)($input['id'] ?? 0);
    if (!$userId) {
        jsonResponse(['success' => false, 'error' => 'User ID is required'], 400);
    }

    // Check user exists
    $existing = $pdo->prepare('SELECT id FROM users WHERE id = :id');
    $existing->execute(['id' => $userId]);
    if (!$existing->fetch()) {
        jsonResponse(['success' => false, 'error' => 'User not found'], 404);
    }

    // Check username/email uniqueness if changed
    if (!empty($input['username']) || !empty($input['email'])) {
        $check = $pdo->prepare('
            SELECT id FROM users
            WHERE (username = :username OR email = :email) AND id != :id
        ');
        $check->execute([
            'username' => $input['username'] ?? '',
            'email' => $input['email'] ?? '',
            'id' => $userId,
        ]);
        if ($check->fetch()) {
            jsonResponse(['success' => false, 'error' => 'Username or email already exists'], 400);
        }
    }

    try {
        $updates = [];
        $params = ['id' => $userId];

        if (!empty($input['username'])) {
            $updates[] = 'username = :username';
            $params['username'] = trim($input['username']);
        }
        if (!empty($input['email'])) {
            if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
                jsonResponse(['success' => false, 'error' => 'Invalid email address'], 400);
            }
            $updates[] = 'email = :email';
            $params['email'] = trim($input['email']);
        }
        if (!empty($input['name'])) {
            $updates[] = 'name = :name';
            $params['name'] = trim($input['name']);
        }
        if (!empty($input['role'])) {
            $validRoles = ['admin', 'editor', 'seo'];
            if (in_array($input['role'], $validRoles, true)) {
                $updates[] = 'role = :role';
                $params['role'] = $input['role'];
            }
        }
        if (!empty($input['password'])) {
            $updates[] = 'password_hash = :password_hash';
            $params['password_hash'] = password_hash($input['password'], PASSWORD_DEFAULT);
        }
        if (isset($input['is_active'])) {
            $updates[] = 'is_active = :is_active';
            $params['is_active'] = (int)$input['is_active'];
        }

        if (!empty($updates)) {
            $sql = 'UPDATE users SET ' . implode(', ', $updates) . ' WHERE id = :id';
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }

        $stmt = $pdo->prepare('
            SELECT id, username, email, name, role, is_active, last_login_at, created_at, updated_at
            FROM users WHERE id = :id
        ');
        $stmt->execute(['id' => $userId]);
        $user = $stmt->fetch();

        jsonResponse(['success' => true, 'user' => $user]);

    } catch (Exception $e) {
        error_log('User update error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to update user'], 500);
    }
}

// Method not allowed
jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
