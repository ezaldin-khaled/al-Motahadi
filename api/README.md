# Al Motahadi – PHP API (Hostinger)

Upload the contents of this `api` folder to **Hostinger** inside `public_html/api/` so that:

- Your React app (built and deployed to `public_html/` or a subdomain) can call `/api/contact.php` for the contact/booking form.
- Emails are sent via SMTP to **contact@almotahadi.com**.

## Setup on Hostinger

1. **Upload** the entire `api` folder to `public_html/api/`.

2. **Config**
   - Copy `config.sample.php` to `config.php` in `public_html/api/`.
   - Edit `config.php`: set `smtp_pass` to the password of the **contact@almotahadi.com** email account (create that account in Hostinger → Email Accounts if needed).
   - Optionally set `cors_origins` to your site URL(s) for security.

3. **PHPMailer (recommended for SMTP)**
   - On your **local machine** (with PHP and Composer installed), run in this folder:
     ```bash
     cd api
     composer install
     ```
   - Upload the whole `api` folder again so that `api/vendor/` is on the server. Then contact form will use SMTP (Hostinger) via PHPMailer.

   **If you don’t use Composer:** the script will fall back to PHP `mail()`. On Hostinger, `mail()` often sends through their SMTP for your domain when you use a From address like `contact@almotahadi.com`.

## Endpoint

- **POST** `/api/contact.php`
  - Body: JSON or form data with `first_name`, `last_name` (or `full_name`), `email`, `phone`, `message`.
  - Response: JSON `{ "success": true, "message": "..." }` or `{ "success": false, "error": "..." }`.

## Security

- Do **not** commit `config.php` (it’s in `.gitignore`). Only `config.sample.php` is in the repo.
- In production, set `cors_origins` in `config.php` to your frontend origin(s).
