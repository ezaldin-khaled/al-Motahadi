<?php
/**
 * Copy this file to config.php and fill in your credentials.
 * Do not commit config.php (it is in .gitignore).
 */

return [
    // =========================================================================
    // Database (MySQL on Hostinger)
    // =========================================================================
    'db_host' => '127.0.0.1',   // or 127.0.0.1 on same server; no need for port usually
    'db_port' => null,          // set to 3306 only if your host requires it
    'db_name' => 'YOUR_DATABASE_NAME',
    'db_user' => 'YOUR_DATABASE_USER',
    'db_pass' => 'YOUR_DATABASE_PASSWORD',
    'db_charset' => 'utf8mb4',

    // =========================================================================
    // Session settings
    // =========================================================================
    'session_name' => 'almotahadi_session',
    'session_lifetime' => 86400 * 7, // 7 days
    'session_secure' => true,        // set to false for local HTTP dev
    'session_httponly' => true,
    'session_samesite' => 'Lax',

    // =========================================================================
    // Uploads
    // =========================================================================
    'upload_dir' => __DIR__ . '/../uploads',
    'upload_url' => '/uploads',
    'max_upload_size' => 5 * 1024 * 1024, // 5 MB
    'allowed_mimes' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],

    // =========================================================================
    // Email / SMTP
    // =========================================================================
    'to_email' => 'contact@almotahadi.com',
    'from_email' => 'contact@almotahadi.com',
    'from_name' => 'Al Motahadi Rehabilitation Center',
    'smtp_host' => 'smtp.hostinger.com',
    'smtp_port' => 587,
    'smtp_secure' => 'tls',
    'smtp_user' => 'contact@almotahadi.com',
    'smtp_pass' => 'YOUR_EMAIL_PASSWORD',

    // =========================================================================
    // CORS (leave empty to allow any origin; set in production for security)
    // =========================================================================
    'cors_origins' => [],

    // =========================================================================
    // App
    // =========================================================================
    'app_env' => 'production', // 'development' shows detailed errors
];
