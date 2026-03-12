# SEO Dashboard – Technical Documentation

## 1. Overview

The **SEO Dashboard** is an internal admin tool used to manage:

- **SEO page content** – hero headings/body + meta tags for key pages
- **Site images** – hero/background images and blog thumbnails/content images
- **Blog posts** – content, metadata, images, status
- **Redirects** – placeholder tab for future use

### Tech stack

- **Frontend**
  - Next.js `16.1.6` (App Router, static export)
  - React `18.2.0`
  - Tailwind CSS `4`
- **Backend**
  - PHP API scripts in `CodeX-Website-Backend-main/api`
  - MySQL database
- **Auth**
  - JWT-based
  - Token stored as `seo_token` in `localStorage`
  - User info stored as `seo_user` in `localStorage`

---

## 2. Architecture

### 2.1 Frontend

**Key entry:**

- `src/app/seo-dashboard/page.tsx`  
  Client component (`"use client"`). Renders:

- **Sidebar**
  - Dashboard
  - Pages
  - Images
  - Blog
  - Redirects

- **Main content** – controlled by `activeTab` state:
  - `dashboard` – simple “SEO Dashboard Active” info panel
  - `pages` – manage hero and meta fields for pages
  - `images` – manage image slots and uploads
  - `blog` – manage blog posts
  - `redirects` – placeholder

**Data layer helpers:**

- `src/lib/seoApi.ts`
  - `seoFetch(path, options)` – base fetch with auth headers
  - **SEO content:**
    - `getContent(router): Promise<SeoContentItem[]>`
    - `updateContent(payload, router)`
  - **Images:**
    - `getImages(router): Promise<SeoImage[]>`
    - `uploadImage(file, router, meta)`
    - `deleteImage(id, router)`
  - **Blog:**
    - `getBlogPosts(router): Promise<BlogPostSummary[]>`
    - `getBlogPostById(id, router): Promise<BlogPost>`
    - `getBlogPostBySlug(slug): Promise<BlogPost | null>`
    - `saveBlogPost(payload, router)`
    - `deleteBlogPost(id, router)`

- `src/hooks/useSeoContent.ts`
  - Used on public pages to read `seo_content` rows and expose `sections[sectionKey]`.

### 2.2 Backend (PHP)

Location: `CodeX-Website-Backend-main/api`

**Core files:**

- `config.php`
  - `getDBConnection()` – PDO connection to MySQL

- `jwt.php`
  - JWT encode/decode
  - `verifySEORole($token)` – validate token and role

- `verifyToken.php`
  - Validates current token for dashboard

**SEO content APIs:**

- `getContent.php`
  - Returns list of `seo_content` joined with `users` (via `v_seo_content_with_user` view)
- `updateContent.php`
  - Updates a single `seo_content` row by `id`

**Image APIs:**

- `getImages.php`
  - List images from `seo_images`
- `uploadImage.php`
  - Handles file upload, stores path + metadata in `seo_images`
- `deleteImage.php`
  - Deletes row and filesystem file

**Blog APIs:**

- `blogList.php`
  - With SEO token:
    - All posts (any status)
  - Without token:
    - Only `status='published'`
  - Joins `blog_posts` with `seo_images` for `thumbnail_url`
- `blogGet.php`
  - Fetch by `id` or `slug`
  - Checks status; non-SEO users can only see `published`
- `blogSave.php`
  - Insert or update `blog_posts` based on `id`
- `blogDelete.php`
  - Archives / drafts posts (implementation dependent)

---

## 3. Database Schema

Defined in: `CodeX-Website-Backend-main/api/database.sql`

### 3.1 `users`

Stores admin/SEO users.

Important fields:

- `id` (PK)
- `name`
- `email` (unique, indexed)
- `password` (hashed)
- `role` (`SEO`, `ADMIN`, `EDITOR`)
- `active` (1/0)

### 3.2 `seo_content`

Stores text/meta and image URLs for each page section.

Columns:

- `id` (PK)
- `page` – e.g. `home`, `about`, `services`, `contact`, `blog`
- `section` – e.g.:
  - `hero_h1`, `hero_h2`, `hero_body`
  - `page_title` (meta row)
  - `hero_image` (image slot, `content` = image URL)
- `content` – string/text content
- `meta_title`, `meta_description`, `meta_keywords` – optional SEO meta
- `updated_by` – FK to `users.id`

### 3.3 `seo_images`

Tracks uploaded images.

Columns:

- `id` (PK)
- `filename`, `original_name`
- `file_path`, `url`
- `file_size`, `mime_type`
- `page`, `section`, `label`
- `uploaded_by`, `uploaded_at`

### 3.4 `blog_posts`

Simple blog CMS.

Columns:

- `id` (PK)
- `slug` (unique)
- `title`
- `excerpt`
- `content` (HTML, `LONGTEXT`)
- `author`
- `published_at`
- `status` – `draft` or `published`
- `thumbnail_image_id` – FK to `seo_images.id` (nullable)
- `meta_title`, `meta_description`, `meta_keywords`
- `category` – free text (nullable)
- `created_at`, `updated_at`

### 3.5 Helpers

- `v_seo_content_with_user` view:
  - `seo_content` joined with `users` on `updated_by`

- Helper SQL scripts:
  - `blog-add-category.sql` – add `category` column to `blog_posts`
  - `blog-seed.sql` – seed 6 sample blog posts
  - `hero-rows-fix.sql` – ensure `hero_h1/h2/body` rows exist
  - `meta-rows-fix.sql` – ensure `page_title` rows exist

---

## 4. Authentication Flow

1. User logs in (elsewhere) and receives a JWT.
2. Frontend stores:
   - `localStorage.seo_token` – JWT
   - `localStorage.seo_user` – JSON of user info
3. On `/seo-dashboard`:
   - Dashboard checks `seo_token`:
     - If missing → redirect to `/seo-login`
   - Calls `verifyToken.php` with `Authorization: Bearer <token>`
   - If valid:
     - Reads `seo_user` from `localStorage` and sets `user` state
   - If invalid:
     - Clears `seo_token` and `seo_user`
     - Redirects back to `/seo-login`

API requests use `seoFetch`, which automatically attaches `Authorization` when in the browser.

---

## 5. Tabs & Features

### 5.1 Dashboard Tab

- Shows a confirmation that:
  - JWT is valid
  - Session is active
- Purely informational; no API calls beyond auth check.

---

### 5.2 Pages Tab

**Purpose:** Edit hero text & meta for static pages.

UI:

- Page filter buttons:
  - `All`, `Home`, `About`, `Services`, `Contact`
- For selected page:
  - **Hero group**
    - H1, H2, Body (mapped to `hero_h1`, `hero_h2`, `hero_body`)
  - **Meta group**
    - Meta title/description/keywords (from `page_title` row)

Backend mapping:

- Reads all `seo_content` via `getContent(router)`.
- Utility `getRow(page, section)` looks up rows.

Save behavior:

- Builds a list of updates:
  - For hero fields:
    - Updates existing `hero_h1/h2/body` (or legacy `hero_title/subtitle/description`)
  - For meta:
    - Updates `page_title` row with new `meta_*`
- Calls `updateContent` per row.
- Updates in-memory state to reflect changes immediately.

**Reuse idea:**

Use `page/section` as a flexible content key pattern in any project and build a generic editor that knows which sections exist per page.

---

### 5.3 Images Tab

**Purpose:** Manage where images appear across the site.

Sections:

1. **Hero image slots**
   - Defined `IMAGE_SLOTS` like:
     - `home/hero_image`, `about/hero_image`, `services/hero_image`, `contact/hero_image`
   - Each slot:
     - Shows current URL (from `seo_content.content`)
     - Dropdown includes:
       - “No image”
       - “Use site default (hardcoded URL)”
       - Any uploaded image URL (`seo_images`)
   - On change:
     - Calls `updateContent({ id, content: newUrl, meta_*: null }, router)`

2. **Upload section**
   - Choose page (`home/about/services/contact`)
   - Section fixed to `hero_image`
   - Optional label
   - File input uploads via `uploadImage(file, router, meta)`.
   - Adds new `SeoImage` to `images` list and shows it in the grid.

3. **Image library**
   - Grid of all `seo_images`:
     - Thumbnail, original name, page, section, label
   - Actions:
     - Copy URL (`navigator.clipboard.writeText(img.url)`)
     - Delete (`deleteImage(img.id, router)` + remove from state)

**Reuse idea:**

Abstract image slots into a table like `seo_images` + a `content` table. Use UI to pick an image and write the URL back to any text field.

---

### 5.4 Blog Tab

**Purpose:** Manage blog posts visible on the public site.

#### List view

- Uses `getBlogPosts(router)` from `seoApi`.
- Table columns:
  - Title (fallback to “Untitled”)
  - Category
  - Status (draft/published)
  - Published at (formatted)
  - Thumbnail (small preview or “None”)
  - Actions: `Edit`, `Archive`

#### New/Edit modal (`BlogEditorModal`)

**State:**

- `title`, `slug`, `excerpt`
- `content` – HTML string
- `author`, `publishedAt`, `status`
- `thumbnailId`
- `category`, `categoryOther`
- `metaTitle`, `metaDescription`, `metaKeywords`
- `save`/`error`/`showPreview`

**Loading existing content:**

- If `post.id` exists:
  - Calls `getBlogPostById(id, router)`
  - Sets:
    - `content` from `post.content`
    - `meta_*` fields
    - `category` or maps unknown category to `Other` + `categoryOther`

**Save logic:**

- Builds payload:
  {
    id?: number
    title
    slug: slug || generated-from-title
    excerpt
    content
    author
    published_at: publishedAt || null
    status
    thumbnail_image_id: thumbnailId
    meta_title: metaTitle
    meta_description: metaDescription
    meta_keywords: metaKeywords
    category: resolvedCategory
  }
  