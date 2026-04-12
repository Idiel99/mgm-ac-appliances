# SEO Optimization — MGM A/C Appliances Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the MGM A/C Appliances site from zero SEO infrastructure to a fully optimized local HVAC business site that ranks competitively in Miami / South Florida search results — covering technical SEO, structured data, per-page metadata, crawlability, bilingual optimization, and localization bug fixes.

**Architecture:** Static-exported Next.js 16 site with `next-intl` for EN/ES. Since `output: "export"` is used, dynamic file conventions like `app/sitemap.ts` and `app/robots.ts` won't generate at build time — we use static files in `public/` and a build script for the sitemap instead. JSON-LD structured data is injected via a reusable server component. Every page gets unique metadata with Open Graph (including `alternateLocale`), Twitter Cards, and proper hreflang alternates using `en-US`/`es-US` region codes plus `x-default`. The root `/` page gets a `<meta http-equiv="refresh">` redirect to replace the current client-side `useEffect` redirect that crawlers cannot follow.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, next-intl, JSON-LD (no extra packages needed)

---

## Research Summary

This plan is informed by 10 parallel research agents covering:
- Local SEO strategies for Miami HVAC companies
- Technical SEO for Next.js (static export limitations)
- Content SEO and keyword research (EN + ES)
- Core Web Vitals impact on local rankings
- Multilingual/bilingual SEO best practices
- Schema.org structured data (HVACBusiness, FAQ, Service, Article)
- Competitive analysis of top-ranking Miami AC companies
- Full codebase audit (two passes)

Key competitive findings: Very few Miami HVAC competitors have Spanish-language pages — MGM's bilingual site is a major untapped advantage. Top organic results use dedicated service pages (not homepages), FAQ schema for rich snippets, and heavy cross-linking between city and service pages.

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `components/JsonLd.tsx` | Reusable JSON-LD `<script>` injector |
| Create | `lib/seo.ts` | Shared SEO constants, `generatePageMetadata()` helper |
| Create | `public/robots.txt` | Crawler directives + sitemap pointer |
| Create | `scripts/generate-sitemap.mjs` | Build-time sitemap generator with hreflang (postbuild) |
| Create | `vercel.json` | 301 redirect from `/` to `/en` at edge |
| Modify | `app/page.tsx` | Replace `useEffect` redirect with `<meta http-equiv="refresh">` + real metadata |
| Modify | `app/layout.tsx` | Dynamic `lang` attribute from locale |
| Modify | `app/[locale]/layout.tsx` | Enhanced metadata: OG, Twitter, `en-US`/`es-US` hreflang, `alternateLocale`, metadataBase, title template |
| Modify | `app/[locale]/page.tsx` | Add LocalBusiness + FAQ JSON-LD with `inLanguage`/`availableLanguage`/`knowsLanguage` |
| Modify | `app/[locale]/about/page.tsx` | Add `generateMetadata` |
| Modify | `app/[locale]/services/page.tsx` | Add `generateMetadata` |
| Modify | `app/[locale]/services/[serviceId]/page.tsx` | Add `generateMetadata` + Service JSON-LD |
| Modify | `app/[locale]/service-areas/page.tsx` | Add `generateMetadata` |
| Modify | `app/[locale]/service-areas/[cityId]/page.tsx` | Add `generateMetadata`, fix hardcoded English strings |
| Modify | `app/[locale]/blog/page.tsx` | Add `generateMetadata` |
| Modify | `app/[locale]/blog/[slug]/page.tsx` | Add `generateMetadata` + Article JSON-LD |
| Modify | `app/[locale]/financing/page.tsx` | Add `generateMetadata` |
| Modify | `app/[locale]/warranty/page.tsx` | Add `generateMetadata` |
| Modify | `app/[locale]/coupons/page.tsx` | Add `generateMetadata` |
| Modify | `app/[locale]/privacy/page.tsx` | Add `generateMetadata` |
| Modify | `components/Footer.tsx` | Locale-aware links (replace hardcoded `/en/`) |
| Modify | `messages/en.json` | Add per-page SEO strings + city page i18n keys |
| Modify | `messages/es.json` | Add per-page SEO strings (Spanish-keyword-optimized) + city page i18n keys |
| Modify | `package.json` | Add `postbuild` script for sitemap generation |

---

## Task 1: SEO Constants & Metadata Helper

**Files:**
- Create: `lib/seo.ts`

This module centralizes the base URL, site name, and a helper that builds per-page metadata objects with OG (including `alternateLocale`), Twitter, and hreflang using `en-US`/`es-US` — so every page doesn't repeat the same boilerplate.

- [ ] **Step 1: Create `lib/seo.ts`**

```ts
import type { Metadata } from "next";

export const SITE_URL = "https://mgm-ac-appliances.com";
export const SITE_NAME = "MGM A/C Appliances";

type PageMetadataOptions = {
  title: string;
  description: string;
  locale: string;
  path: string; // e.g. "/about" or "/services/repair" (no locale prefix)
};

export function generatePageMetadata({
  title,
  description,
  locale,
  path,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "en-US": `${SITE_URL}/en${path}`,
        "es-US": `${SITE_URL}/es${path}`,
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit lib/seo.ts`
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/seo.ts
git commit -m "feat(seo): add shared SEO constants and metadata helper with en-US/es-US hreflang"
```

---

## Task 2: JSON-LD Component

**Files:**
- Create: `components/JsonLd.tsx`

A lightweight server component that injects a `<script type="application/ld+json">` tag. JSON-LD has zero performance impact — browsers parse it as inert data, not executable JavaScript.

- [ ] **Step 1: Create `components/JsonLd.tsx`**

```tsx
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/JsonLd.tsx
git commit -m "feat(seo): add reusable JSON-LD component"
```

---

## Task 3: Add Per-Page SEO Strings + City Page i18n Keys to Translation Files

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/es.json`

Each page needs its own `title` and `description` for metadata. Also adds missing i18n keys for hardcoded English text on city detail pages ("Neighborhoods We Serve", "AC Service — Call Today", "Call for Free Estimate"). Spanish SEO strings use independently researched Spanish keywords (not just translations of English).

- [ ] **Step 1: Add `seo` object and city page keys to `messages/en.json`**

Add as new top-level keys:

```json
"seo": {
  "about": {
    "title": "About MGM A/C Appliances — Family-Owned AC Company in Miami",
    "description": "Meet the family behind MGM A/C Appliances. Honest, bilingual AC service in South Florida since day one. Licensed, insured, and committed to your comfort."
  },
  "services": {
    "title": "AC Services — Installation, Repair & Maintenance | MGM A/C",
    "description": "Complete AC solutions for South Florida homes and businesses. Installation, repair, maintenance, and 24/7 emergency service. Call (786) 352-0084."
  },
  "serviceAreas": {
    "title": "Service Areas — Miami, Fort Lauderdale & South Florida | MGM A/C",
    "description": "MGM A/C Appliances serves Miami, Hialeah, Coral Gables, Doral, Fort Lauderdale, and all of South Florida. Find AC service near you."
  },
  "blog": {
    "title": "AC Tips & Advice for South Florida Homeowners | MGM A/C Blog",
    "description": "Expert AC maintenance tips, buying guides, and advice for South Florida homeowners. Stay cool and save money on your energy bills."
  },
  "financing": {
    "title": "AC Financing Options — Flexible Payment Plans | MGM A/C",
    "description": "Affordable financing for new AC systems in South Florida. Flexible payment plans to fit your budget. Get a free estimate today."
  },
  "warranty": {
    "title": "AC Warranty Information | MGM A/C Appliances",
    "description": "Learn about our warranty coverage for AC installations and repairs. We stand behind our work with comprehensive warranties."
  },
  "coupons": {
    "title": "AC Coupons & Special Offers | MGM A/C Appliances",
    "description": "Save on AC services in South Florida. Free estimates, discounts for new customers, and seasonal specials. Print your coupon today."
  },
  "privacy": {
    "title": "Privacy Policy | MGM A/C Appliances",
    "description": "Read the MGM A/C Appliances privacy policy. Learn how we handle your personal information."
  },
  "installation": {
    "title": "AC Installation Miami — Free Estimates | MGM A/C Appliances",
    "description": "Professional AC installation in South Florida. All major brands. Free estimates, expert sizing, and clean installations. Call (786) 352-0084."
  },
  "repair": {
    "title": "AC Repair Miami — Same-Day & 24/7 Emergency | MGM A/C",
    "description": "Fast, reliable AC repair across South Florida. Same-day service, 24/7 emergency calls, upfront pricing. No after-hours fees. Call now."
  },
  "maintenance": {
    "title": "AC Maintenance Miami — Keep Your System Running | MGM A/C",
    "description": "Preventive AC maintenance in South Florida. Seasonal tune-ups, filter replacement, and system inspections. Extend your unit's life."
  },
  "commercial": {
    "title": "Commercial HVAC Services Miami | MGM A/C Appliances",
    "description": "Full-scale commercial HVAC for offices, retail, and industrial spaces in South Florida. Licensed and experienced. Call for a quote."
  },
  "residential": {
    "title": "Residential AC Services Miami | MGM A/C Appliances",
    "description": "Complete residential AC services for South Florida homes. Installation, repair, and maintenance. Family-owned, bilingual service."
  },
  "emergency": {
    "title": "24/7 Emergency AC Repair Miami | MGM A/C Appliances",
    "description": "Emergency AC repair in South Florida — day or night. No after-hours fees. Fast response times. Call (786) 352-0084 now."
  }
}
```

Also add these keys inside the existing `"serviceArea"` object:

```json
"neighborhoodsTitle": "Neighborhoods We Serve",
"cityCtaTitle": "AC Service — Call Today",
"cityCtaButton": "Call for Free Estimate"
```

- [ ] **Step 2: Add `seo` object and city page keys to `messages/es.json`**

Spanish SEO strings use independently researched high-volume Spanish keywords (e.g., "reparacion de aire acondicionado" instead of "reparacion de AC"):

```json
"seo": {
  "about": {
    "title": "Sobre MGM A/C Appliances — Empresa Familiar de Aire Acondicionado en Miami",
    "description": "Conozca a la familia detrás de MGM A/C Appliances. Servicio de aire acondicionado honesto y bilingüe en South Florida. Licenciados y asegurados."
  },
  "services": {
    "title": "Servicios de Aire Acondicionado — Instalación, Reparación y Mantenimiento | MGM A/C",
    "description": "Soluciones completas de aire acondicionado para hogares y negocios en South Florida. Instalación, reparación, mantenimiento y servicio de emergencia 24/7. Llame al (305) 720-8273."
  },
  "serviceAreas": {
    "title": "Áreas de Servicio — Miami, Fort Lauderdale y South Florida | MGM A/C",
    "description": "MGM A/C Appliances sirve a Miami, Hialeah, Coral Gables, Doral, Fort Lauderdale y todo South Florida. Encuentre servicio de aire acondicionado cerca de usted."
  },
  "blog": {
    "title": "Consejos de Aire Acondicionado para Propietarios en South Florida | Blog MGM A/C",
    "description": "Consejos de mantenimiento de aire acondicionado, guías de compra y consejos para propietarios en South Florida."
  },
  "financing": {
    "title": "Financiamiento para Aire Acondicionado — Planes de Pago Flexibles | MGM A/C",
    "description": "Financiamiento accesible para sistemas de aire acondicionado nuevos en South Florida. Planes de pago flexibles. Presupuesto gratis."
  },
  "warranty": {
    "title": "Información de Garantía de Aire Acondicionado | MGM A/C Appliances",
    "description": "Conozca nuestra cobertura de garantía para instalaciones y reparaciones de aire acondicionado. Respaldamos nuestro trabajo."
  },
  "coupons": {
    "title": "Cupones y Ofertas Especiales de Aire Acondicionado | MGM A/C Appliances",
    "description": "Ahorre en servicios de aire acondicionado en South Florida. Presupuestos gratis, descuentos para nuevos clientes y especiales de temporada."
  },
  "privacy": {
    "title": "Política de Privacidad | MGM A/C Appliances",
    "description": "Lea la política de privacidad de MGM A/C Appliances."
  },
  "installation": {
    "title": "Instalación de Aire Acondicionado en Miami — Presupuestos Gratis | MGM A/C",
    "description": "Instalación profesional de aire acondicionado en South Florida. Todas las marcas principales. Presupuestos gratis. Llame al (305) 720-8273."
  },
  "repair": {
    "title": "Reparación de Aire Acondicionado en Miami — Mismo Día y Emergencia 24/7 | MGM A/C",
    "description": "Reparación rápida y confiable de aire acondicionado en South Florida. Servicio el mismo día, emergencia 24/7, precios transparentes."
  },
  "maintenance": {
    "title": "Mantenimiento de Aire Acondicionado en Miami | MGM A/C Appliances",
    "description": "Mantenimiento preventivo de aire acondicionado en South Florida. Ajustes de temporada, reemplazo de filtros e inspecciones del sistema."
  },
  "commercial": {
    "title": "Servicios Comerciales de Aire Acondicionado en Miami | MGM A/C Appliances",
    "description": "Aire acondicionado comercial para oficinas, tiendas e instalaciones industriales en South Florida. Técnicos licenciados."
  },
  "residential": {
    "title": "Servicios Residenciales de Aire Acondicionado en Miami | MGM A/C Appliances",
    "description": "Servicios completos de aire acondicionado residencial en South Florida. Instalación, reparación y mantenimiento. Servicio bilingüe."
  },
  "emergency": {
    "title": "Reparación de Emergencia de Aire Acondicionado 24/7 en Miami | MGM A/C",
    "description": "Reparación de emergencia de aire acondicionado en South Florida — día o noche. Sin cargos adicionales. Llame al (305) 720-8273."
  }
}
```

Also add inside the existing `"serviceArea"` object:

```json
"neighborhoodsTitle": "Vecindarios que Servimos",
"cityCtaTitle": "Servicio de A/C — Llame Hoy",
"cityCtaButton": "Llame para Presupuesto Gratis"
```

- [ ] **Step 3: Verify JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('en.json OK')" && node -e "JSON.parse(require('fs').readFileSync('messages/es.json','utf8')); console.log('es.json OK')"`
Expected: both print "OK"

- [ ] **Step 4: Commit**

```bash
git add messages/en.json messages/es.json
git commit -m "feat(seo): add per-page SEO strings (EN/ES) and city page i18n keys"
```

---

## Task 4: Fix Root Page Redirect (Critical SEO Fix)

**Files:**
- Modify: `app/page.tsx`
- Create: `vercel.json`

The root `/` page currently uses a `useEffect` + `router.replace()` client-side redirect. Crawlers see an empty spinner div with generic metadata — this is the site's #1 SEO problem. We fix it with: (1) a `vercel.json` edge redirect (proper HTTP 301), and (2) a `<meta http-equiv="refresh">` fallback with real metadata so crawlers always get meaningful content.

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "redirects": [
    { "source": "/", "destination": "/en", "permanent": true }
  ]
}
```

- [ ] **Step 2: Replace `app/page.tsx`**

Replace the entire file. This removes the `"use client"` directive and `useEffect` redirect, replacing them with a server component that has proper metadata and a `<meta http-equiv="refresh">` fallback:

```tsx
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} — AC Services in South Florida`,
  description: "Family-owned AC installation, repair, and maintenance across South Florida. Available 24/7. Call (786) 352-0084.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      "en-US": `${SITE_URL}/en`,
      "es-US": `${SITE_URL}/es`,
      "x-default": `${SITE_URL}/en`,
    },
  },
};

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/en" />
      <div className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin" />
      </div>
    </>
  );
}
```

- [ ] **Step 3: Build and verify**

Run: `npx next build 2>&1 | tail -5`
Expected: successful build, no errors about "use client" or router

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx vercel.json
git commit -m "fix(seo): replace client-side redirect with meta refresh + vercel.json 301"
```

---

## Task 5: Enhance Root & Locale Layout Metadata

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/[locale]/layout.tsx`

The root layout hardcodes `lang="en"` — Spanish pages send contradictory language signals. The locale layout needs `en-US`/`es-US` hreflang, `alternateLocale` in OG, `metadataBase`, title template, and robot directives.

- [ ] **Step 1: Update `app/layout.tsx`**

Replace the entire file:

```tsx
import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MGM A/C Appliances",
  description: "Family-owned AC services in South Florida.",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = params ? await params : {};
  const lang = resolvedParams.locale ?? "en";

  return (
    <html lang={lang} className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Update `app/[locale]/layout.tsx`**

Replace the entire file:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      default: t("title"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("description"),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        "en-US": `${SITE_URL}/en`,
        "es-US": `${SITE_URL}/es`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_US" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 3: Build and verify**

Run: `npx next build 2>&1 | tail -5`
Expected: successful build

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/[locale]/layout.tsx
git commit -m "feat(seo): dynamic html lang, en-US/es-US hreflang, OG alternateLocale, title template"
```

---

## Task 6: Add robots.txt

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://mgm-ac-appliances.com/sitemap.xml
```

- [ ] **Step 2: Commit**

```bash
git add public/robots.txt
git commit -m "feat(seo): add robots.txt with sitemap reference"
```

---

## Task 7: Add Sitemap Generator

**Files:**
- Create: `scripts/generate-sitemap.mjs`
- Modify: `package.json`

Uses `en-US`/`es-US` hreflang codes in the sitemap to match the metadata.

- [ ] **Step 1: Create `scripts/generate-sitemap.mjs`**

```js
import { writeFileSync } from "fs";

const BASE = "https://mgm-ac-appliances.com";
const LOCALES = ["en", "es"];

const STATIC_PAGES = [
  "",
  "/about",
  "/services",
  "/service-areas",
  "/financing",
  "/warranty",
  "/coupons",
  "/blog",
  "/privacy",
];

const SERVICE_IDS = [
  "installation", "repair", "maintenance",
  "commercial", "residential", "emergency",
];

const CITY_IDS = [
  "miami", "miamiBeach", "hialeah", "miamiGardens", "aventura",
  "coralGables", "doral", "kendall", "homestead", "theKeys",
  "fortLauderdale", "hollywood", "bocaraton", "westPalmBeach",
  "naples", "fortMyers",
];

const BLOG_SLUGS = [
  "maintenance-tips", "when-to-replace", "miami-climate-hvac",
];

function buildPaths() {
  const paths = [];

  for (const page of STATIC_PAGES) {
    paths.push({ path: page, priority: page === "" ? "1.0" : "0.8", changefreq: "weekly" });
  }
  for (const id of SERVICE_IDS) {
    paths.push({ path: `/services/${id}`, priority: "0.8", changefreq: "monthly" });
  }
  for (const id of CITY_IDS) {
    paths.push({ path: `/service-areas/${id}`, priority: "0.7", changefreq: "monthly" });
  }
  for (const slug of BLOG_SLUGS) {
    paths.push({ path: `/blog/${slug}`, priority: "0.6", changefreq: "monthly" });
  }

  return paths;
}

function toXml(paths) {
  const today = new Date().toISOString().split("T")[0];

  const urls = paths.flatMap(({ path, priority, changefreq }) =>
    LOCALES.map((locale) => {
      const loc = `${BASE}/${locale}${path}`;
      const hreflangs = LOCALES.map(
        (l) => `      <xhtml:link rel="alternate" hreflang="${l === "en" ? "en-US" : "es-US"}" href="${BASE}/${l}${path}" />`
      ).join("\n");
      const xdefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/en${path}" />`;

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangs}
${xdefault}
  </url>`;
    })
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join("\n")}
</urlset>`;
}

const paths = buildPaths();
const xml = toXml(paths);
writeFileSync("out/sitemap.xml", xml, "utf8");
console.log(`Sitemap generated: ${paths.length * LOCALES.length} URLs`);
```

- [ ] **Step 2: Add postbuild script to `package.json`**

In the `"scripts"` section, add:

```json
"postbuild": "node scripts/generate-sitemap.mjs"
```

- [ ] **Step 3: Test sitemap generation**

Run: `npx next build && node scripts/generate-sitemap.mjs`
Expected: "Sitemap generated: XX URLs" and valid `out/sitemap.xml`

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-sitemap.mjs package.json
git commit -m "feat(seo): add postbuild sitemap generator with en-US/es-US hreflang"
```

---

## Task 8: Homepage JSON-LD — LocalBusiness + FAQ Schemas

**Files:**
- Modify: `app/[locale]/page.tsx`

The homepage gets two JSON-LD blocks: an `HVACBusiness` schema with full NAP, `inLanguage`, `availableLanguage`, `knowsLanguage`, `paymentAccepted`, emergency `ContactPoint`, and `sameAs` — plus a `FAQPage` schema from existing FAQ data.

- [ ] **Step 1: Update `app/[locale]/page.tsx`**

Replace the entire file:

```tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SpecialOffers from "@/components/SpecialOffers";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyCallBar from "@/components/StickyCallBar";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/seo";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const faqT = await getTranslations({ locale, namespace: "faq" });
  const metaT = await getTranslations({ locale, namespace: "metadata" });

  const faqItems = Array.from({ length: 8 }, (_, i) => ({
    "@type": "Question" as const,
    name: faqT(`items.${i}.q`),
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faqT(`items.${i}.a`),
    },
  }));

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: "MGM A/C Appliances",
    url: SITE_URL,
    telephone: "+17863520084",
    email: "sales@mgm-ac-appliances.com",
    description: metaT("description"),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    availableLanguage: ["en", "es"],
    knowsLanguage: ["en", "es"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Miami",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Miami" },
      { "@type": "City", name: "Miami Beach" },
      { "@type": "City", name: "Hialeah" },
      { "@type": "City", name: "Coral Gables" },
      { "@type": "City", name: "Doral" },
      { "@type": "City", name: "Kendall" },
      { "@type": "City", name: "Homestead" },
      { "@type": "City", name: "Miami Gardens" },
      { "@type": "City", name: "Aventura" },
      { "@type": "City", name: "Fort Lauderdale" },
      { "@type": "City", name: "Hollywood" },
      { "@type": "City", name: "Boca Raton" },
      { "@type": "City", name: "West Palm Beach" },
      { "@type": "City", name: "Naples" },
      { "@type": "City", name: "Fort Myers" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+17863520084",
        contactType: "customer service",
        availableLanguage: "English",
      },
      {
        "@type": "ContactPoint",
        telephone: "+13057208273",
        contactType: "customer service",
        availableLanguage: "Spanish",
      },
      {
        "@type": "ContactPoint",
        telephone: "+17863520084",
        contactType: "emergency",
        availableLanguage: ["English", "Spanish"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Check", "Financing"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Repair" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AC Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial HVAC" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Emergency AC Repair" } },
      ],
    },
    sameAs: [],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <main className="pb-14 md:pb-0">
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />
      <Navbar />
      <Hero />
      <ScrollReveal animation="fade-up">
        <SpecialOffers />
      </ScrollReveal>
      <ScrollReveal animation="fade-right">
        <Services />
      </ScrollReveal>
      <ScrollReveal animation="fade-left">
        <WhyUs />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal animation="zoom-in">
        <FAQ />
      </ScrollReveal>
      <ScrollReveal animation="zoom-in">
        <Contact />
      </ScrollReveal>
      <ScrollReveal animation="fade-up">
        <Footer />
      </ScrollReveal>
      <StickyCallBar />
    </main>
  );
}
```

- [ ] **Step 2: Build and verify**

Run: `npx next build 2>&1 | tail -5`
Expected: successful build

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat(seo): add HVACBusiness and FAQPage JSON-LD with bilingual ContactPoints"
```

---

## Task 9: Per-Page Metadata — All Static Pages

**Files:**
- Modify: `app/[locale]/about/page.tsx`
- Modify: `app/[locale]/financing/page.tsx`
- Modify: `app/[locale]/warranty/page.tsx`
- Modify: `app/[locale]/coupons/page.tsx`
- Modify: `app/[locale]/privacy/page.tsx`
- Modify: `app/[locale]/blog/page.tsx`
- Modify: `app/[locale]/services/page.tsx`
- Modify: `app/[locale]/service-areas/page.tsx`

Each page gets a `generateMetadata` export using the helper.

- [ ] **Step 1: Add `generateMetadata` to each page**

Add these imports to each file:

```tsx
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
```

Then add this function (changing the key and path per page):

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  return generatePageMetadata({
    title: t("about.title"),       // change per page
    description: t("about.description"), // change per page
    locale,
    path: "/about",                // change per page
  });
}
```

Page-to-key mapping:

| Page file | SEO key | Path |
|-----------|---------|------|
| `about/page.tsx` | `about` | `/about` |
| `financing/page.tsx` | `financing` | `/financing` |
| `warranty/page.tsx` | `warranty` | `/warranty` |
| `coupons/page.tsx` | `coupons` | `/coupons` |
| `privacy/page.tsx` | `privacy` | `/privacy` |
| `blog/page.tsx` | `blog` | `/blog` |
| `services/page.tsx` | `services` | `/services` |
| `service-areas/page.tsx` | `serviceAreas` | `/service-areas` |

- [ ] **Step 2: Build and verify**

Run: `npx next build 2>&1 | tail -5`
Expected: successful build

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/about/page.tsx app/[locale]/financing/page.tsx app/[locale]/warranty/page.tsx app/[locale]/coupons/page.tsx app/[locale]/privacy/page.tsx app/[locale]/blog/page.tsx app/[locale]/services/page.tsx app/[locale]/service-areas/page.tsx
git commit -m "feat(seo): add per-page metadata with OG and hreflang to all static pages"
```

---

## Task 10: Per-Page Metadata & JSON-LD — Service Detail Pages

**Files:**
- Modify: `app/[locale]/services/[serviceId]/page.tsx`

Service pages get unique metadata and a `Service` JSON-LD schema with `inLanguage`.

- [ ] **Step 1: Add imports**

```tsx
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
```

- [ ] **Step 2: Add `generateMetadata` after `generateStaticParams`**

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; serviceId: string }>;
}): Promise<Metadata> {
  const { locale, serviceId } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  if (!t.has(`${serviceId}.title`)) return {};

  return generatePageMetadata({
    title: t(`${serviceId}.title`),
    description: t(`${serviceId}.description`),
    locale,
    path: `/services/${serviceId}`,
  });
}
```

- [ ] **Step 3: Add Service JSON-LD inside the component**

After the `signs` array, add:

```tsx
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: t(`${serviceId}.title`),
    provider: {
      "@type": "HVACBusiness",
      name: "MGM A/C Appliances",
      telephone: "+17863520084",
    },
    areaServed: {
      "@type": "State",
      name: "Florida",
    },
    description: t(`${serviceId}.longDesc`),
    inLanguage: locale === "es" ? "es-US" : "en-US",
  };
```

Add `<JsonLd data={serviceSchema} />` as the first child of `<main>`.

- [ ] **Step 4: Build and verify**

Run: `npx next build 2>&1 | tail -5`

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/services/[serviceId]/page.tsx
git commit -m "feat(seo): add metadata and Service JSON-LD to service detail pages"
```

---

## Task 11: Per-Page Metadata + Fix Hardcoded English — City Pages

**Files:**
- Modify: `app/[locale]/service-areas/[cityId]/page.tsx`

City pages get unique metadata and the three hardcoded English strings are replaced with translation keys.

- [ ] **Step 1: Add imports**

```tsx
import type { Metadata } from "next";
import { generatePageMetadata, SITE_NAME } from "@/lib/seo";
```

- [ ] **Step 2: Add `generateMetadata` after `generateStaticParams`**

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; cityId: string }>;
}): Promise<Metadata> {
  const { locale, cityId } = await params;
  const t = await getTranslations({ locale, namespace: "serviceArea" });

  if (!CITY_IDS.includes(cityId)) return {};

  const cityName = t(`cities.${cityId}.name`);
  const title = locale === "es"
    ? `Servicios de Aire Acondicionado en ${cityName}, FL | ${SITE_NAME}`
    : `AC Services in ${cityName}, FL | ${SITE_NAME}`;
  const description = t(`cities.${cityId}.desc`);

  return generatePageMetadata({
    title,
    description,
    locale,
    path: `/service-areas/${cityId}`,
  });
}
```

- [ ] **Step 3: Replace hardcoded English strings**

In the component JSX, replace:

Line ~61: `{t(`cities.${cityId}.name`)} — Neighborhoods We Serve`
→ `{t(`cities.${cityId}.name`)} — {t("neighborhoodsTitle")}`

Line ~81: `{t(`cities.${cityId}.name`)} AC Service — Call Today`
→ `{t(`cities.${cityId}.name`)} — {t("cityCtaTitle")}`

Line ~88: `Call for Free Estimate`
→ `{t("cityCtaButton")}`

- [ ] **Step 4: Build and verify**

Run: `npx next build 2>&1 | tail -5`

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/service-areas/[cityId]/page.tsx
git commit -m "fix(i18n): replace hardcoded English on city pages, add per-city metadata"
```

---

## Task 12: Per-Page Metadata & JSON-LD — Blog Posts

**Files:**
- Modify: `app/[locale]/blog/[slug]/page.tsx`

Blog posts get unique metadata and an `Article` JSON-LD schema.

- [ ] **Step 1: Add imports**

```tsx
import type { Metadata } from "next";
import { generatePageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
```

- [ ] **Step 2: Add `generateMetadata` after `generateStaticParams`**

```tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  if (!SLUGS.includes(slug)) return {};

  return generatePageMetadata({
    title: t(`posts.${slug}.title`),
    description: t(`posts.${slug}.title`),
    locale,
    path: `/blog/${slug}`,
  });
}
```

- [ ] **Step 3: Add Article JSON-LD inside the component**

Before the return:

```tsx
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t(`posts.${slug}.title`),
    datePublished: t(`posts.${slug}.date`),
    inLanguage: locale === "es" ? "es-US" : "en-US",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${slug}`,
    },
  };
```

Add `<JsonLd data={articleSchema} />` as the first child of `<main>`.

- [ ] **Step 4: Build and verify**

Run: `npx next build 2>&1 | tail -5`

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/blog/[slug]/page.tsx
git commit -m "feat(seo): add metadata and Article JSON-LD to blog posts"
```

---

## Task 13: Fix Footer Locale-Aware Links

**Files:**
- Modify: `components/Footer.tsx`

All 8 footer navigation links are hardcoded to `/en/`. Spanish users clicking them get sent to English pages.

- [ ] **Step 1: Add `getLocale` import**

Change the existing import to:

```tsx
import { getTranslations, getLocale } from "next-intl/server";
```

- [ ] **Step 2: Get the current locale**

At the beginning of the `Footer` function body, add:

```tsx
  const locale = await getLocale();
```

- [ ] **Step 3: Replace all hardcoded `/en/` paths**

| Before | After |
|--------|-------|
| `href="/en/about"` | `` href={`/${locale}/about`} `` |
| `href="/en/service-areas"` | `` href={`/${locale}/service-areas`} `` |
| `href="/en/financing"` | `` href={`/${locale}/financing`} `` |
| `href="/en/coupons"` | `` href={`/${locale}/coupons`} `` |
| `href="/en/warranty"` | `` href={`/${locale}/warranty`} `` |
| `href="/en/blog"` | `` href={`/${locale}/blog`} `` |
| `` href={`/en/services/${id}`} `` | `` href={`/${locale}/services/${id}`} `` |
| `href="/en/privacy"` | `` href={`/${locale}/privacy`} `` |

- [ ] **Step 4: Build and verify**

Run: `npx next build 2>&1 | tail -5`

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx
git commit -m "fix(i18n): make Footer links locale-aware instead of hardcoded /en/"
```

---

## Task 14: Final Build Verification

- [ ] **Step 1: Full build**

Run: `npx next build`
Expected: all pages build successfully

- [ ] **Step 2: Verify sitemap generation**

Run: `node scripts/generate-sitemap.mjs`
Expected: sitemap.xml generated with correct en-US/es-US hreflang

- [ ] **Step 3: Spot-check JSON-LD in built pages**

Run: `grep -l "application/ld+json" out/en/index.html out/en/services/repair.html out/en/blog/maintenance-tips.html 2>/dev/null`
Expected: all three files contain JSON-LD

- [ ] **Step 4: Spot-check hreflang in metadata**

Run: `grep "es-US" out/en/about.html`
Expected: hreflang alternate links present

- [ ] **Step 5: Verify root page has meta refresh**

Run: `grep "http-equiv" out/index.html`
Expected: `<meta http-equiv="refresh" content="0;url=/en">`

- [ ] **Step 6: Verify robots.txt is in output**

Run: `cat out/robots.txt`
Expected: robots.txt with sitemap reference

- [ ] **Step 7: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "feat(seo): complete SEO optimization — metadata, JSON-LD, sitemap, robots, i18n fixes"
```

---

## What This Plan Covers (Summary)

| SEO Feature | Before | After |
|---|---|---|
| Root `/` page | Empty spinner (client-side redirect) | `<meta refresh>` + `vercel.json` 301 + real metadata |
| Per-page title/description | Only on locale layout | Every page has unique metadata |
| Open Graph tags | Missing | All pages (with `alternateLocale`) |
| Twitter Cards | Missing | All pages |
| hreflang | Bare `en`/`es`, layout only | `en-US`/`es-US` + `x-default` on all pages + sitemap |
| Canonical URLs | Relative (`/en`) | Absolute (`https://mgm-ac-appliances.com/en`) |
| Dynamic `html lang` | Hardcoded `en` | Matches current locale |
| robots.txt | Missing | Created |
| XML Sitemap | Missing | Auto-generated with hreflang |
| JSON-LD: HVACBusiness | Missing | Homepage (with `inLanguage`, `knowsLanguage`, `ContactPoint`) |
| JSON-LD: FAQPage | Missing | Homepage (rich snippet eligible) |
| JSON-LD: Service | Missing | Each service detail page |
| JSON-LD: Article | Missing | Each blog post |
| `title.template` | Not used | `%s \| MGM A/C Appliances` |
| Footer links | Hardcoded `/en/` | Dynamic per locale |
| City page English strings | 3 hardcoded strings | Translated via `t()` |
| Spanish SEO keywords | Translations of English | Independently researched Spanish keywords |
| Bilingual schema signals | None | `inLanguage`, `availableLanguage`, `knowsLanguage` |
| Emergency contact schema | None | `ContactPoint` with `contactType: "emergency"` |

## What This Plan Does NOT Cover (Future Work — Prioritized)

**High Impact:**
1. Blog content expansion — add 10+ posts targeting "People Also Ask" questions ("What is the $5000 AC rule?", "How much does AC repair cost in Miami?", "Why is my AC not working in Florida?")
2. Service area page content expansion — from ~150 words to 1,500+ words with unique content per city
3. Service + city combination pages — e.g., `/services/repair/miami-beach`
4. Cross-linking between service and city pages
5. Remove `output: "export"` — unlock `next/image` optimization, runtime sitemap, proper API routes

**Medium Impact:**
6. Open Graph image generation — `opengraph-image.tsx` for dynamic social previews
7. BreadcrumbList JSON-LD + fix Breadcrumb component to use translations instead of URL slugs
8. Custom `not-found.tsx` page
9. Error page translation (`error.tsx` hardcoded English)
10. Add real images with `next/image` and descriptive alt text

**Off-Site (Not Code Changes):**
11. Google Business Profile optimization — photos, posts, Q&A, service categories
12. Review acquisition strategy — aim for 100+ Google reviews
13. Local citations — Yelp, Angi, BBB, HomeAdvisor, Nextdoor
14. Spanish-language backlinks — Hispanic chambers of commerce, Spanish media directories
15. Google Search Console setup and monitoring
