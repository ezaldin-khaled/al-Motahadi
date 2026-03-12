# Al Motahadi – PHP API (Hostinger)

Complete PHP backend for the Al Motahadi dashboard and public site.

## Quick Start

1. **Create MySQL Database** in Hostinger hPanel
2. **Run Schema** — Import `schema.sql` into your database via phpMyAdmin
3. **Upload API** — Copy this `api` folder to `public_html/api/`
4. **Configure** — Copy `config.sample.php` to `config.php` and fill in credentials
5. **Create Uploads Folder** — Create `public_html/uploads/` with write permissions

## Setup on Hostinger

### 1. Database Setup

1. In Hostinger hPanel → **Databases** → **MySQL Databases**
2. Create a new database and note the name, username, and password
3. Open **phpMyAdmin** and import `schema.sql` (creates all tables + default admin user)

### 2. Upload Files

Upload the entire `api` folder to `public_html/api/`:

```
public_html/
├── api/
│   ├── auth.php
│   ├── blog.php
│   ├── bootstrap.php
│   ├── config.php (create from sample)
│   ├── contact.php
│   ├── db.php
│   ├── images.php
│   ├── pages.php
│   ├── redirects.php
│   ├── settings.php
│   ├── upload.php
│   ├── users.php
│   └── vendor/ (if using Composer)
├── uploads/ (create this folder)
└── (React build files)
```

### 3. Configuration

Copy `config.sample.php` to `config.php` and edit:

```php
return [
    // Database
    'db_host' => 'localhost',
    'db_name' => 'YOUR_DATABASE_NAME',
    'db_user' => 'YOUR_DATABASE_USER',
    'db_pass' => 'YOUR_DATABASE_PASSWORD',

    // Email (for contact form)
    'smtp_pass' => 'YOUR_EMAIL_PASSWORD',

    // Security (production)
    'cors_origins' => ['https://almotahadi.com'],
    'session_secure' => true,
];
```

### 4. PHPMailer (Optional, Recommended)

For SMTP email sending:

```bash
cd api
composer install
```

Then upload the `vendor/` folder. Without Composer, the contact form uses PHP `mail()`.

## Default Admin User

After running `schema.sql`, login with:
- **Username:** `admin`
- **Password:** `admin123`

**Change this password immediately** via the Users tab in the dashboard.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth.php` | Login (username, password) |
| POST | `/api/auth.php?action=logout` | Logout |
| GET | `/api/auth.php?action=me` | Get current user |

### Blog Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blog.php` | List posts (filters: status, category, lang) |
| GET | `/api/blog.php?id=123` | Get post by ID |
| GET | `/api/blog.php?slug=xxx` | Get post by slug |
| POST | `/api/blog.php` | Create post (auth required) |
| PUT | `/api/blog.php` | Update post (auth required) |
| DELETE | `/api/blog.php?id=123` | Delete post (auth required) |

### Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/settings.php` | Get all settings |
| POST | `/api/settings.php` | Save settings (auth required) |

### Media / Images

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/images.php` | List media files |
| GET | `/api/images.php?id=123` | Get single file |
| PUT | `/api/images.php` | Update metadata (auth required) |
| DELETE | `/api/images.php?id=123` | Delete file (auth required) |
| POST | `/api/upload.php` | Upload file (auth required) |

### Pages & Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pages.php` | List pages |
| GET | `/api/pages.php?slug=home` | Get page sections |
| POST | `/api/pages.php` | Save section (auth required) |

### Users (Admin only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users.php` | List users |
| POST | `/api/users.php` | Create user |
| PUT | `/api/users.php` | Update user |
| POST | `/api/users.php?action=toggle` | Toggle active status |

### Redirects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/redirects.php` | List redirects |
| POST | `/api/redirects.php` | Create redirect |
| PUT | `/api/redirects.php` | Update redirect |
| DELETE | `/api/redirects.php?id=123` | Delete redirect |

### Contact Form

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact.php` | Submit contact form |

## Security Notes

- **Never commit `config.php`** — it contains credentials
- Set `cors_origins` in production to your frontend domain(s)
- Set `session_secure` to `true` in production (HTTPS)
- Change the default admin password immediately
- Ensure `uploads/` folder has appropriate permissions (755)
