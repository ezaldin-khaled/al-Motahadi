## 2. Backend (PHP API)

Since shared hosting does not support Node.js or other backend runtimes, we will build the backend using PHP inside the same hosting environment.

**Scope:** No dashboard — no admin panel or back-office UI. Only the public React site plus PHP API (booking, contact, appointments if needed).

### Structure

Inside `public_html`:

```
public_html/
  api/
    db.php              # DB config + connection (include-only, not a public endpoint)
    book.php            # POST: create appointment/booking
    get_appointments.php # GET: list appointments (optional; e.g. for public calendar, no admin)
    contact.php         # POST: contact form → send email via SMTP
```

### What We Need To Do

* Create an `/api` folder inside `public_html`.
* Build PHP endpoints (for example: booking, fetching data, etc.).
* Connect PHP to a MySQL database created in Hostinger.
* Use prepared statements for secure database queries.
* Return JSON responses so the React frontend can consume them.
* Send CORS headers so the React app can call the API (same-origin or configured origin).
* Validate and sanitize all input (e.g. booking form) before using in DB or responses.
* Return consistent JSON error responses (e.g. `{ "success": false, "error": "message" }`) with appropriate HTTP status codes (400, 404, 500).

### How It Works

1. React sends a request to `/api/endpoint.php` (GET for read, POST for create/update).
2. PHP receives the request and processes the data.
3. PHP interacts with the MySQL database.
4. PHP returns a JSON response.
5. React updates the UI based on the response.

### Notes

* **db.php**: Should only define connection and be included by other scripts; do not expose credentials or run logic when hit directly (e.g. exit after include or deny direct access).
* **CORS**: If the frontend is on a different subdomain or path, set `Access-Control-Allow-Origin` (and optionally `Allow-Methods`, `Allow-Headers`) in PHP so the browser allows the requests.
* **Security**: Use HTTPS on the host; never return raw DB errors or stack traces to the client.

### Email (SMTP)

* Use **SMTP** for sending email only (no separate mail server; Hostinger SMTP or similar).
* **From / Reply-to address:** `contact@almotahadi.com`
* Contact form submissions (First Name, Last Name, Email, Phone, Message) are sent to this address via the `/api/contact.php` endpoint using SMTP (e.g. PHPMailer with SMTP on the same host).

This setup allows us to run a full backend system within shared hosting while keeping the architecture clean and maintainable.
