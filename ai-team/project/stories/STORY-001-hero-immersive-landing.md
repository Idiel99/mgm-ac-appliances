# STORY-001 - Immersive Hero Experience

## Metadata
- Story ID: STORY-001
- Epic ID: EPIC-001
- Status: READY_FOR_ARCHITECTURE
- Owner: PO
- Branch: feature/story-001-hero
- PR:
- Created: 2026-03-10
- Last Updated: 2026-03-11

## Story Statement
As a homeowner comparing HVAC providers online,
I want the hero section of the MGM AC Appliances site to feel modern, animated, and premium,
So that I immediately perceive the brand as high-end and trustworthy and I’m compelled to scroll or click the CTA.

## Acceptance Criteria
- [ ] Hero background animates continuously (CSS/Canvas/Lottie) with no visible stutter at 60fps on desktop and 30fps on mobile
- [ ] CTA button includes a subtle pulse or shimmer animation that repeats every 6–8 seconds
- [ ] Headline + subheadline animate in on initial load using staggered timing (≤ 600 ms total) and respect `prefers-reduced-motion`
- [ ] Hero animation automatically pauses or simplifies when `prefers-reduced-motion: reduce` is detected
- [ ] Largest Contentful Paint does not exceed 2.5s on mobile (Lighthouse fast 3G profile)
- [ ] Implementation passes QA visual review on Chrome, Safari, Firefox, and Edge (latest) at desktop and mobile breakpoints

## Story Metrics
- Time on page (hero section) increases vs. baseline (to be captured pre/post)
- Bounce rate decreases by ≥ 5% (tracking required post-ship)
- Lighthouse Performance score remains ≥ 85 on mobile

## Technical Notes
### Animation architecture
- Default path: lightweight WebGL canvas built with `regl` + instanced quads using simplex-noise drift; capped at 2k particles to keep main thread <10 ms.
- Reduced-motion fallback: CSS gradient morph (custom properties driven) with option to fully static SVG background when `prefers-reduced-motion: reduce` or low-power mode detected.
- Animation lifecycle managed via a `useHeroMotion()` hook to start/stop render loop based on visibility + reduced-motion flags.

### Content & interaction
- Headline/subheadline ingress handled with IntersectionObserver-triggered stagger utility (max 600 ms) with opacity+translate; gracefully skips when reduced motion.
- CTA component encapsulates hover/press micro-interactions (spring easing) and focus-visible parity for keyboard users.

### Performance strategy
- Hero media served via `<picture>` w/ `fetchpriority="high"` and proper aspect-ratio placeholders to pin CLS to ~0.
- Lazy-load WebGL module post-FCP using `requestIdleCallback` (with `setTimeout` fallback) to keep LCP under 2.5 s on mobile.
- Add LCP + animation frame timing beacons (VitalSigns/RUM) for regression monitoring; integrate Lighthouse CI budgets (LCP ≤2.5 s, Perf ≥85).

### Tooling & QA hooks
- Storybook stories for default + reduced-motion variants.
- WebPageTest script (Chrome, Safari, Firefox, Edge) added to CI for cross-browser verification.

## Task Breakdown
1. **Scaffold hero components** (Eng Lead/developer) – Create `HeroSurface`, `HeroCopy`, `PrimaryCTA`, and shared hooks/utilities + Storybook entries.
2. **Implement animation variants** (Developer) – Build WebGL experience + CSS/SVG fallbacks, tie into reduced-motion detection.
3. **Wire performance instrumentation** (Developer) – LCP placeholders, lazy-load orchestration, Lighthouse/WebPageTest config updates, RUM beacons.
4. **Integrate content + micro-interactions** (Developer + UI/UX) – Connect CMS/i18n copy, finalize CTA animation timings.
5. **QA + perf validation** (QA + Eng Lead) – Execute cross-browser matrix, run Lighthouse/WebPageTest baselines, document evidence.

## Implementation Notes
- Branch: `feature/story-001-hero`; target PR into `main`.
- Reuse existing `useReducedMotion` helper if available; otherwise add to `src/lib/hooks`.
- Keep hero bundle ≤120 KB gzipped (shared constants file for animation params to avoid duplicated math).
- Guard WebGL import with dynamic `import()` so SSR/build output stays tree-shakeable.
- Provide environment flag `VITE_HERO_ANIM_DEBUG` to visualize frame rate + particle count during QA.

## Test Notes
- **Functional:** Validate hero renders identically with/without animations (reduced motion), CTA states accessible via keyboard.
- **Performance:** Lighthouse CI mobile (fast 3G) ≥85 score, LCP ≤2.5 s; WebPageTest scripted runs logged in CI artifacts.
- **Cross-browser:** Chrome, Firefox, Safari (desktop + iOS 16+), Edge latest; ensure gradients/blend modes render the same.
- **Fallbacks:** Force `prefers-reduced-motion`, low-power mode, and JS-disabled scenarios to confirm SVG background still shows.

## Verification Evidence
- Lighthouse CI + WebPageTest reports attached to PR.
- Storybook snapshots for default/reduced-motion variants.
- RUM dashboard screenshot showing LCP + animation timing within budget after deploy.

## Lead Review Summary
_Pending once implementation PR is ready._
