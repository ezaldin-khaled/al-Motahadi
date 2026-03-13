<?php
/**
 * One-time seeding script to populate pages, page_sections, and example blog posts
 * from static content. Run manually from the browser or CLI, then remove or protect.
 *
 * IMPORTANT: This is a simple starter; adjust content arrays to match your real copy.
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

if (($config['app_env'] ?? 'production') !== 'development') {
    jsonResponse(['success' => false, 'error' => 'Seeding disabled in this environment'], 403);
}

try {
    $pdo->beginTransaction();

    // Ensure default pages exist
    $pages = [
        ['slug' => 'home', 'name' => 'Home'],
        ['slug' => 'about', 'name' => 'About Us'],
        ['slug' => 'services', 'name' => 'Services'],
        ['slug' => 'blog', 'name' => 'Blog'],
        ['slug' => 'contact', 'name' => 'Contact Us'],
    ];

    $pageIds = [];
    foreach ($pages as $p) {
        $stmt = $pdo->prepare('SELECT id FROM pages WHERE slug = :slug');
        $stmt->execute(['slug' => $p['slug']]);
        $id = $stmt->fetchColumn();
        if (!$id) {
            $insert = $pdo->prepare('INSERT INTO pages (slug, name, is_active, sort_order) VALUES (:slug, :name, 1, 0)');
            $insert->execute(['slug' => $p['slug'], 'name' => $p['name']]);
            $id = $pdo->lastInsertId();
        }
        $pageIds[$p['slug']] = (int)$id;
    }

    // Example sections (adjust to your real content)
    $sections = [
        [
            'page_slug' => 'home',
            'section_key' => 'home_hero',
            'lang' => 'en',
            'content' => 'Welcome to Al Motahadi Rehabilitation Center.',
            'meta_title' => 'Al Motahadi Rehabilitation Center',
            'meta_description' => 'Leading rehabilitation center in Oman.',
        ],
        [
            'page_slug' => 'home',
            'section_key' => 'home_hero',
            'lang' => 'ar',
            'content' => 'مرحبًا بكم في مركز المتحدي للتأهيل.',
            'meta_title' => 'مركز المتحدي للتأهيل',
            'meta_description' => 'أفضل مركز تأهيل في عمان.',
        ],
    ];

    $upsertSection = $pdo->prepare('
        INSERT INTO page_sections (page_id, section_key, lang, content_type, content, meta_title, meta_description, meta_keywords)
        VALUES (:page_id, :section_key, :lang, :content_type, :content, :meta_title, :meta_description, :meta_keywords)
        ON DUPLICATE KEY UPDATE
            content = VALUES(content),
            content_type = VALUES(content_type),
            meta_title = VALUES(meta_title),
            meta_description = VALUES(meta_description),
            meta_keywords = VALUES(meta_keywords),
            updated_at = CURRENT_TIMESTAMP
    ');

    foreach ($sections as $s) {
        if (!isset($pageIds[$s['page_slug']])) {
            continue;
        }
        $upsertSection->execute([
            'page_id' => $pageIds[$s['page_slug']],
            'section_key' => $s['section_key'],
            'lang' => $s['lang'],
            'content_type' => 'text',
            'content' => $s['content'],
            'meta_title' => $s['meta_title'] ?? null,
            'meta_description' => $s['meta_description'] ?? null,
            'meta_keywords' => $s['meta_keywords'] ?? null,
        ]);
    }

    // Example blog seed
    $slug = 'welcome-to-al-motahadi';
    $checkPost = $pdo->prepare('SELECT id FROM blog_posts WHERE slug = :slug');
    $checkPost->execute(['slug' => $slug]);
    $postId = $checkPost->fetchColumn();

    if (!$postId) {
        $insertPost = $pdo->prepare('
            INSERT INTO blog_posts (slug, category, status, featured, read_time, published_at)
            VALUES (:slug, :category, :status, :featured, :read_time, :published_at)
        ');
        $insertPost->execute([
            'slug' => $slug,
            'category' => 'news',
            'status' => 'published',
            'featured' => 1,
            'read_time' => 5,
            'published_at' => date('Y-m-d H:i:s'),
        ]);
        $postId = (int)$pdo->lastInsertId();

        $insertTrans = $pdo->prepare('
            INSERT INTO blog_post_translations (post_id, lang, title, excerpt, body, meta_title, meta_description)
            VALUES (:post_id, :lang, :title, :excerpt, :body, :meta_title, :meta_description)
        ');

        $insertTrans->execute([
            'post_id' => $postId,
            'lang' => 'en',
            'title' => 'Welcome to Al Motahadi',
            'excerpt' => 'Discover our rehabilitation services and tailored care programs.',
            'body' => "At Al Motahadi Rehabilitation Center, we provide comprehensive rehabilitation services.\n\nOur team is dedicated to personalized care.",
            'meta_title' => 'Welcome to Al Motahadi',
            'meta_description' => 'Learn more about Al Motahadi Rehabilitation Center services.',
        ]);

        $insertTrans->execute([
            'post_id' => $postId,
            'lang' => 'ar',
            'title' => 'مرحبًا بكم في مركز المتحدي',
            'excerpt' => 'اكتشف خدمات التأهيل والبرامج المصممة خصيصًا لك.',
            'body' => "في مركز المتحدي للتأهيل نقدم خدمات تأهيل شاملة.\n\nفريقنا ملتزم برعاية شخصية لكل حالة.",
            'meta_title' => 'مرحبًا بكم في مركز المتحدي',
            'meta_description' => 'تعرف على خدمات مركز المتحدي للتأهيل.',
        ]);
    }

    $pdo->commit();

    jsonResponse([
        'success' => true,
        'message' => 'Seed completed. You can now edit content in the dashboard.',
    ]);
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('Seed error: ' . $e->getMessage());
    jsonResponse(['success' => false, 'error' => 'Seeding failed: ' . $e->getMessage()], 500);
}

