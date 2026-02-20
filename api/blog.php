<?php
/**
 * Blog API — stub for dashboard & public blog.
 *
 * TODO: Connect your database and implement the endpoints below.
 * See BLOG_API_SPEC.md for full contract, request/response shapes, and suggested schema.
 *
 * Endpoints:
 *   GET  ?id=123  → single post
 *   GET  (no id)   → list posts (optional: lang, category, status)
 *   POST           → create post (JSON body)
 *   PUT            → update post (JSON body with id)
 *   DELETE ?id=123 → delete post
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? trim((string) $_GET['id']) : null;

// -------------------------------------------------------------------------
// GET — list or single post (stub: empty list / null single)
// -------------------------------------------------------------------------
if ($method === 'GET') {
    if ($id !== '') {
        // Single post: TODO fetch from DB by id
        echo json_encode([
            'success' => true,
            'post'    => null,
        ]);
    } else {
        // List: TODO fetch from DB with optional filters (lang, category, status)
        echo json_encode([
            'success' => true,
            'posts'   => [],
        ]);
    }
    exit;
}

// -------------------------------------------------------------------------
// POST — create post (stub: not implemented)
// -------------------------------------------------------------------------
if ($method === 'POST') {
    http_response_code(501);
    echo json_encode([
        'success' => false,
        'error'   => 'Not implemented. Connect database and implement in blog.php. See BLOG_API_SPEC.md.',
    ]);
    exit;
}

// -------------------------------------------------------------------------
// PUT — update post (stub: not implemented)
// -------------------------------------------------------------------------
if ($method === 'PUT') {
    http_response_code(501);
    echo json_encode([
        'success' => false,
        'error'   => 'Not implemented. Connect database and implement in blog.php. See BLOG_API_SPEC.md.',
    ]);
    exit;
}

// -------------------------------------------------------------------------
// DELETE — delete post (stub: not implemented)
// -------------------------------------------------------------------------
if ($method === 'DELETE') {
    http_response_code(501);
    echo json_encode([
        'success' => false,
        'error'   => 'Not implemented. Connect database and implement in blog.php. See BLOG_API_SPEC.md.',
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
