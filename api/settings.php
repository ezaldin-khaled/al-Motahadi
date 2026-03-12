<?php
/**
 * Settings API — get/save global site settings.
 *
 * GET  /api/settings.php           → get all settings (public)
 * POST /api/settings.php           → save settings (requires auth)
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------------------
// GET — get all settings
// -------------------------------------------------------------------------
if ($method === 'GET') {
    $group = $_GET['group'] ?? null;

    $sql = 'SELECT setting_key, setting_value, setting_group FROM settings';
    $params = [];

    if ($group) {
        $sql .= ' WHERE setting_group = :group';
        $params['group'] = $group;
    }

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['setting_key']] = $row['setting_value'];
    }

    jsonResponse(['success' => true, 'settings' => $settings]);
}

// -------------------------------------------------------------------------
// POST — save settings (auth required)
// -------------------------------------------------------------------------
if ($method === 'POST') {
    $user = requireAuth();
    $input = getJsonBody();

    if (empty($input) || !is_array($input)) {
        jsonResponse(['success' => false, 'error' => 'No settings provided'], 400);
    }

    try {
        $stmt = $pdo->prepare('
            INSERT INTO settings (setting_key, setting_value, updated_by)
            VALUES (:key, :value, :updated_by)
            ON DUPLICATE KEY UPDATE
                setting_value = VALUES(setting_value),
                updated_by = VALUES(updated_by),
                updated_at = CURRENT_TIMESTAMP
        ');

        foreach ($input as $key => $value) {
            if (!is_string($key)) continue;
            $stmt->execute([
                'key' => $key,
                'value' => is_array($value) ? json_encode($value) : (string)$value,
                'updated_by' => $user['id'],
            ]);
        }

        jsonResponse(['success' => true]);

    } catch (Exception $e) {
        error_log('Settings save error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to save settings'], 500);
    }
}

// Method not allowed
jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
