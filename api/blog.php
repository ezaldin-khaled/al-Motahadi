<?php
/**
 * Blog API — full CRUD for blog posts.
 *
 * Endpoints:
 *   GET  /api/blog.php             → list posts (optional: status, category, lang, featured)
 *   GET  /api/blog.php?id=123      → single post by ID
 *   GET  /api/blog.php?slug=xxx    → single post by slug
 *   POST /api/blog.php             → create post (requires auth)
 *   PUT  /api/blog.php             → update post (requires auth)
 *   DELETE /api/blog.php?id=123    → delete post (requires auth)
 */

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;
$slug = isset($_GET['slug']) ? trim($_GET['slug']) : null;

// -------------------------------------------------------------------------
// GET — list or single post
// -------------------------------------------------------------------------
if ($method === 'GET') {
    // Single post by ID
    if ($id) {
        $post = fetchPostById($pdo, $id);
        if (!$post) {
            jsonResponse(['success' => false, 'error' => 'Post not found'], 404);
        }
        jsonResponse(['success' => true, 'post' => $post]);
    }

    // Single post by slug
    if ($slug) {
        $post = fetchPostBySlug($pdo, $slug);
        if (!$post) {
            jsonResponse(['success' => false, 'error' => 'Post not found'], 404);
        }
        jsonResponse(['success' => true, 'post' => $post]);
    }

    // List posts
    $status = $_GET['status'] ?? null;
    $category = $_GET['category'] ?? null;
    $featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
    $lang = $_GET['lang'] ?? 'en';
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;

    // Non-authenticated users can only see published posts
    $user = getCurrentUser();
    if (!$user && $status !== 'published') {
        $status = 'published';
    }

    $posts = fetchPosts($pdo, [
        'status' => $status,
        'category' => $category,
        'featured' => $featured,
        'lang' => $lang,
        'limit' => $limit,
        'offset' => $offset,
    ]);

    jsonResponse(['success' => true, 'posts' => $posts]);
}

// -------------------------------------------------------------------------
// POST — create new post (auth required)
// -------------------------------------------------------------------------
if ($method === 'POST') {
    $user = requireAuth();
    $input = getJsonBody();

    $errors = validateRequired($input, ['slug', 'title_en', 'excerpt_en']);
    if (!empty($errors)) {
        jsonResponse(['success' => false, 'error' => implode('. ', $errors)], 400);
    }

    // Check slug uniqueness
    $existingSlug = $pdo->prepare('SELECT id FROM blog_posts WHERE slug = :slug');
    $existingSlug->execute(['slug' => $input['slug']]);
    if ($existingSlug->fetch()) {
        jsonResponse(['success' => false, 'error' => 'Slug already exists'], 400);
    }

    try {
        $pdo->beginTransaction();

        // Insert blog_posts row
        $stmt = $pdo->prepare('
            INSERT INTO blog_posts (slug, category, status, featured, thumbnail_media_id, hero_media_id, author_id, read_time, published_at)
            VALUES (:slug, :category, :status, :featured, :thumbnail_media_id, :hero_media_id, :author_id, :read_time, :published_at)
        ');
        $stmt->execute([
            'slug' => trim($input['slug']),
            'category' => $input['category'] ?? 'news',
            'status' => $input['status'] ?? 'draft',
            'featured' => $input['featured'] ?? 0,
            'thumbnail_media_id' => $input['thumbnail_media_id'] ?: null,
            'hero_media_id' => $input['hero_media_id'] ?: null,
            'author_id' => $user['id'],
            'read_time' => $input['read_time'] ?? 5,
            'published_at' => ($input['status'] ?? 'draft') === 'published' ? ($input['published_at'] ?? date('Y-m-d H:i:s')) : null,
        ]);
        $postId = (int)$pdo->lastInsertId();

        // Insert English translation
        insertTranslation($pdo, $postId, 'en', $input);

        // Insert Arabic translation if provided
        if (!empty($input['title_ar'])) {
            insertTranslation($pdo, $postId, 'ar', [
                'title' => $input['title_ar'],
                'excerpt' => $input['excerpt_ar'] ?? '',
                'body' => $input['body_ar'] ?? '',
                'meta_title' => $input['meta_title_ar'] ?? null,
                'meta_description' => $input['meta_description_ar'] ?? null,
                'meta_keywords' => $input['meta_keywords_ar'] ?? null,
            ]);
        }

        $pdo->commit();

        $post = fetchPostById($pdo, $postId);
        jsonResponse(['success' => true, 'post' => $post], 201);

    } catch (Exception $e) {
        $pdo->rollBack();
        error_log('Blog create error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to create post'], 500);
    }
}

// -------------------------------------------------------------------------
// PUT — update existing post (auth required)
// -------------------------------------------------------------------------
if ($method === 'PUT') {
    $user = requireAuth();
    $input = getJsonBody();

    if (empty($input['id'])) {
        jsonResponse(['success' => false, 'error' => 'Post ID is required'], 400);
    }

    $postId = (int)$input['id'];

    // Check post exists
    $existing = $pdo->prepare('SELECT id FROM blog_posts WHERE id = :id');
    $existing->execute(['id' => $postId]);
    if (!$existing->fetch()) {
        jsonResponse(['success' => false, 'error' => 'Post not found'], 404);
    }

    // Check slug uniqueness (if changed)
    if (!empty($input['slug'])) {
        $slugCheck = $pdo->prepare('SELECT id FROM blog_posts WHERE slug = :slug AND id != :id');
        $slugCheck->execute(['slug' => $input['slug'], 'id' => $postId]);
        if ($slugCheck->fetch()) {
            jsonResponse(['success' => false, 'error' => 'Slug already exists'], 400);
        }
    }

    try {
        $pdo->beginTransaction();

        // Update blog_posts row
        $updates = [];
        $params = ['id' => $postId];

        $fields = ['slug', 'category', 'status', 'featured', 'thumbnail_media_id', 'hero_media_id', 'read_time'];
        foreach ($fields as $field) {
            if (isset($input[$field])) {
                $updates[] = "$field = :$field";
                $params[$field] = $input[$field];
            }
        }

        // Handle published_at
        if (isset($input['status']) && $input['status'] === 'published') {
            $updates[] = 'published_at = COALESCE(published_at, :published_at)';
            $params['published_at'] = $input['published_at'] ?? date('Y-m-d H:i:s');
        }

        if (!empty($updates)) {
            $sql = 'UPDATE blog_posts SET ' . implode(', ', $updates) . ' WHERE id = :id';
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
        }

        // Update English translation
        if (isset($input['title_en']) || isset($input['excerpt_en']) || isset($input['body_en'])) {
            upsertTranslation($pdo, $postId, 'en', $input);
        }

        // Update Arabic translation
        if (isset($input['title_ar']) || isset($input['excerpt_ar']) || isset($input['body_ar'])) {
            upsertTranslation($pdo, $postId, 'ar', [
                'title' => $input['title_ar'] ?? null,
                'excerpt' => $input['excerpt_ar'] ?? null,
                'body' => $input['body_ar'] ?? null,
                'meta_title' => $input['meta_title_ar'] ?? null,
                'meta_description' => $input['meta_description_ar'] ?? null,
                'meta_keywords' => $input['meta_keywords_ar'] ?? null,
            ]);
        }

        $pdo->commit();

        $post = fetchPostById($pdo, $postId);
        jsonResponse(['success' => true, 'post' => $post]);

    } catch (Exception $e) {
        $pdo->rollBack();
        error_log('Blog update error: ' . $e->getMessage());
        jsonResponse(['success' => false, 'error' => 'Failed to update post'], 500);
    }
}

// -------------------------------------------------------------------------
// DELETE — delete post (auth required)
// -------------------------------------------------------------------------
if ($method === 'DELETE') {
    $user = requireAuth();

    if (!$id) {
        jsonResponse(['success' => false, 'error' => 'Post ID is required'], 400);
    }

    $stmt = $pdo->prepare('DELETE FROM blog_posts WHERE id = :id');
    $stmt->execute(['id' => $id]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(['success' => false, 'error' => 'Post not found'], 404);
    }

    jsonResponse(['success' => true]);
}

// Method not allowed
jsonResponse(['success' => false, 'error' => 'Method not allowed'], 405);

// =========================================================================
// Helper functions
// =========================================================================

function fetchPosts(PDO $pdo, array $filters): array {
    $where = ['1=1'];
    $params = [];
    $lang = $filters['lang'] ?? 'en';

    if (!empty($filters['status'])) {
        $where[] = 'bp.status = :status';
        $params['status'] = $filters['status'];
    }
    if (!empty($filters['category'])) {
        $where[] = 'bp.category = :category';
        $params['category'] = $filters['category'];
    }
    if ($filters['featured'] !== null) {
        $where[] = 'bp.featured = :featured';
        $params['featured'] = $filters['featured'];
    }

    $sql = "
        SELECT
            bp.id, bp.slug, bp.category, bp.status, bp.featured,
            bp.read_time, bp.published_at, bp.created_at, bp.updated_at,
            t.title, t.excerpt,
            thumb.url AS image,
            hero.url AS image_large,
            u.name AS author_name
        FROM blog_posts bp
        LEFT JOIN blog_post_translations t ON t.post_id = bp.id AND t.lang = :lang
        LEFT JOIN media_files thumb ON thumb.id = bp.thumbnail_media_id
        LEFT JOIN media_files hero ON hero.id = bp.hero_media_id
        LEFT JOIN users u ON u.id = bp.author_id
        WHERE " . implode(' AND ', $where) . "
        ORDER BY bp.published_at DESC, bp.created_at DESC
        LIMIT :limit OFFSET :offset
    ";

    $stmt = $pdo->prepare($sql);
    $params['lang'] = $lang;
    $params['limit'] = $filters['limit'] ?? 100;
    $params['offset'] = $filters['offset'] ?? 0;

    foreach ($params as $key => $value) {
        $type = is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR;
        $stmt->bindValue($key, $value, $type);
    }

    $stmt->execute();
    return $stmt->fetchAll();
}

function fetchPostById(PDO $pdo, int $id): ?array {
    $stmt = $pdo->prepare("
        SELECT
            bp.id, bp.slug, bp.category, bp.status, bp.featured,
            bp.read_time, bp.published_at, bp.created_at, bp.updated_at,
            bp.thumbnail_media_id, bp.hero_media_id, bp.author_id,
            ten.title AS title_en, ten.excerpt AS excerpt_en, ten.body AS body_en,
            ten.meta_title AS meta_title_en, ten.meta_description AS meta_description_en, ten.meta_keywords AS meta_keywords_en,
            tar.title AS title_ar, tar.excerpt AS excerpt_ar, tar.body AS body_ar,
            tar.meta_title AS meta_title_ar, tar.meta_description AS meta_description_ar, tar.meta_keywords AS meta_keywords_ar,
            thumb.url AS image,
            hero.url AS image_large,
            u.name AS author_name
        FROM blog_posts bp
        LEFT JOIN blog_post_translations ten ON ten.post_id = bp.id AND ten.lang = 'en'
        LEFT JOIN blog_post_translations tar ON tar.post_id = bp.id AND tar.lang = 'ar'
        LEFT JOIN media_files thumb ON thumb.id = bp.thumbnail_media_id
        LEFT JOIN media_files hero ON hero.id = bp.hero_media_id
        LEFT JOIN users u ON u.id = bp.author_id
        WHERE bp.id = :id
    ");
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch();
    return $row ?: null;
}

function fetchPostBySlug(PDO $pdo, string $slug): ?array {
    $stmt = $pdo->prepare("
        SELECT
            bp.id, bp.slug, bp.category, bp.status, bp.featured,
            bp.read_time, bp.published_at, bp.created_at, bp.updated_at,
            bp.thumbnail_media_id, bp.hero_media_id, bp.author_id,
            ten.title AS title_en, ten.excerpt AS excerpt_en, ten.body AS body_en,
            ten.meta_title AS meta_title_en, ten.meta_description AS meta_description_en, ten.meta_keywords AS meta_keywords_en,
            tar.title AS title_ar, tar.excerpt AS excerpt_ar, tar.body AS body_ar,
            tar.meta_title AS meta_title_ar, tar.meta_description AS meta_description_ar, tar.meta_keywords AS meta_keywords_ar,
            thumb.url AS image,
            hero.url AS image_large,
            u.name AS author_name
        FROM blog_posts bp
        LEFT JOIN blog_post_translations ten ON ten.post_id = bp.id AND ten.lang = 'en'
        LEFT JOIN blog_post_translations tar ON tar.post_id = bp.id AND tar.lang = 'ar'
        LEFT JOIN media_files thumb ON thumb.id = bp.thumbnail_media_id
        LEFT JOIN media_files hero ON hero.id = bp.hero_media_id
        LEFT JOIN users u ON u.id = bp.author_id
        WHERE bp.slug = :slug
    ");
    $stmt->execute(['slug' => $slug]);
    $row = $stmt->fetch();

    // Check if user can view draft posts
    if ($row && $row['status'] !== 'published') {
        $user = getCurrentUser();
        if (!$user) {
            return null;
        }
    }

    return $row ?: null;
}

function insertTranslation(PDO $pdo, int $postId, string $lang, array $input): void {
    $titleKey = $lang === 'en' ? 'title_en' : 'title';
    $excerptKey = $lang === 'en' ? 'excerpt_en' : 'excerpt';
    $bodyKey = $lang === 'en' ? 'body_en' : 'body';

    $stmt = $pdo->prepare('
        INSERT INTO blog_post_translations (post_id, lang, title, excerpt, body, meta_title, meta_description, meta_keywords)
        VALUES (:post_id, :lang, :title, :excerpt, :body, :meta_title, :meta_description, :meta_keywords)
    ');
    $stmt->execute([
        'post_id' => $postId,
        'lang' => $lang,
        'title' => $input[$titleKey] ?? $input['title'] ?? '',
        'excerpt' => $input[$excerptKey] ?? $input['excerpt'] ?? '',
        'body' => $input[$bodyKey] ?? $input['body'] ?? '',
        'meta_title' => $input['meta_title'] ?? null,
        'meta_description' => $input['meta_description'] ?? null,
        'meta_keywords' => $input['meta_keywords'] ?? null,
    ]);
}

function upsertTranslation(PDO $pdo, int $postId, string $lang, array $input): void {
    $titleKey = $lang === 'en' ? 'title_en' : 'title';
    $excerptKey = $lang === 'en' ? 'excerpt_en' : 'excerpt';
    $bodyKey = $lang === 'en' ? 'body_en' : 'body';

    $stmt = $pdo->prepare('
        INSERT INTO blog_post_translations (post_id, lang, title, excerpt, body, meta_title, meta_description, meta_keywords)
        VALUES (:post_id, :lang, :title, :excerpt, :body, :meta_title, :meta_description, :meta_keywords)
        ON DUPLICATE KEY UPDATE
            title = COALESCE(VALUES(title), title),
            excerpt = COALESCE(VALUES(excerpt), excerpt),
            body = COALESCE(VALUES(body), body),
            meta_title = COALESCE(VALUES(meta_title), meta_title),
            meta_description = COALESCE(VALUES(meta_description), meta_description),
            meta_keywords = COALESCE(VALUES(meta_keywords), meta_keywords),
            updated_at = CURRENT_TIMESTAMP
    ');
    $stmt->execute([
        'post_id' => $postId,
        'lang' => $lang,
        'title' => $input[$titleKey] ?? $input['title'] ?? null,
        'excerpt' => $input[$excerptKey] ?? $input['excerpt'] ?? null,
        'body' => $input[$bodyKey] ?? $input['body'] ?? null,
        'meta_title' => $input['meta_title'] ?? null,
        'meta_description' => $input['meta_description'] ?? null,
        'meta_keywords' => $input['meta_keywords'] ?? null,
    ]);
}
