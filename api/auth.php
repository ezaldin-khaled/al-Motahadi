<?php
/**
 * Auth API endpoints.
 *
 * POST /api/auth.php              → login (username, password)
 * POST /api/auth.php?action=logout → logout
 * GET  /api/auth.php?action=me    → get current user
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// -------------------------------------------------------------------------
// GET ?action=me — get current authenticated user
// -------------------------------------------------------------------------
if ($method === 'GET' && $action === 'me') {
    $user = getCurrentUser();
    if ($user) {
        jsonResponse([
            'success' => true,
            'user' => [
                'id'       => $user['id'],
                'username' => $user['username'],
                'name'     => $user['name'],
                'email'    => $user['email'],
                'role'     => $user['role'],
            ],
        ]);
    } else {
        jsonResponse(['success' => false, 'error' => 'Not authenticated'], 401);
    }
}

// -------------------------------------------------------------------------
// POST ?action=logout — destroy session
// -------------------------------------------------------------------------
if ($method === 'POST' && $action === 'logout') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 3600,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }
    session_destroy();
    jsonResponse(['success' => true]);
}

// -------------------------------------------------------------------------
// POST — login
// -------------------------------------------------------------------------
if ($method === 'POST' && $action === '') {
    $input = getJsonBody();
    $username = trim((string)($input['username'] ?? ''));
    $password = (string)($input['password'] ?? '');

    if ($username === '' || $password === '') {
        jsonResponse(['success' => false, 'error' => 'Username and password are required'], 400);
    }

    try {
        // Look up user by username or email (two params: some PDO drivers need one binding per placeholder)
        $stmt = $pdo->prepare('
            SELECT id, username, name, email, password_hash, role, is_active
            FROM users
            WHERE (username = :u1 OR email = :u2)
            LIMIT 1
        ');
        $stmt->execute(['u1' => $username, 'u2' => $username]);
        $user = $stmt->fetch();
    } catch (PDOException $e) {
        error_log('Auth login DB error: ' . $e->getMessage());
        $msg = $e->getMessage();
        jsonResponse([
            'success' => false,
            'error'   => 'Database error: ' . $msg,
        ], 500);
    }

    if (!$user) {
        jsonResponse(['success' => false, 'error' => 'Invalid credentials'], 401);
    }

    if (!$user['is_active']) {
        jsonResponse(['success' => false, 'error' => 'Account is disabled'], 403);
    }

    if (!password_verify($password, $user['password_hash'])) {
        jsonResponse(['success' => false, 'error' => 'Invalid credentials'], 401);
    }

    // Regenerate session ID for security
    session_regenerate_id(true);

    // Store user in session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user'] = [
        'id'       => $user['id'],
        'username' => $user['username'],
        'name'     => $user['name'],
        'email'    => $user['email'],
        'role'     => $user['role'],
    ];

    try {
        $stmt = $pdo->prepare('UPDATE users SET last_login_at = NOW() WHERE id = :id');
        $stmt->execute(['id' => $user['id']]);
    } catch (PDOException $e) {
        // Non-fatal: login still succeeds
    }

    jsonResponse([
        'success' => true,
        'token'   => session_id(), // For frontend storage compatibility
        'user'    => $_SESSION['user'],
    ]);
}

// -------------------------------------------------------------------------
// Method not allowed
// -------------------------------------------------------------------------
jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
