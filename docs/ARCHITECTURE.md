# Architecture & structure

This document describes how the Al Motahadi website is organized so the team can navigate and extend it.

---

## Entry points

| File | Role |
|------|------|
| `index.html` | Single HTML shell; loads `/src/main.tsx`. |
| `src/main.tsx` | Renders `<App />` into `#root`, imports `index.css`. |
| `src/App.tsx` | Defines `<Router>` and all `<Route>`s. |

---

## Routing

All routes are in `src/App.tsx`:

| Route | Component | File |
|-------|-----------|------|
| `/` | Home | `src/pages/Home.tsx` |
| `/about` | About Us | `src/pages/AboutUs.tsx` |
| `/services` | Services | `src/pages/Services.tsx` |
| `/team` | Our Team | `src/pages/OurTeam.tsx` |
| `/contact` | Contact Us | `src/pages/ContactUs.tsx` |

- Use React Router’s `<Link to="...">` for in-app navigation (see `Header.tsx`).
- Each page typically wraps content in `<div className="page-wrapper">`, then `<Header />`, `<main>`, and `<Footer />`.

---

## Layout components (shared)

Used across multiple pages.

| Component | File | Purpose |
|-----------|------|--------|
| **Header** | `src/components/Header.tsx` | Top bar: logo, nav links (Home, Services, Our Team, About, Contact Us), “Book an Appointment” CTA. Uses GSAP for top-line animation. |
| **Footer** | `src/components/Footer.tsx` | Brand, tagline, Quick Links, Services links, Contact block, copyright. Uses GSAP ScrollTrigger. |

Navigation links in the header point to `/`, `/services`, `/team`, `/about`, `/contact`. Update these in `Header.tsx` if you add or rename routes.

---

## Home page composition

`src/pages/Home.tsx` assembles the homepage from these components (order matters):

| Order | Component | File | Notes |
|-------|-----------|------|--------|
| 1 | Header | `Header.tsx` | — |
| 2 | Hero | `Hero.tsx` | Headline, description, CTAs, hero image. GSAP timeline. |
| 3 | Stats | `Stats.tsx` | Statistic counters (e.g. years, patients). |
| 4 | SectionValues | `SectionValues.tsx` | Values / key messages. |
| 5 | SectionServices | `SectionServices.tsx` | Services preview / grid. |
| 6 | SectionAlt | `SectionAlt.tsx` | Alternate content block. |
| 7 | SectionProcess | `SectionProcess.tsx` | “Our process” or steps. |
| 8 | TeamSection | `TeamSection.tsx` | Team preview. |
| 9 | SectionDark | `SectionDark.tsx` | Dark background CTA block. |
| 10 | ContactForm | `ContactForm.tsx` | In-page contact form. |
| 11 | CtaSection | `CtaSection.tsx` | Final CTA. |
| 12 | Footer | `Footer.tsx` | — |

To reorder or add/remove sections on the home page, edit `Home.tsx` and the corresponding component files.

---

## Other components (used on Home or elsewhere)

| Component | File | Used in |
|-----------|------|---------|
| Hero | `Hero.tsx` | Home |
| Stats | `Stats.tsx` | Home |
| SectionValues | `SectionValues.tsx` | Home |
| SectionServices | `SectionServices.tsx` | Home |
| SectionAlt | `SectionAlt.tsx` | Home |
| SectionProcess | `SectionProcess.tsx` | Home |
| TeamSection | `TeamSection.tsx` | Home |
| SectionDark | `SectionDark.tsx` | Home |
| ContactForm | `ContactForm.tsx` | Home |
| CtaSection | `CtaSection.tsx` | Home |

Standalone pages (About, Services, Team, Contact) contain their own sections inline or in the same file; they do not reuse most of the Home-only components.

---

## Styles

- **Global / layout:** `src/index.css`  
  - Resets, `.page-wrapper`, `.nav-header`, `.nav-inner`, `.content-inner`, `.btn`, hero, footer, and other shared layout/component styles.
- **Page-specific:**  
  - `src/styles/about.css` → About Us  
  - `src/styles/contact.css` → Contact Us  
  - `src/styles/services.css` → Services  
  - `src/styles/team.css` → Our Team  

When adding new pages or major sections, consider a new file under `src/styles/` and import it in the page component.

---

## Animations (GSAP)

- **Header:** `Header.tsx` — top line scale-in on load.
- **Hero:** `Hero.tsx` — timeline for brand, headline, description, CTAs, image, badge.
- **Footer:** `Footer.tsx` — ScrollTrigger for footer entrance.
- **ContactForm (Home):** `ContactForm.tsx` — ScrollTrigger for form entrance.
- **Contact page:** `ContactUs.tsx` — hero, booking cards, calculator, CTA section entrances.

GSAP is used via `gsap` and `ScrollTrigger`; no extra plugins are required for current animations.

---

## Static assets

- **Logo:** Referenced as `/SVG.png` (e.g. in `Header.tsx`, `Footer.tsx`). Place the file in `public/SVG.png` so it is served from the root.
- **Images:** Many images use full Unsplash URLs. To use local assets, put them in `public/` and reference as `/<filename>` or create an `assets/` folder and import in the component (Vite will bundle them).

---

## Data and content

- **Services list:** Defined as a JavaScript array in `src/pages/Services.tsx` (`services`). Each item has `id`, `title`, `description`, `image`, `link`. Edit there to add/remove/change services.
- **Team members:** Hardcoded in `src/pages/OurTeam.tsx` in the “Meet Our Team” section (names, titles, bios, images). Copy and images are in that file.
- **Contact info:** Repeated in `Footer.tsx`, `ContactUs.tsx`, and `Services.tsx` (CTA). There is no single “content config” file; update each place or consider extracting to a shared constant (e.g. `src/constants/contact.ts`).
- **WhatsApp:** In `ContactUs.tsx`, `handleWhatsAppClick` uses `https://wa.me/YOUR_PHONE_NUMBER`. Replace `YOUR_PHONE_NUMBER` with the real number (e.g. `966XXXXXXXXX`).

---

## Build and output

- **Dev:** `npm run dev` → Vite dev server (default port 5173).
- **Build:** `npm run build` → TypeScript compile + Vite build; output in `dist/`.
- **Preview:** `npm run preview` → Serves `dist/` locally to test the production build.

For deployment, use the contents of `dist/` on any static host (e.g. Netlify, Vercel, or your own server).
