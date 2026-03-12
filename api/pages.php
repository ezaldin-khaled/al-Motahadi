<?php
/**
 * Pages API — manage page content and sections.
 *
 * GET    /api/pages.php                     → list all pages
 * GET    /api/pages.php?slug=home           → get page with all sections
 * GET    /api/pages.php?page_id=1&section=hero → get specific section
 * POST   /api/pages.php                     → save section content (requires auth)
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

// -------------------------------------------------------------------------
// GET — list pages or get page content
// -------------------------------------------------------------------------
if ($method === 'GET') {
    $slug = $_GET['slug'] ?? null;
    $pageId = isset($_GET['page_id']) ? (int)$_GET['page_id'] : null;
    $sectionKey = $_GET['section'] ?? null;
    $lang = $_GET['lang'] ?? null;

    // List all pages
    if (!$slug && !$pageId) {
        $stmt = $pdo->query('SELECT id, slug, name, is_active, sort_order FROM pages ORDER BY sort_order');
        $pages = $stmt->fetchAll();
        jsonResponse(['success' => true, 'pages' => $pages]);
    }

    // Get page ID from slug if needed
    if ($slug && !$pageId) {
        $stmt = $pdo->prepare('SELECT id FROM pages WHERE slug = :slug');
        $stmt->execute(['slug' => $slug]);
        $page = $stmt->fetch();
        if (!$page) {
            jsonResponse(['success' => false, 'error' => 'Page not found'], 404);
        }
        $pageId = $page['id'];
    }

    // Get specific section
    if ($sectionKey) {
        $sql = 'SELECT * FROM page_sections WHERE page_id = :page_id AND section_key = :section_key';
        $params = ['page_id' => $pageId, 'section_key' => $sectionKey];

        if ($lang) {
            $sql .= ' AND lang = :lang';
            $params['lang'] = $lang;
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $sections = $stmt->fetchAll();

        jsonResponse(['success' => true, 'sections' => $sections]);
    }

    // Get all sections for page
    $stmt = $pdo->prepare('
        SELECT ps.*, p.slug AS page_slug, p.name AS page_name
        FROM page_sections ps
        JOIN pages p ON p.id = ps.page_id
        WHERE ps.page_id = :page_id
        ORDER BY ps.section_key, ps.lang
    ');
    $stmt->execute(['page_id' => $pageId]);
    $sections = $stmt->fetchAll();

    // Group by section_key
    $grouped = [];
    foreach ($sections as $section) {
        $key = $section['section_key'];
        if (!isset($grouped[$key])) {
            $grouped[$key] = [];
        }
        $grouped[$key][$section['lang']] = $section;
    }

    jsonResponse(['success' => true, 'page_id' => $pageId, 'sections' => $grouped]);
}

// -------------------------------------------------------------------------
// POST — save section content (requires auth)
// -------------------------------------------------------------------------
if ($method === 'POST') {
    $user = requireAuth();
    $input = getJsonBody();

    $pageId = (int)($input['page_id'] ?? 0);
    $sectionKey = trim($input['section_key'] ?? '');
    $lang = trim($input['lang'] ?? 'en');

    if (!$pageId || !$sectionKey) {
        jsonResponse(['success' => false, 'error' => 'page_id and section_key are required'], 400);
    }

    // Verify page exists
    $pageCheck = $pdo->prepare('SELECT id FROM pages WHERE id = :id');
    $pageCheck->execute(['id' => $pageId]);
    if (!$pageCheck->fetch()) {
        jsonResponse(['success' => false, 'error' => 'Page not found'], 404);
    }

    try {
        $stmt = $pdo->prepare('
            INSERT INTO page_sections (page_id, section_key, lang, content_type, content, meta_title, meta_description, meta_keywords, updated_by)
            VALUES (:page_id, :section_key, :lang, :content_type, :content, :meta_title, :meta_description, :meta_keywords, :updated_by)
            ON DUPLICATE KEY UPDATE
                content_type = VALUES(content_type),
                content = VALUES(content),
                meta_title = VALUES(meta_title),
                meta_description = VALUES(meta_description),
                meta_keywords = VALUES(meta_keywords),
                updated_by = VALUES(updated_by),
                updated_at = CURRENT_TIMESTAMP
        ');

        $contentType = $input['content_type'] ?? 'text';
        $content = $input['content'] ?? '';

        // If content is array/object, store as JSON
        if (is_array($content)) {
            $content = json_encode($content, JSON_UNESCAPED_UNICODE);
            $contentType = 'json';
        }

        $stmt->execute([
            'page_id' => $pageId,
            'section_key' => $sectionKey,
            'lang' => $lang,
            'content_type' => $contentType,
            'content' => $content,
            'meta_title' => $input['meta_title'] ?? null,
            'meta_description' => $input['meta_description'] ?? null,
            'meta_keywords' => $input['meta_keywords'] ?? null,
            'updated_by' => $user['id'],
        ]);

        // Fetch the updated section
        $stmt = $pdo->prepare('
            SELECT * FROM page_sections
            WHERE page_id = :page_id AND section_key = :section_key AND lang = :lang
        ');
        $stmt->execute(['page_id' => $pageId, 'section_key' => $sectionKey, 'lang' => $lang]);
        $section = $stmt->fetch();

        jsonResponse(['success' => true, 'section' => $section]);

    } catch (Exception $e) {
        error_log('Page section save error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to save section'], 500);
    }
}

// -------------------------------------------------------------------------
// DELETE — delete section (requires auth)
// -------------------------------------------------------------------------
if ($method === 'DELETE') {
    $user = requireAuth();

    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Section ID is required'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM page_sections WHERE id = :id');
    $stmt->execute(['id' => $id]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['success' => false, 'error' => 'Section not found'], 404);
    }

    jsonResponse(['success' => true]);
}

// Method not allowed
jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);
