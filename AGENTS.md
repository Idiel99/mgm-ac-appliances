# Next.js 16 Agent Guidelines

## Critical Breaking Changes

### params & searchParams are Promises
```tsx
// ✅ CORRECT — always await
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
}

// ❌ WRONG — will break at runtime
export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params; // params is a Promise, not an object
}
```
In Client Components, use the `use()` hook instead of `await`.

### middleware.ts is deprecated → use proxy.ts
- Single file at project root, same level as `app/`
- Export a named `proxy` function or default export
- Use for: header modification, redirects, locale routing
- Do NOT use for: slow data fetching, full auth checks

### No legacy data fetching
- `getServerSideProps`, `getStaticProps`, `getStaticPaths` — all gone
- Use async Server Components with `fetch()`, ORM, or DB queries directly
- For client-side data: React `use()` API, SWR, or React Query

## File Conventions

| File | Purpose | Notes |
|---|---|---|
| `layout.tsx` | Shared UI wrapper | Server Component by default. Root must have `<html>` and `<body>` |
| `page.tsx` | Route UI | Can be async Server Components |
| `loading.tsx` | Suspense fallback | Wraps page in `<Suspense>`, streams instantly |
| `error.tsx` | Error boundary | Must be `'use client'`. Gets `error` + `unstable_retry()` |
| `not-found.tsx` | 404 fallback | Triggered by `notFound()` function |
| `route.ts` | API route handler | Export named HTTP methods: `GET`, `POST`, etc. |
| `proxy.ts` | Request interception | Replaces deprecated `middleware.ts` |

## Server vs Client Components

**Default is Server Component.** Only add `'use client'` when you need:
- `useState`, `useEffect`, `useRef`, event handlers
- Browser APIs (`window`, `localStorage`)
- Custom hooks that use the above

**Rules:**
- `'use client'` is a boundary — all imports below it become client bundle
- Minimize client components; wrap only interactive parts
- Server Components can be `async` — Client Components cannot
- Context requires a Client Component provider wrapper
- Use `server-only` / `client-only` packages to guard boundaries

## Data Fetching

```tsx
// Server Component — fetch directly
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data}</div>;
}
```
- Identical `fetch` calls are memoized automatically (no duplicates)
- `fetch` is NOT cached by default — use `'use cache'` directive for caching
- Parallel fetching: fire multiple fetches, then `Promise.all()`
- Sequential fetching: `await` one after another
- Use `React.cache()` for request-scoped memoization

## Rendering

- **Static**: default when no runtime data is accessed
- **Dynamic**: triggered by `cookies()`, `headers()`, `searchParams`, uncached fetches
- **Streaming**: wrap dynamic parts in `<Suspense>` for partial rendering
- Component-level boundaries, not route-level — one page can mix static + dynamic

## Metadata API

```tsx
// Static
export const metadata: Metadata = { title: '...', description: '...' };

// Dynamic — must await params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  // ...
}
```
File conventions: `favicon.ico`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`

## Route Handlers

```tsx
// app/api/example/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ success: true });
}
```
- Export HTTP method functions: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- GET is cached by default if static; POST/PUT/PATCH/DELETE are not

## Fonts (next/font)

```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// Apply in layout: <html className={inter.variable}>
```
Self-hosted, no external requests, no layout shift.

## Images (next/image)

- Automatic size optimization, WebP conversion, lazy loading
- Local imports auto-provide width/height
- Remote images require explicit `width` and `height`
- Use `placeholder="blur"` for static imports

## Config (next.config.ts)

```ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  // cacheComponents: true,  // enables 'use cache' directive
};
export default nextConfig;
```

## Common Gotchas

1. **Forgetting to await `params`/`searchParams`** — they are Promises in Next.js 16
2. **Using `middleware.ts`** — deprecated, use `proxy.ts`
3. **Putting `'use client'` too high** — makes entire subtree client-side
4. **Using context in Server Components** — must wrap in Client Component provider
5. **Blocking layout with runtime data** — wrap dynamic parts in `<Suspense>`
6. **Not exporting HTTP methods from route handlers** — handler won't run
