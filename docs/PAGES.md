# Page-by-page content guide

Use this doc to find where to edit copy, images, and key content on each page. Good for content editors and developers who need to make quick text or asset changes.

---

## Global (all pages)

### Header

- **File:** `src/components/Header.tsx`
- **Logo:** `public/SVG.png` (path used: `/SVG.png`)
- **Logo text:** “AL MOTAHADI” next to the logo
- **Nav links:** Home, Services, Our Team, About, Contact Us (paths: `/`, `/services`, `/team`, `/about`, `/contact`)
- **CTA button:** “Book an Appointment →” links to `/contact`

### Footer

- **File:** `src/components/Footer.tsx`
- **Tagline:** “Committed to restoring movement and improving lives…”
- **Quick Links:** Home, About Us, Services, Appointments, Contact (currently `href="#"`; can be changed to `/`, `/about`, etc.)
- **Services links:** Physical Therapy, Occupational Therapy, Speech Therapy, Pain Management, Post-Surgical Rehab
- **Contact block:** Address, phone, email
- **Social:** Facebook, Instagram, Twitter (placeholder `#` links)
- **Copyright:** “© 2023 AL MOTAHADI. All rights reserved.”

---

## Home (`/`)

- **Page file:** `src/pages/Home.tsx` (only composes sections; no copy here)

### Hero

- **File:** `src/components/Hero.tsx`
- **Brand line:** “AL MOTAHADI REHABILITATION CENTER”
- **Headline:** “Restoring Movement.” / “Improving Lives.”
- **Description paragraph**
- **Buttons:** “Book an Appointment →”, secondary CTA
- **Hero image:** URL and optional badge text

### Stats

- **File:** `src/components/Stats.tsx`
- Numbers and labels (e.g. years of experience, patients)

### SectionValues

- **File:** `src/components/SectionValues.tsx`
- Section heading and value cards (titles + descriptions)

### SectionServices

- **File:** `src/components/SectionServices.tsx`
- Services preview: titles, short descriptions, links, images

### SectionAlt

- **File:** `src/components/SectionAlt.tsx`
- Alternate content block (heading, text, image)

### SectionProcess

- **File:** `src/components/SectionProcess.tsx`
- “Our process” or step-by-step content

### TeamSection

- **File:** `src/components/TeamSection.tsx`
- Team preview on the home page

### SectionDark

- **File:** `src/components/SectionDark.tsx`
- Dark CTA block (heading, text, buttons)

### ContactForm (on Home)

- **File:** `src/components/ContactForm.tsx`
- Form labels, placeholder text, submit message (currently an `alert`)

### CtaSection

- **File:** `src/components/CtaSection.tsx`
- Final CTA heading, description, buttons

---

## About Us (`/about`)

- **File:** `src/pages/AboutUs.tsx`
- **Styles:** `src/styles/about.css`

All content is in this one file. Search for section comments:

- **Hero:** “Together for a Healthier Future”, description, hero image (Unsplash URL)
- **Who We Are:** “WHO WE ARE” heading, body text, “READ MORE” button
- **Mission / Vision cards:** Titles and text for “Our Mission” and “Our Vision”
- **Our Values:** “Our Values” heading, value cards (Care and Compassion, Professionalism, Innovation)
- **Almotahadi Leisure Trust:** “We Aim To Opening” block, paragraphs, image
- **About the Founder:** “About the Founder”, founder image, bio paragraphs
- **Medical Teams:** “Medical Teams” heading, subheading, 3 team images, “READ MORE”
- **Social Responsibility:** “Our Social Responsibility”, body text, “READ MORE”
- **Calculate Your Health:** “Calculate Your Health” heading, BMI form (Age, Gender, Weight, Height), “CALCULATE” button  
  - Note: This form is present but not wired to logic in this page; the Contact page has a working BMI calculator.

---

## Services (`/services`)

- **File:** `src/pages/Services.tsx`
- **Styles:** `src/styles/services.css`

### Hero

- “Our Services” title and the intro paragraph (in the same file).

### Services grid

- **Data:** Array `services` in `Services.tsx`. Each item:
  - `id`, `title`, `description`, `image` (URL), `link`
- Edit this array to add, remove, or reorder services. Current items: Physical Therapy, Aquatic Therapy, Speech Therapy, Functional Assessment, Cardiac Rehabilitation, Nutritional Counseling, Pain Management, Post-Surgical Rehabilitation, Home Health Care.

### CTA section

- “Begin Your Recovery Journey” heading and text
- Buttons: “Book an Appointment”, “Call Us Now”
- **Contact card:** Address “123 Recovery Street…”, phone, email
- **Hours card:** Monday–Friday, Saturday, Sunday

Update address, phone, email, and hours in this section when contact info changes.

---

## Our Team (`/team`)

- **File:** `src/pages/OurTeam.tsx`
- **Styles:** `src/styles/team.css`

All content is in this file:

- **Hero:** “Medical Team” title and two description paragraphs
- **Multidisciplinary Team Model:** Section title, paragraph, “Schedule a Consultation” button
- **What Sets Our Team Apart:** Six feature cards (titles + descriptions)
- **Our Working Philosophy:** Two paragraphs, “Get in Touch Today” button
- **Meet Our Team:** Three team cards:
  - Dr. Ahmed Al-Mutahadi (image, title, bio, “Book Appointment”)
  - Dr. Sarah Johnson (image, title, bio, “Book Appointment”)
  - Nurse Fatima Hassan (image, title, bio, “Book Appointment”)
- **Dark CTA section:** “Begin Your Recovery Journey”, text, “Schedule Consultation” / “Call Now”, quick contact form

To add a team member: duplicate one `.team-member-card` block and update image, name, title, bio, and link.

---

## Contact Us (`/contact`)

- **File:** `src/pages/ContactUs.tsx`
- **Styles:** `src/styles/contact.css`

### Hero

- “GET STARTED” label, “Book Your Appointment Now” title, short description

### Booking section

- **Book Us Form:** Form fields (Full Name, Email, Phone, Message), “Submit” button.  
  - Submit handler: `handleFormSubmit` — currently shows an alert; replace with your backend/API when ready.
- **Book Us WhatsApp:** Title, description, “Book on WhatsApp →” button.  
  - **WhatsApp link:** In `handleWhatsAppClick`, replace `YOUR_PHONE_NUMBER` with the real number (e.g. `966XXXXXXXXX` for Saudi, no `+` or leading zero).

### Health calculators

- **Tabs:** “BMI Calculator” and “BMR Calculator” (BMR is placeholder “coming soon”).
- **BMI:** Weight (kg), Height (cm), “Calculate BMI” button, result and category (Underweight / Normal / Overweight / Obese). Logic is in `calculateBMI` and state `bmiResult`.

### CTA section

- “THE RECOVERY STARTS”, “Begin Your Recovery Journey”, description, “Book an Appointment” and “WhatsApp Us” buttons

---

## Contact info checklist

When updating address, phone, or email, search for and update in:

1. **Footer** — `src/components/Footer.tsx` (address, phone, email)
2. **Contact page** — `src/pages/ContactUs.tsx` (if any contact block is added; WhatsApp number in `handleWhatsAppClick`)
3. **Services page** — `src/pages/Services.tsx` (CTA section: address, phone, email, hours)
4. **Our Team page** — `src/pages/OurTeam.tsx` (“Call Now” link `tel:+966123456789` and any contact text)

Consider adding a single source of truth (e.g. `src/constants/contact.ts`) and importing it in these files to avoid mismatches.

---

## Images summary

| Location | Current source | How to change |
|----------|----------------|---------------|
| Header / Footer logo | `public/SVG.png` | Replace file or path in Header.tsx & Footer.tsx |
| Hero (Home) | In Hero.tsx | Change image URL or path in component |
| About, Team, Services | Unsplash URLs or inline in TSX | Replace URLs or paths in the corresponding page file |
| Services cards | In `services` array in Services.tsx | Change `image` for each service |

For local images, put files in `public/` and use `/<filename>` or use an `assets/` folder and import in the component.
