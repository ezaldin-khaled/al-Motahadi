<?php
/**
 * Database connection (PDO).
 * Include this file to get a $pdo instance.
 */

if (!isset($config)) {
    $config = require __DIR__ . '/config.php';
}

$dsn = sprintf(
    'mysql:host=%s;dbname=%s;charset=%s',
    $config['db_host'] ?? 'localhost',
    $config['db_name'] ?? '',
    $config['db_charset'] ?? 'utf8mb4'
);

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $config['db_user'] ?? '', $config['db_pass'] ?? '', $options);
} catch (PDOException $e) {
    http_response_code(500);
    if (($config['app_env'] ?? 'production') === 'development') {
        echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    }
    exit;
}
