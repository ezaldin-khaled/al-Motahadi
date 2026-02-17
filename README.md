# Al Motahadi Rehabilitation Center — Website

A modern marketing website for **Al Motahadi Rehabilitation Center** (Almotahadi Leisure Trust), built with React, TypeScript, and Vite. The site showcases rehabilitation services, the medical team, and provides appointment booking and health tools (BMI calculator).

---

## Quick start

### Prerequisites

- **Node.js** 18+ (recommended: 20 LTS)
- **npm** (comes with Node)

### Install and run

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Other scripts

| Command | Description |
|--------|-------------|
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## Deploy to Hostinger (shared hosting)

Hostinger shared hosting serves your site from `public_html/` (Apache). This project is a React SPA, so you must:

- **Upload the built static files** (Vite output)
- **Add SPA routing rewrites** so React Router routes work on refresh
- **Upload the PHP API** folder to `public_html/api/`

### Build the site locally

```bash
npm install
npm run build
```

This produces `dist/`.

### Upload static files

- Upload **the contents of** `dist/` into `public_html/` (not the `dist` folder itself).
- The SPA rewrite file is included automatically because it lives in `public/.htaccess` and Vite copies `public/` into `dist/`.

### Upload the PHP API

- Upload the repo’s `api/` folder to `public_html/api/`.
- Copy `api/config.sample.php` to `api/config.php` and fill in your SMTP credentials.

If you use Composer/PHPMailer, run this locally before uploading:

```bash
cd api
composer install --no-dev
```

Then upload `api/vendor/` with the rest of `api/`.

### Optional: API base URL

By default the frontend calls the API at **same origin**: `/api/contact.php`.
If your API lives elsewhere, set `VITE_API_BASE_URL` at build time.

---

## Project structure

```
├── index.html              # Entry HTML
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json            # TypeScript config
├── src/
│   ├── main.tsx             # React entry point
│   ├── App.tsx              # Routes and app shell
│   ├── index.css            # Global styles and shared layout
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components (one per route)
│   └── styles/              # Page-specific CSS (about, contact, services, team)
├── public/                  # Static assets (e.g. /SVG.png)
└── docs/                    # Documentation for the team
    ├── ARCHITECTURE.md      # App structure and components
    ├── CONTRIBUTING.md      # How to contribute
    └── PAGES.md             # Page-by-page editing guide
```

---

## Tech stack

- **React 18** — UI
- **TypeScript** — Typing
- **Vite 5** — Build and dev server
- **React Router 7** — Client-side routing
- **GSAP** — Animations (hero, scroll, footer)

---

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About Us |
| `/services` | Services |
| `/team` | Our Team |
| `/contact` | Contact Us |

---

## Documentation for the team

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — How the app is structured (components, pages, styles).
- **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** — Setup, branching, and coding conventions.
- **[docs/PAGES.md](docs/PAGES.md)** — Where to change copy, images, and content on each page.

---

## Contact and content

- **Placeholder contact info** (address, phone, email) appears in Footer, Contact page, and Services CTA. Update these in the components/pages listed in `docs/PAGES.md`.
- **WhatsApp** link on Contact uses `YOUR_PHONE_NUMBER`; replace with the real number (e.g. `966XXXXXXXXX`).
- **Images**: Logo is `/SVG.png` in `public/`. Many images use Unsplash URLs; you can replace them with local files in `public/` or use an `assets/` folder and import as needed.

---

## License

Private project. All rights reserved.
