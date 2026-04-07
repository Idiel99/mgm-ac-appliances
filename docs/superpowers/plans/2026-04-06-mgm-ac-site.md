# MGM A/C Appliances Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (EN/ES) single-page marketing site for MGM A/C Appliances, deployed on Vercel with a custom Squarespace domain.

**Architecture:** Next.js 14 App Router with static generation (SSG). Locale routing via `next-intl` middleware (`/en`, `/es`). Tailwind CSS for styling with the Cryo design system. Contact form POSTs to a Next.js API route that sends email via Resend.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, next-intl, Resend, Playwright, Vercel

**Spec:** `docs/superpowers/specs/2026-04-06-mgm-ac-site-design.md`
**Design Reference:** `design-reference.md`

---

### Task 1: Create GitHub Repo and Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.gitignore`, `.env.local`

- [ ] **Step 1: Create GitHub repository**

```bash
gh repo create mgm-ac-appliances --public --description "MGM A/C Appliances — bilingual Next.js site" --clone=false
```

Expected: `✓ Created repository <username>/mgm-ac-appliances on GitHub`

- [ ] **Step 2: Initialize git in the project directory**

```bash
cd C:/Users/idiel/Desktop/MGM/Site
git init
```

- [ ] **Step 3: Scaffold Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

If prompted about the non-empty directory, confirm yes. This generates the standard Next.js 14 scaffold.

- [ ] **Step 4: Add `.superpowers/` to `.gitignore`**

Append to the end of `.gitignore`:

```
# Brainstorm assets
.superpowers/
```

- [ ] **Step 5: Create `.env.local` with placeholder**

```
RESEND_API_KEY=re_placeholder_replace_me
```

- [ ] **Step 6: Verify the scaffold runs**

```bash
npm run dev
```

Visit `http://localhost:3000`. Confirm the default Next.js page loads. Stop the dev server.

- [ ] **Step 7: Commit and push**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts tailwind.config.ts postcss.config.mjs app/ public/ .gitignore .eslintrc.json design-reference.md docs/
git commit -m "chore: scaffold Next.js 14 project with Tailwind"
git remote add origin https://github.com/$(gh api user -q '.login')/mgm-ac-appliances.git
git branch -M main
git push -u origin main
```

Do NOT commit `.env.local`.

---

### Task 2: Configure Tailwind and Fonts

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update `tailwind.config.ts` with font families**

Replace the full file with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Replace `app/globals.css`**

Replace the full file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    @apply font-inter bg-sky-50 text-slate-900;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-outfit), sans-serif;
  }
}
```

- [ ] **Step 3: Update `app/layout.tsx` with Google Fonts**

Replace the full file with:

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify fonts load**

```bash
npm run dev
```

Open `http://localhost:3000`, inspect the `<html>` tag in DevTools — it should have CSS variables `--font-outfit` and `--font-inter`.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts app/globals.css app/layout.tsx
git commit -m "feat: configure Cryo theme fonts and Tailwind"
```

---

### Task 3: Set Up next-intl

**Files:**
- Create: `middleware.ts`
- Create: `i18n/request.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Install next-intl**

```bash
npm install next-intl
```

- [ ] **Step 2: Create `i18n/request.ts`**

```ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || "en";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create `middleware.ts`**

```ts
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es"],
  defaultLocale: "en",
  localeDetection: true,
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 4: Update `next.config.ts`**

Replace the full file with:

```ts
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig = {};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Commit**

```bash
git add middleware.ts i18n/ next.config.ts package.json package-lock.json
git commit -m "feat: set up next-intl locale routing"
```

---

### Task 4: Create Locale Files

**Files:**
- Create: `messages/en.json`
- Create: `messages/es.json`

- [ ] **Step 1: Create `messages/en.json`**

```json
{
  "nav": {
    "services": "Services",
    "about": "About",
    "contact": "Contact",
    "callNow": "Call Now",
    "langEn": "EN",
    "langEs": "ES"
  },
  "hero": {
    "badge": "South Florida's Trusted AC Experts",
    "h1Line1": "Stay",
    "h1Highlight": "Cool",
    "h1Line2": "All Year Long",
    "body": "Family-owned AC services across South Florida. Installation, repair, maintenance, and emergency support — in English & Spanish.",
    "ctaCall": "Call for a Free Quote",
    "ctaForm": "Send a Message",
    "stat1Number": "10+",
    "stat1Label": "Years of Experience",
    "stat2Number": "500+",
    "stat2Label": "Happy Customers",
    "stat3Number": "24/7",
    "stat3Label": "Emergency Service"
  },
  "services": {
    "label": "What We Do",
    "title": "Complete AC Solutions",
    "subtitle": "From new installations to emergency repairs, we handle every aspect of your air conditioning needs.",
    "installation": {
      "title": "Installation",
      "desc": "New AC unit installation for homes and businesses, sized and configured for maximum efficiency."
    },
    "repair": {
      "title": "Repair",
      "desc": "Fast diagnosis and repair of any AC issue — we get your system running again quickly."
    },
    "maintenance": {
      "title": "Maintenance",
      "desc": "Scheduled tune-ups and annual plans to keep your system running at peak performance year-round."
    },
    "commercial": {
      "title": "Commercial",
      "desc": "Full-scale commercial HVAC solutions for offices, retail, and industrial spaces across South Florida."
    },
    "residential": {
      "title": "Residential",
      "desc": "Personalized home comfort solutions with energy-efficient systems tailored to your home."
    },
    "emergency": {
      "title": "Emergency Service",
      "desc": "AC broke down at midnight? We're available 24/7 for urgent repairs when you need us most."
    }
  },
  "whyUs": {
    "label": "Why Choose Us",
    "title": "We're Your Neighbors, Not Just Your Technicians",
    "family": {
      "title": "Family-Owned",
      "desc": "A real South Florida family committed to honest pricing and lasting relationships — not corporate quotas."
    },
    "licensed": {
      "title": "Licensed & Insured",
      "desc": "Fully licensed, bonded, and insured. You can trust our technicians in your home or business."
    },
    "bilingual": {
      "title": "Bilingual Service",
      "desc": "We serve you in both English and Spanish — because communication is everything when it comes to your comfort."
    }
  },
  "contact": {
    "label": "Get in Touch",
    "title": "Ready to Stay Cool?",
    "body": "Call us directly or fill out the form and we'll get back to you within the hour during business hours.",
    "phoneEnLabel": "English Line",
    "phoneEsLabel": "Spanish Line",
    "emailLabel": "Email",
    "formTitle": "Get a Free Quote",
    "nameLabel": "Name",
    "namePlaceholder": "John Smith",
    "phoneLabel": "Phone",
    "phonePlaceholder": "(786) 000-0000",
    "emailFormLabel": "Email",
    "emailPlaceholder": "you@email.com",
    "serviceLabel": "Service Needed",
    "serviceInstallation": "Installation",
    "serviceRepair": "Repair",
    "serviceMaintenance": "Maintenance",
    "serviceEmergency": "Emergency",
    "serviceOther": "Other",
    "messageLabel": "Message",
    "messagePlaceholder": "Describe your AC issue or what you need...",
    "submit": "Send Message →",
    "submitting": "Sending...",
    "successMessage": "Message sent! We'll get back to you shortly.",
    "errorMessage": "Something went wrong. Please call us directly."
  },
  "footer": {
    "copyright": "© 2025 MGM A/C Appliances. All rights reserved."
  },
  "metadata": {
    "title": "MGM A/C Appliances — AC Services in South Florida",
    "description": "Family-owned AC installation, repair, and maintenance across South Florida. Available 24/7. Call (786) 352-0084."
  },
  "shared": {
    "phoneEn": "(786) 352-0084",
    "phoneEnRaw": "7863520084",
    "phoneEs": "(305) 720-8273",
    "phoneEsRaw": "3057208273",
    "email": "sales@mgm-ac-appliances.com"
  }
}
```

- [ ] **Step 2: Create `messages/es.json`**

```json
{
  "nav": {
    "services": "Servicios",
    "about": "Nosotros",
    "contact": "Contacto",
    "callNow": "Llamar",
    "langEn": "EN",
    "langEs": "ES"
  },
  "hero": {
    "badge": "Los Expertos en A/C de South Florida",
    "h1Line1": "Mantente",
    "h1Highlight": "Fresco",
    "h1Line2": "Todo el Año",
    "body": "Servicios de aire acondicionado familiares en todo South Florida. Instalación, reparación, mantenimiento y servicio de emergencia — en inglés y español.",
    "ctaCall": "Llama para un Presupuesto Gratis",
    "ctaForm": "Enviar un Mensaje",
    "stat1Number": "10+",
    "stat1Label": "Años de Experiencia",
    "stat2Number": "500+",
    "stat2Label": "Clientes Satisfechos",
    "stat3Number": "24/7",
    "stat3Label": "Servicio de Emergencia"
  },
  "services": {
    "label": "Qué Hacemos",
    "title": "Soluciones Completas de A/C",
    "subtitle": "Desde nuevas instalaciones hasta reparaciones de emergencia, manejamos todos los aspectos de sus necesidades de aire acondicionado.",
    "installation": {
      "title": "Instalación",
      "desc": "Instalación de nuevas unidades de A/C para hogares y empresas, dimensionadas y configuradas para máxima eficiencia."
    },
    "repair": {
      "title": "Reparación",
      "desc": "Diagnóstico y reparación rápida de cualquier problema de A/C — ponemos su sistema en marcha nuevamente."
    },
    "maintenance": {
      "title": "Mantenimiento",
      "desc": "Ajustes programados y planes anuales para mantener su sistema funcionando a máximo rendimiento todo el año."
    },
    "commercial": {
      "title": "Comercial",
      "desc": "Soluciones completas de HVAC comercial para oficinas, comercios y espacios industriales en todo South Florida."
    },
    "residential": {
      "title": "Residencial",
      "desc": "Soluciones de confort personalizadas para el hogar con sistemas de alta eficiencia adaptados a su vivienda."
    },
    "emergency": {
      "title": "Servicio de Emergencia",
      "desc": "¿El A/C se rompió a medianoche? Estamos disponibles 24/7 para reparaciones urgentes cuando más nos necesita."
    }
  },
  "whyUs": {
    "label": "Por Qué Elegirnos",
    "title": "Somos Sus Vecinos, No Solo Sus Técnicos",
    "family": {
      "title": "Empresa Familiar",
      "desc": "Una familia real de South Florida comprometida con precios honestos y relaciones duraderas — no cuotas corporativas."
    },
    "licensed": {
      "title": "Licenciados y Asegurados",
      "desc": "Totalmente licenciados, fiados y asegurados. Puede confiar en nuestros técnicos en su hogar o negocio."
    },
    "bilingual": {
      "title": "Servicio Bilingüe",
      "desc": "Lo atendemos en inglés y español — porque la comunicación lo es todo cuando se trata de su confort."
    }
  },
  "contact": {
    "label": "Contáctenos",
    "title": "¿Listo para Mantenerse Fresco?",
    "body": "Llámenos directamente o complete el formulario y nos pondremos en contacto dentro de la hora durante el horario laboral.",
    "phoneEnLabel": "Línea en Inglés",
    "phoneEsLabel": "Línea en Español",
    "emailLabel": "Correo Electrónico",
    "formTitle": "Obtenga un Presupuesto Gratis",
    "nameLabel": "Nombre",
    "namePlaceholder": "Juan García",
    "phoneLabel": "Teléfono",
    "phonePlaceholder": "(786) 000-0000",
    "emailFormLabel": "Correo Electrónico",
    "emailPlaceholder": "usted@correo.com",
    "serviceLabel": "Servicio Necesario",
    "serviceInstallation": "Instalación",
    "serviceRepair": "Reparación",
    "serviceMaintenance": "Mantenimiento",
    "serviceEmergency": "Emergencia",
    "serviceOther": "Otro",
    "messageLabel": "Mensaje",
    "messagePlaceholder": "Describa su problema de A/C o lo que necesita...",
    "submit": "Enviar Mensaje →",
    "submitting": "Enviando...",
    "successMessage": "¡Mensaje enviado! Nos pondremos en contacto pronto.",
    "errorMessage": "Algo salió mal. Por favor llámenos directamente."
  },
  "footer": {
    "copyright": "© 2025 MGM A/C Appliances. Todos los derechos reservados."
  },
  "metadata": {
    "title": "MGM A/C Appliances — Servicios de A/C en South Florida",
    "description": "Instalación, reparación y mantenimiento de aire acondicionado familiar en todo South Florida. Disponibles 24/7. Llame al (305) 720-8273."
  },
  "shared": {
    "phoneEn": "(786) 352-0084",
    "phoneEnRaw": "7863520084",
    "phoneEs": "(305) 720-8273",
    "phoneEsRaw": "3057208273",
    "email": "sales@mgm-ac-appliances.com"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/
git commit -m "feat: add EN and ES locale files"
```

---

### Task 5: Create App Layout Structure

**Files:**
- Create: `app/[locale]/layout.tsx`
- Create: `app/[locale]/page.tsx`
- Modify: `app/page.tsx` (replace with redirect)

- [ ] **Step 1: Create `app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";

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
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", es: "/es" },
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
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 2: Create `app/[locale]/page.tsx`**

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Replace `app/page.tsx` with locale redirect**

```tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/en");
}
```

- [ ] **Step 4: Commit**

```bash
git add app/
git commit -m "feat: create locale layout and page structure"
```

---

### Task 6: Build Navbar Component

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 1: Create `components/Navbar.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentLocale = pathname.startsWith("/es") ? "es" : "en";

  const switchLocale = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|es)/, `/${locale}`);
    router.push(newPath);
  };

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#why-us", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-sky-500/20">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-[68px] px-4 md:px-8">
        {/* Logo */}
        <Link
          href={`/${currentLocale}`}
          className="font-outfit font-black text-xl text-white tracking-tight"
        >
          MGM <span className="text-sky-500">A/C</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-white/75 hover:text-sky-200 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex bg-white/[0.08] rounded-full p-[3px] border border-white/10">
            <button
              onClick={() => switchLocale("en")}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
                currentLocale === "en"
                  ? "bg-sky-500 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t("langEn")}
            </button>
            <button
              onClick={() => switchLocale("es")}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-all ${
                currentLocale === "es"
                  ? "bg-sky-500 text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t("langEs")}
            </button>
          </div>

          {/* Call Now — desktop only */}
          <a
            href="tel:7863520084"
            className="hidden md:flex items-center gap-1.5 bg-sky-500 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            📞 {t("callNow")}
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-white text-2xl p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 py-4 px-4 bg-slate-900">
          <ul className="flex flex-col gap-4 list-none mb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/80 text-base font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="tel:7863520084"
            className="flex items-center justify-center gap-2 bg-sky-500 text-white font-semibold py-3 rounded-lg w-full"
          >
            📞 {t("callNow")}
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: build Navbar with language toggle and mobile menu"
```

---

### Task 7: Build Hero Component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("hero");
  const shared = await getTranslations("shared");

  const stats = [
    { num: t("stat1Number"), label: t("stat1Label") },
    { num: t("stat2Number"), label: t("stat2Label") },
    { num: t("stat3Number"), label: t("stat3Label") },
  ];

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-[#0c1e3e] to-[#0a3255] min-h-[92vh] flex items-center overflow-hidden px-4 md:px-8 py-16">
      {/* Glow effects */}
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-[500px] h-[500px] bg-sky-200/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-sky-500/15 border border-sky-500/30 text-sky-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
          ⚡ {t("badge")}
        </div>

        {/* Headline */}
        <h1
          className="font-outfit font-black text-white leading-[1.05] tracking-[-2px] mb-6"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
        >
          {t("h1Line1")}{" "}
          <span className="bg-gradient-to-r from-sky-500 to-sky-200 bg-clip-text text-transparent">
            {t("h1Highlight")}
          </span>
          <br />
          {t("h1Line2")}
        </h1>

        {/* Body */}
        <p className="text-white/65 text-lg leading-relaxed max-w-xl mb-10">
          {t("body")}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href={`tel:${shared("phoneEnRaw")}`}
            className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-4 rounded-xl text-base shadow-[0_8px_32px_rgba(14,165,233,0.35)] hover:shadow-[0_12px_40px_rgba(14,165,233,0.45)] hover:-translate-y-0.5 transition-all"
          >
            📞 {t("ctaCall")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold px-8 py-4 rounded-xl text-base border border-white/15 backdrop-blur-sm transition-all"
          >
            ✉️ {t("ctaForm")}
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-white/[0.08]">
          {stats.map(({ num, label }) => (
            <div key={label}>
              <div className="font-outfit font-black text-sky-200 leading-none text-4xl">
                {num}
              </div>
              <div className="text-white/45 text-xs uppercase tracking-wide mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: build Hero section with stats and dual CTA"
```

---

### Task 8: Build Services Component

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Create `components/Services.tsx`**

```tsx
import { getTranslations } from "next-intl/server";

const SERVICE_KEYS = [
  "installation",
  "repair",
  "maintenance",
  "commercial",
  "residential",
  "emergency",
] as const;

const SERVICE_ICONS: Record<string, string> = {
  installation: "🏗️",
  repair: "🔧",
  maintenance: "🛡️",
  commercial: "🏢",
  residential: "🏠",
  emergency: "🚨",
};

export default async function Services() {
  const t = await getTranslations("services");

  return (
    <section id="services" className="bg-sky-50 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold text-sky-500 uppercase tracking-[2px] mb-3">
          {t("label")}
        </p>
        <h2
          className="font-outfit font-black text-slate-900 tracking-[-1px] mb-4"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          {t("title")}
        </h2>
        <p className="text-slate-600 max-w-xl leading-relaxed mb-14">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_KEYS.map((key) => (
            <div
              key={key}
              className="group bg-white rounded-2xl p-8 border border-sky-500/10 shadow-sm hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(14,165,233,0.12)] hover:border-sky-500/30 transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-500 to-sky-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-[52px] h-[52px] bg-gradient-to-br from-sky-100 to-sky-200 rounded-[14px] flex items-center justify-center text-2xl mb-5">
                {SERVICE_ICONS[key]}
              </div>
              <h3 className="font-outfit font-bold text-slate-900 text-lg mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: build Services grid with 6 card types"
```

---

### Task 9: Build WhyUs Component

**Files:**
- Create: `components/WhyUs.tsx`

- [ ] **Step 1: Create `components/WhyUs.tsx`**

```tsx
import { getTranslations } from "next-intl/server";

const WHY_KEYS = ["family", "licensed", "bilingual"] as const;

const WHY_ICONS: Record<string, string> = {
  family: "👨‍👩‍👧‍👦",
  licensed: "✅",
  bilingual: "🗣️",
};

export default async function WhyUs() {
  const t = await getTranslations("whyUs");

  return (
    <section
      id="why-us"
      className="bg-gradient-to-br from-slate-900 to-[#0c1e3e] py-24 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-bold text-sky-200 uppercase tracking-[2px] mb-3">
          {t("label")}
        </p>
        <h2
          className="font-outfit font-black text-white tracking-[-1px] mb-14"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_KEYS.map((key) => (
            <div
              key={key}
              className="bg-white/[0.12] border border-white/20 rounded-2xl p-8 backdrop-blur-md text-center"
            >
              <div className="text-4xl mb-4">{WHY_ICONS[key]}</div>
              <h3 className="font-outfit font-bold text-sky-200 text-lg mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/WhyUs.tsx
git commit -m "feat: build WhyUs section with glass cards"
```

---

### Task 10: Build Contact Component and API Route

**Files:**
- Create: `components/Contact.tsx`
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Install Resend**

```bash
npm install resend
```

- [ ] **Step 2: Create `app/api/contact/route.ts`**

```ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "MGM A/C Website <onboarding@resend.dev>",
      to: ["sales@mgm-ac-appliances.com"],
      subject: `New Quote Request — ${service}`,
      html: `
        <h2>New Quote Request from MGM A/C Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

> **Note:** The `from` address `onboarding@resend.dev` is Resend's free sandbox. For production, verify your domain in Resend dashboard and change to `noreply@mgm-ac-appliances.com`.

- [ ] **Step 3: Create `components/Contact.tsx`**

```tsx
"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const shared = useTranslations("shared");
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Installation",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState("success");
        setForm({ name: "", phone: "", email: "", service: "Installation", message: "" });
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  const inputClass =
    "border-[1.5px] border-slate-200 focus:border-sky-500 rounded-xl px-4 py-3 text-sm text-slate-900 bg-sky-50 focus:bg-white outline-none transition-colors w-full";
  const labelClass =
    "text-[0.7rem] font-bold text-slate-700 uppercase tracking-wide mb-1.5";

  const contactItems = [
    {
      icon: "📞",
      label: t("phoneEnLabel"),
      value: shared("phoneEn"),
      href: `tel:${shared("phoneEnRaw")}`,
    },
    {
      icon: "📞",
      label: t("phoneEsLabel"),
      value: shared("phoneEs"),
      href: `tel:${shared("phoneEsRaw")}`,
    },
    {
      icon: "✉️",
      label: t("emailLabel"),
      value: shared("email"),
      href: `mailto:${shared("email")}`,
    },
  ];

  return (
    <section id="contact" className="bg-sky-50 py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left — Info */}
        <div>
          <p className="text-xs font-bold text-sky-500 uppercase tracking-[2px] mb-3">
            {t("label")}
          </p>
          <h2
            className="font-outfit font-black text-slate-900 tracking-[-1px] mb-4"
            style={{ fontSize: "2.2rem" }}
          >
            {t("title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">{t("body")}</p>

          {contactItems.map(({ icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-4 bg-white rounded-xl border border-sky-500/10 p-4 mb-3 hover:border-sky-500/30 transition-colors group"
            >
              <div className="w-[42px] h-[42px] bg-gradient-to-br from-sky-100 to-sky-200 rounded-[10px] flex items-center justify-center text-xl flex-shrink-0">
                {icon}
              </div>
              <div>
                <div className="text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wide">
                  {label}
                </div>
                <div className="font-semibold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                  {value}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Right — Form */}
        <div className="bg-white rounded-2xl border border-sky-500/10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10">
          <h3 className="font-outfit font-bold text-slate-900 text-xl mb-7">
            {t("formTitle")}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col">
                <label className={labelClass}>{t("nameLabel")}</label>
                <input
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("namePlaceholder")}
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>{t("phoneLabel")}</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t("phonePlaceholder")}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col mb-4">
              <label className={labelClass}>{t("emailFormLabel")}</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder={t("emailPlaceholder")}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className={labelClass}>{t("serviceLabel")}</label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Installation">
                  {t("serviceInstallation")}
                </option>
                <option value="Repair">{t("serviceRepair")}</option>
                <option value="Maintenance">{t("serviceMaintenance")}</option>
                <option value="Emergency">{t("serviceEmergency")}</option>
                <option value="Other">{t("serviceOther")}</option>
              </select>
            </div>

            <div className="flex flex-col mb-6">
              <label className={labelClass}>{t("messageLabel")}</label>
              <textarea
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder={t("messagePlaceholder")}
                className={`${inputClass} resize-none`}
              />
            </div>

            {state === "success" && (
              <p className="text-green-600 text-sm mb-4 font-medium">
                {t("successMessage")}
              </p>
            )}
            {state === "error" && (
              <p className="text-red-600 text-sm mb-4 font-medium">
                {t("errorMessage")}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "submitting"}
              className="w-full bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_8px_28px_rgba(14,165,233,0.4)] hover:-translate-y-px transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {state === "submitting" ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add components/Contact.tsx app/api/contact/route.ts package.json package-lock.json
git commit -m "feat: build Contact form with Resend API route"
```

---

### Task 11: Build Footer Component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");
  const shared = await getTranslations("shared");

  return (
    <footer className="bg-slate-900 border-t border-sky-500/15 py-12 px-4 text-center">
      <div className="font-outfit font-black text-white text-xl mb-2">
        MGM <span className="text-sky-500">A/C</span> Appliances
      </div>
      <p className="text-white/40 text-sm">
        {shared("phoneEn")} · {shared("phoneEs")} · {shared("email")}
      </p>
      <p className="text-white/30 text-xs mt-3">{t("copyright")}</p>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: build Footer component"
```

---

### Task 12: Verify Full Site

**Files:** (none — verification only)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Verify English version**

Open `http://localhost:3000/en`. Check:
- Navbar is sticky with logo, links, language toggle, "Call Now" button
- Hero shows "Stay **Cool** All Year Long" with badge, two CTAs, and stats
- Services grid shows 6 cards
- Why Us section shows 3 glass cards on dark background
- Contact section shows form + 3 contact info cards
- Footer shows logo, contact info, copyright

- [ ] **Step 3: Verify Spanish version**

Click the **ES** toggle or go to `http://localhost:3000/es`. Confirm all text has changed to Spanish.

- [ ] **Step 4: Verify mobile layout**

Use browser DevTools to simulate iPhone. Confirm:
- Hamburger menu appears
- Services grid goes single-column
- Contact section stacks vertically
- All tap targets are reachable

- [ ] **Step 5: Verify contact form submits**

Fill in the contact form and submit. If `RESEND_API_KEY` is a placeholder, expect a 500 — that's correct. The form should show the error message. If you add a real Resend key, it should send the email.

- [ ] **Step 6: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors. Both `/en` and `/es` routes are pre-rendered.

- [ ] **Step 7: Commit any fixes**

If any tweaks were needed, commit them:

```bash
git add -A
git commit -m "fix: polish site after full verification"
```

---

### Task 13: Set Up Playwright E2E Tests

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/smoke.spec.ts`

- [ ] **Step 1: Install Playwright**

```bash
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3000",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

- [ ] **Step 3: Create `tests/smoke.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test.describe("English site", () => {
  test("loads hero with expected content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toContainText("Cool");
    await expect(page.getByText("Complete AC Solutions")).toBeVisible();
  });

  test("all sections are visible", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#why-us")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
  });

  test("call CTA links to phone number", async ({ page }) => {
    await page.goto("/en");
    const callLink = page.locator('a[href="tel:7863520084"]').first();
    await expect(callLink).toBeVisible();
  });
});

test.describe("Language switching", () => {
  test("EN → ES changes hero text", async ({ page }) => {
    await page.goto("/en");
    await page.locator("button", { hasText: "ES" }).click();
    await expect(page).toHaveURL(/\/es/);
    await expect(page.locator("h1")).toContainText("Fresco");
  });

  test("ES → EN changes hero text", async ({ page }) => {
    await page.goto("/es");
    await page.locator("button", { hasText: "EN" }).click();
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator("h1")).toContainText("Cool");
  });
});

test.describe("Contact form", () => {
  test("renders form fields", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("form submit with mocked API shows success", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({ success: true }),
      })
    );
    await page.goto("/en");
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('textarea[name="message"]', "Need AC repair");
    await page.click('button[type="submit"]');
    await expect(page.getByText("Message sent!")).toBeVisible();
  });
});
```

- [ ] **Step 4: Run the tests**

```bash
npx playwright test
```

Expected: All tests pass for both desktop and mobile projects.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/ package.json package-lock.json
git commit -m "test: add Playwright smoke tests for EN/ES and contact form"
```

---

### Task 14: Deploy to Vercel and Push to GitHub

**Files:** (no code changes)

- [ ] **Step 1: Push all commits to GitHub**

```bash
git push origin main
```

- [ ] **Step 2: Connect to Vercel**

Option A — via Vercel Dashboard:
1. Go to vercel.com, log in, click "New Project"
2. Import the `mgm-ac-appliances` GitHub repo
3. Framework preset: Next.js (auto-detected)
4. Add environment variable: `RESEND_API_KEY` = your real Resend API key
5. Click Deploy

Option B — via Vercel CLI:
```bash
npm install -g vercel
vercel --prod
```
Follow prompts to link to the GitHub repo. Then set the env var:
```bash
vercel env add RESEND_API_KEY production
```

- [ ] **Step 3: Verify Vercel deployment**

Visit the `.vercel.app` URL. Check both `/en` and `/es` load correctly.

- [ ] **Step 4: Connect Squarespace domain**

In Vercel project settings → Domains → Add your Squarespace domain.
In Squarespace DNS settings → Add a CNAME record:
- **Host:** `www` (or `@` for apex)
- **Value:** `cname.vercel-dns.com`

Vercel will issue an SSL certificate automatically (takes ~5 minutes).

- [ ] **Step 5: Final verification**

Visit your custom domain. Confirm:
- HTTPS works
- Both `/en` and `/es` load
- Contact form sends email
- Mobile layout is correct
