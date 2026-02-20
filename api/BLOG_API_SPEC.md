# Blog API — Backend contract & database spec

Use this spec to implement the blog API in `api/blog.php`. The dashboard at `/dashboard/blog` will call these endpoints once the backend is connected.

## Base URL

- Same as contact API: `/api/blog.php` (or set `VITE_API_BASE_URL` if the frontend is on a different origin).

## Authentication (future)

- For now, no auth. Later you can add session or JWT and require a valid admin token for POST / PUT / DELETE. GET can remain public for the public blog page.

---

## Endpoints

### 1. List posts — GET `/api/blog.php`

**Query (optional):**

| Param    | Type   | Description                          |
|----------|--------|--------------------------------------|
| `lang`   | string | `en` or `ar` (for title/excerpt)    |
| `category` | string | Filter by category (see categories below) |
| `status` | string | `published` (default) or `draft`     |

**Response (200):**

```json
{
  "success": true,
  "posts": [
    {
      "id": "1",
      "slug": "importance-of-early-rehabilitation",
      "title": "Why Early Rehabilitation Matters...",
      "excerpt": "Starting rehabilitation soon after...",
      "category": "rehabilitation",
      "date": "2025-02-15",
      "read_time": 5,
      "image": "/service-images/2.png",
      "author_name": "Dr. Sarah Mitchell",
      "author_key": "blog.author1",
      "status": "published",
      "featured": true,
      "created_at": "2025-02-10T12:00:00Z",
      "updated_at": "2025-02-10T12:00:00Z"
    }
  ]
}
```

- `title` and `excerpt`: return the value for the requested `lang` (or both as `title_en`/`title_ar` if you prefer; frontend can pick).
- Categories: `rehabilitation` | `wellness` | `tips` | `news` | `research`.

---

### 2. Get one post — GET `/api/blog.php?id=123`

**Response (200):**

```json
{
  "success": true,
  "post": {
    "id": "1",
    "slug": "importance-of-early-rehabilitation",
    "title_en": "Why Early Rehabilitation Matters...",
    "title_ar": "لماذا يهم البدء بالتأهيل...",
    "excerpt_en": "Starting rehabilitation soon...",
    "excerpt_ar": "بدء التأهيل بعد...",
    "category": "rehabilitation",
    "date": "2025-02-15",
    "read_time": 5,
    "image": "/service-images/2.png",
    "author_key": "blog.author1",
    "status": "published",
    "featured": true,
    "created_at": "2025-02-10T12:00:00Z",
    "updated_at": "2025-02-10T12:00:00Z"
  }
}
```

**Response (404):** `{ "success": false, "error": "Post not found" }`

---

### 3. Create post — POST `/api/blog.php`

**Body (JSON):**

```json
{
  "slug": "my-new-post",
  "title_en": "Title in English",
  "title_ar": "العنوان بالعربية",
  "excerpt_en": "Short summary in English.",
  "excerpt_ar": "ملخص قصير بالعربية.",
  "category": "tips",
  "date": "2025-03-01",
  "read_time": 4,
  "image": "/uploads/blog/my-image.jpg",
  "author_key": "blog.author2",
  "status": "draft",
  "featured": false
}
```

- `slug`: required, unique, URL-safe.
- `title_en`, `title_ar`, `excerpt_en`, `excerpt_ar`: required for i18n.
- `category`: one of the five categories above.
- `status`: `draft` | `published`.
- `author_key`: optional; if you store author names in DB you can use `author_name` instead.

**Response (201):** `{ "success": true, "post": { ...full post object... } }`  
**Response (400):** `{ "success": false, "error": "Validation message" }`

---

### 4. Update post — PUT `/api/blog.php`

**Body (JSON):** Same as create, plus:

```json
{
  "id": "1",
  ...
}
```

**Response (200):** `{ "success": true, "post": { ... } }`  
**Response (400/404):** `{ "success": false, "error": "..." }`

---

### 5. Delete post — DELETE `/api/blog.php?id=123`

**Response (200):** `{ "success": true }`  
**Response (404):** `{ "success": false, "error": "Post not found" }`

---

## Suggested database schema

### Table: `blog_posts`

| Column       | Type         | Notes                    |
|-------------|--------------|--------------------------|
| id          | INT AUTO_INCREMENT PRIMARY KEY | |
| slug        | VARCHAR(191) UNIQUE NOT NULL   | |
| title_en    | VARCHAR(500) NOT NULL          | |
| title_ar    | VARCHAR(500) NOT NULL          | |
| excerpt_en  | TEXT NOT NULL                  | |
| excerpt_ar  | TEXT NOT NULL                  | |
| category    | VARCHAR(50) NOT NULL           | rehabilitation, wellness, tips, news, research |
| date        | DATE NOT NULL                  | |
| read_time   | INT NOT NULL DEFAULT 5         | minutes |
| image       | VARCHAR(500) NOT NULL          | path or URL |
| author_key  | VARCHAR(100)                   | e.g. blog.author1 |
| status      | ENUM('draft','published') DEFAULT 'published' | |
| featured    | TINYINT(1) DEFAULT 0            | 0 or 1 |
| created_at  | DATETIME                        | |
| updated_at  | DATETIME                        | |

- Index on `slug`, `status`, `date`, `category` for list/filter performance.

### Optional: `blog_authors`

If you prefer to store author names in the DB instead of i18n keys:

| Column   | Type           |
|----------|----------------|
| id       | INT PRIMARY KEY |
| key      | VARCHAR(100) UNIQUE |
| name_en  | VARCHAR(200)   |
| name_ar  | VARCHAR(200)   |

Then in `blog_posts` use `author_id` (FK) instead of `author_key`, and join when returning posts.

---

## CORS & headers

- Match `api/contact.php`: `Content-Type: application/json`, `Access-Control-Allow-Origin` (and methods/headers as needed for your frontend).
- For PUT/DELETE, allow `PUT`, `DELETE`, and `OPTIONS` preflight.

---

## File uploads (images)

- Option A: Dashboard uploads to a separate endpoint (e.g. `POST /api/upload.php`) that saves the file under `public/uploads/blog/` and returns the path; then use that path in `image` when creating/updating a post.
- Option B: Accept base64 or URL in `image` and store as-is. Prefer Option A for production.

Once `blog.php` returns real data, the frontend can switch from static `src/data/blogPosts.ts` to fetching from this API.
