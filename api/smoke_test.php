<?php
/**
 * Simple smoke test endpoint for core APIs.
 * Call /api/smoke_test.php while logged in to verify everything quickly.
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$results = [
    'auth_me' => null,
    'pages' => null,
    'blog_list' => null,
    'settings' => null,
    'media' => null,
];

// Auth check
try {
    $user = getCurrentUser();
    $results['auth_me'] = $user ? ['ok' => true, 'user' => $user] : ['ok' => false, 'error' => 'Not authenticated'];
} catch (Throwable $e) {
    $results['auth_me'] = ['ok' => false, 'error' => $e->getMessage()];
}

// Pages
try {
    $stmt = $pdo->query('SELECT id, slug, name FROM pages ORDER BY sort_order LIMIT 10');
    $results['pages'] = ['ok' => true, 'data' => $stmt->fetchAll()];
} catch (Throwable $e) {
    $results['pages'] = ['ok' => false, 'error' => $e->getMessage()];
}

// Blog
try {
    $stmt = $pdo->query('SELECT id, slug, status FROM blog_posts ORDER BY created_at DESC LIMIT 5');
    $results['blog_list'] = ['ok' => true, 'data' => $stmt->fetchAll()];
} catch (Throwable $e) {
    $results['blog_list'] = ['ok' => false, 'error' => $e->getMessage()];
}

// Settings
try {
    $stmt = $pdo->query('SELECT setting_key, setting_value FROM settings LIMIT 20');
    $results['settings'] = ['ok' => true, 'data' => $stmt->fetchAll()];
} catch (Throwable $e) {
    $results['settings'] = ['ok' => false, 'error' => $e->getMessage()];
}

// Media
try {
    $stmt = $pdo->query('SELECT id, url FROM media_files ORDER BY created_at DESC LIMIT 5');
    $results['media'] = ['ok' => true, 'data' => $stmt->fetchAll()];
} catch (Throwable $e) {
    $results['media'] = ['ok' => false, 'error' => $e->getMessage()];
}

jsonResponse(['success' => true, 'results' => $results]);

