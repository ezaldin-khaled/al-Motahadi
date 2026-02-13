# Contributing to the Al Motahadi website

This guide helps team members set up the project, follow conventions, and contribute safely.

---

## Setup (first time)

1. **Clone the repo** (if not already done):
   ```bash
   git clone <repository-url>
   cd "dead ass"   # or your project folder name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 and confirm all pages load.

4. **Optional:** Run a production build to catch build errors:
   ```bash
   npm run build
   npm run preview
   ```

---

## Workflow

### Before you start

- Pull the latest changes: `git pull origin main` (or your default branch).
- Create a new branch for your work, e.g.:
  - `feature/contact-form-backend`
  - `content/update-services-list`
  - `fix/footer-links`

### While working

- Keep the scope of one branch focused (one feature, one page, or one type of fix).
- Test in the browser: run `npm run dev` and click through the pages you changed.
- Run `npm run lint` before committing to fix lint issues.

### Before merging

- Ensure `npm run build` succeeds.
- If someone else owns content or design, ask for a quick review of copy and layout.

---

## Conventions

### Code style

- **TypeScript:** Use TypeScript for all new `.ts`/`.tsx` files. Avoid `any` when possible.
- **Components:** Functional components with `export default function ComponentName()`.
- **Files:** 
  - One main component per file; filename matches component (e.g. `Header.tsx` → `Header`).
  - Pages live in `src/pages/`, shared components in `src/components/`.

### Styles

- Global and layout styles live in `src/index.css`.
- Page-specific styles live in `src/styles/<page>.css` (e.g. `about.css`, `contact.css`) and are imported in the corresponding page component.
- Use existing class names and layout (e.g. `.content-inner`, `.page-wrapper`) for consistency. When adding new sections, follow patterns from similar pages.

### Content and copy

- **Contact info:** Update in all places where it appears (Footer, Contact page, Services CTA). See [PAGES.md](PAGES.md) for locations.
- **Links:** Use React Router’s `<Link to="...">` for internal routes. Use `<a href="...">` for external links (and add `target="_blank"` and `rel="noopener noreferrer"` where appropriate).
- **Images:** Prefer descriptive `alt` text for accessibility.

### Git

- Write clear commit messages, e.g.:
  - `Add BMI result category labels on Contact page`
  - `Update footer address and phone number`
  - `Fix mobile nav layout in Header`
- Prefer small, logical commits over one large “everything” commit.

---

## Where to change what

| Goal | Where to look |
|------|----------------|
| Add/remove a page or route | `src/App.tsx` + new file in `src/pages/` |
| Change nav links or logo | `src/components/Header.tsx` |
| Change footer content/links | `src/components/Footer.tsx` |
| Change homepage sections | `src/pages/Home.tsx` + component in `src/components/` |
| Edit services list | `src/pages/Services.tsx` (array `services`) |
| Edit team members | `src/pages/OurTeam.tsx` |
| Edit About content | `src/pages/AboutUs.tsx` |
| Edit Contact form / WhatsApp / calculators | `src/pages/ContactUs.tsx` |
| Update contact info everywhere | Footer, ContactUs, Services CTA (see PAGES.md) |
| Change global styles/layout | `src/index.css` |
| Change page-specific styles | `src/styles/<page>.css` |

---

## Common tasks

### Add a new service

1. Open `src/pages/Services.tsx`.
2. Add an object to the `services` array with `id`, `title`, `description`, `image`, `link`.
3. Use an existing item as a template.

### Add a new team member

1. Open `src/pages/OurTeam.tsx`.
2. Find the “Meet Our Team” section and duplicate one `.team-member-card` block.
3. Update image `src`, name, title, bio, and link if needed.

### Change the logo

1. Replace `public/SVG.png` with the new logo (or add a new file and update references).
2. In `Header.tsx` and `Footer.tsx`, the logo is used via `src="/SVG.png"`. If you use a different filename, update both files.

### Wire Contact form to a backend

1. In `ContactForm.tsx` (home page form) and/or `ContactUs.tsx` (contact page form), replace the `alert()` in the submit handler with a `fetch()` (or API client) call to your backend.
2. Add loading and error state and user feedback (e.g. “Message sent” / “Something went wrong”).

---

## Getting help

- **Structure and components:** See [ARCHITECTURE.md](ARCHITECTURE.md).
- **Editing copy and content by page:** See [PAGES.md](PAGES.md).
- **Setup and scripts:** See project [README.md](../README.md).

If you introduce a new pattern (e.g. a shared config for contact info), document it in the relevant doc file and mention it in the README or CONTRIBUTING.
