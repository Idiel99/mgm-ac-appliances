@AGENTS.md

# MGM A/C Appliances Site

## Project
- **Stack:** Next.js 16, TypeScript, Tailwind CSS v4, next-intl
- **Design:** Cryo theme — see `design-reference.md` for all visual tokens
- **i18n:** EN/ES via next-intl with `messages/en.json` and `messages/es.json`
- **Hosting:** Vercel, custom domain via Squarespace DNS

## Conventions
- All user-visible strings go through `t()` — no hardcoded text in components
- Server Components by default; `'use client'` only for interactivity (Navbar, Contact)
- Tailwind v4: config via `@theme inline {}` in `globals.css`, no `tailwind.config.ts`
- Fonts loaded via `next/font/google` as CSS variables (`--font-outfit`, `--font-inter`)
- `params` and `searchParams` are **Promises** — always `await` them
- Locale routing handled by `next-intl` proxy (was middleware, now `proxy.ts`)

## File Structure
```
app/[locale]/layout.tsx   — locale provider + metadata
app/[locale]/page.tsx     — main page composing all sections
app/api/contact/route.ts  — contact form API route
components/*.tsx          — Navbar, Hero, Services, WhyUs, Contact, Footer
messages/{en,es}.json     — translation strings
i18n/request.ts           — next-intl server config
proxy.ts                  — locale routing (next-intl)
```

## Design Rules
- Follow `design-reference.md` for all colors, fonts, spacing, and component patterns
- Use Tailwind's built-in `sky-*` and `slate-*` palettes (they match Cryo exactly)
- Headings use `var(--font-outfit)`, body uses `var(--font-inter)`
- No pure black — use `slate-900` for darkest text
- Card hover: `translateY(-4px)` + blue glow shadow
- All transitions: `0.2s` — fast and snappy
