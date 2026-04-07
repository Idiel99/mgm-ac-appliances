# MGM A/C Appliances — Site Design Spec
**Date:** 2026-04-06
**Status:** Approved

---

## 0. Prerequisites (Before Going Live)

- **Resend account:** Sign up at resend.com (free), generate an API key, add it as `RESEND_API_KEY` env var in Vercel
- **Vercel account:** Sign up at vercel.com (free), connect GitHub repo
- **Hero stats:** The mockup shows "10+ Years", "500+ Customers", "24/7" — confirm these numbers are accurate before launch
- **GitHub repo:** Create and push initial commit before connecting to Vercel

---

## 1. Business Context

- **Business:** MGM A/C Appliances — family-operated AC company in South Florida
- **Services:** Installation, Repair, Maintenance, Commercial, Residential, Emergency/24-hour
- **Languages:** English and Spanish (bilingual audience)
- **Primary goal:** Drive calls and quote requests from local customers

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSG for SEO, natural Vercel fit |
| Styling | Tailwind CSS | Utility-first, fast iteration, responsive out of the box |
| i18n | `next-intl` | First-class App Router support, `t()` API, JSON locale files |
| Email | Resend (free tier) | Serverless-friendly, 100 emails/day free, simple API |
| Hosting | Vercel (free tier) | Zero-config Next.js deploys, CDN, custom domain support |
| Repo | GitHub | Source of truth, triggers Vercel CI/CD on push |

---

## 3. Site Structure

Single-page application at `/` with smooth-scroll anchor navigation. Language is handled via `next-intl` locale routing:

- `/en` — English (default)
- `/es` — Spanish

Browser language auto-detection redirects users on first visit using `next-intl` middleware (stored in a cookie after first redirect to avoid loops). Language toggle in the navbar switches locale and updates the cookie.

### Sections (in order)
1. **Navbar** — Logo, nav links, EN/ES toggle, "Call Now" CTA
2. **Hero** — Bold headline, tagline, dual CTA (call + form), trust stats
3. **Services** — 6-card grid (Installation, Repair, Maintenance, Commercial, Residential, Emergency)
4. **Why Us** — 3 trust pillars (Family-owned, Licensed & Insured, Bilingual)
5. **Contact** — Inline form (name, phone, email, service, message) + contact info cards
6. **Footer** — Logo, phone numbers, email, copyright

---

## 4. i18n Architecture

- **Library:** `next-intl`
- **Locale files:** `messages/en.json` and `messages/es.json`
- **Usage:** `const t = useTranslations('section')` then `t('key')` in every component
- **All user-visible strings** must go through `t()` — no hardcoded English text in components
- **Phone numbers and email** are NOT translated (same in both locales) but are stored in locale files for consistency

---

## 5. Contact Form

- **Fields:** Name, Phone, Email, Service type (dropdown), Message
- **Submission:** POST to Next.js API route `/api/contact`
- **Email delivery:** Resend SDK — sends to `sales@mgm-ac-appliances.com`
- **UX:** Loading state on submit button, success/error message shown inline (no page redirect)
- **Validation:** Client-side required field check before submission

---

## 6. Contact Information

| Channel | Value |
|---|---|
| Phone (English) | (786) 352-0084 |
| Phone (Spanish) | (305) 720-8273 |
| Email | sales@mgm-ac-appliances.com |

---

## 7. Design System — Cryo Theme

See `design-reference.md` at project root for the full style guide.

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--ice` | `#F0F9FF` | Page background |
| `--sky` | `#0EA5E9` | Primary brand, CTAs, accents |
| `--sky-light` | `#BAE6FD` | Highlights, stat numbers, dark-bg text |
| `--sky-dark` | `#0369A1` | Hover states, gradient ends |
| `--navy` | `#0F172A` | Hero background, footer, headings |
| `--navy-mid` | `#1E293B` | Secondary dark surfaces |
| `--slate` | `#475569` | Body text, subtitles |
| `--white` | `#FFFFFF` | Card backgrounds, form surfaces |

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Display headings | Outfit | 900 | `clamp(2.8rem, 6vw, 5rem)` |
| Section headings | Outfit | 900 | `clamp(1.8rem, 3.5vw, 2.8rem)` |
| Card titles | Outfit | 700 | `1.1rem` |
| Body text | Inter | 400 | `1rem` |
| Labels/badges | Inter | 600–700 | `0.7–0.85rem` |

### Component Patterns
- **Cards:** White background, `1px solid rgba(14,165,233,0.1)` border, `16px` radius, hover lifts `4px` with blue shadow
- **Buttons (primary):** Sky blue fill, `10px` radius, box-shadow glow, hover lifts `2px`
- **Buttons (secondary):** Glass effect (`rgba(255,255,255,0.08)`), white border, dark backgrounds only
- **Navbar:** Sticky, dark navy `rgba(15,23,42,0.95)`, `backdrop-filter: blur(12px)`
- **Hero:** Dark navy-to-midnight gradient with radial sky-blue glow overlays
- **Why Us section:** Dark navy background with frosted-glass cards

---

## 8. Responsive / Mobile Strategy

- Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) throughout
- Navbar collapses to hamburger menu on mobile (`< md`)
- Services grid: 3 cols (desktop) → 2 cols (tablet) → 1 col (mobile)
- Why Us grid: 3 cols → 1 col (mobile)
- Contact layout: 2-col → stacked (mobile)
- Touch-friendly tap targets (min 44px height on all interactive elements)
- Hero stats hide or stack on small screens

---

## 9. SEO

- `next-intl` generates `/en` and `/es` routes — each is a real pre-rendered HTML page
- `<head>` metadata (title, description, og:tags) fully translated via locale files
- `hreflang` tags for EN/ES alternates
- Semantic HTML throughout (`<section>`, `<nav>`, `<main>`, `<footer>`)
- Target keywords: "AC repair South Florida", "air conditioning installation Miami", "reparación de aire acondicionado Miami"

---

## 10. Deployment & Domain

1. Code pushed to GitHub → Vercel auto-deploys on every push to `main`
2. Vercel provides a `.vercel.app` preview URL
3. Custom domain connected via Squarespace DNS (CNAME record pointing to Vercel)
4. Vercel handles SSL certificate automatically

---

## 11. File Structure (Planned)

```
/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── WhyUs.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── messages/
│   ├── en.json
│   └── es.json
├── public/
├── design-reference.md   ← design style guide
├── tailwind.config.ts
├── next.config.ts
└── package.json
```
