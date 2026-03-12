<?php
/**
 * Health check — open in browser to verify config and database.
 * Example: https://yoursite.com/api/health.php
 * Remove or protect this file in production if you don't want to expose checks.
 */

header('Content-Type: application/json; charset=utf-8');

$checks = ['config' => false, 'database' => false, 'users_table' => false];
$errors = [];

// 1. Config
$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    $errors[] = 'config.php not found. Copy config.sample.php to config.php and fill in credentials.';
} else {
    try {
        $config = require $configPath;
        if (!is_array($config) || empty($config['db_name'])) {
            $errors[] = 'config.php invalid or missing db_name.';
        } else {
            $checks['config'] = true;
        }
    } catch (Throwable $e) {
        $errors[] = 'config.php error: ' . $e->getMessage();
    }
}

// 2. Database connection
if ($checks['config']) {
    try {
        $host = $config['db_host'] ?? 'localhost';
        $port = $config['db_port'] ?? null;
        $dsn = sprintf(
            'mysql:host=%s;dbname=%s;charset=%s',
            $host,
            $config['db_name'] ?? '',
            $config['db_charset'] ?? 'utf8mb4'
        );
        if ($port !== null && $port !== '') {
            $dsn .= ';port=' . (int) $port;
        }
        $pdo = new PDO($dsn, $config['db_user'] ?? '', $config['db_pass'] ?? '', [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]);
        $checks['database'] = true;
    } catch (PDOException $e) {
        $errors[] = 'Database connection failed: ' . $e->getMessage();
    }
}

// 3. Users table has the columns required for login
if ($checks['database'] && isset($pdo)) {
    try {
        $pdo->query('SELECT id, username, name, email, password_hash, role, is_active FROM users LIMIT 1');
        $checks['users_table'] = true;
    } catch (PDOException $e) {
        $errors[] = 'Users table missing or wrong structure. Re-import api/schema.sql in phpMyAdmin. MySQL: ' . $e->getMessage();
    }
}

$ok = $checks['config'] && $checks['database'] && $checks['users_table'];
http_response_code($ok ? 200 : 500);

echo json_encode([
    'ok' => $ok,
    'checks' => $checks,
    'errors' => $errors,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
