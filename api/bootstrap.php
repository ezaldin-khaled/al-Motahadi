<?php
/**
 * Common bootstrap for all API endpoints.
 * Sets headers, starts session, loads config.
 */

// Load config
$config = require __DIR__ . '/config.php';

// JSON response headers
header('Content-Type: application/json; charset=utf-8');

// CORS headers
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = $config['cors_origins'] ?? [];
if (empty($allowedOrigins) || in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
}
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Session configuration
$sessionName = $config['session_name'] ?? 'almotahadi_session';
$sessionLifetime = $config['session_lifetime'] ?? 86400 * 7;
$sessionSecure = $config['session_secure'] ?? true;
$sessionHttpOnly = $config['session_httponly'] ?? true;
$sessionSameSite = $config['session_samesite'] ?? 'Lax';

session_name($sessionName);
session_set_cookie_params([
    'lifetime' => $sessionLifetime,
    'path'     => '/',
    'domain'   => '',
    'secure'   => $sessionSecure,
    'httponly' => $sessionHttpOnly,
    'samesite' => $sessionSameSite,
]);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Send a JSON response and exit.
 */
function jsonResponse(array $data, int $status = 200): void {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Parse JSON body from request.
 */
function getJsonBody(): array {
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
    if (strpos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        return json_decode($raw, true) ?? [];
    }
    return $_POST;
}

/**
 * Require the user to be authenticated (session-based).
 * Returns the user array or sends 401 and exits.
 */
function requireAuth(): array {
    if (empty($_SESSION['user_id']) || empty($_SESSION['user'])) {
        jsonResponse(['success' => false, 'error' => 'Unauthorized'], 401);
    }
    return $_SESSION['user'];
}

/**
 * Check if the current user has one of the given roles.
 */
function requireRole(array $allowedRoles): array {
    $user = requireAuth();
    if (!in_array($user['role'] ?? '', $allowedRoles, true)) {
        jsonResponse(['success' => false, 'error' => 'Forbidden'], 403);
    }
    return $user;
}

/**
 * Get the current authenticated user or null.
 */
function getCurrentUser(): ?array {
    if (!empty($_SESSION['user_id']) && !empty($_SESSION['user'])) {
        return $_SESSION['user'];
    }
    return null;
}

/**
 * Validate required fields in input array.
 */
function validateRequired(array $input, array $fields): array {
    $errors = [];
    foreach ($fields as $field) {
        if (!isset($input[$field]) || trim((string)$input[$field]) === '') {
            $errors[] = "$field is required";
        }
    }
    return $errors;
}
