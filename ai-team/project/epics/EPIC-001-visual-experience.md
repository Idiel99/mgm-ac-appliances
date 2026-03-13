# EPIC-001 - Modern Visual Experience Overhaul

## Metadata
- Epic ID: EPIC-001
- Status: DRAFT
- Owner: PO
- Created: 2026-03-09
- Last Updated: 2026-03-09
- Related Stories: _(none yet)_

## Problem Statement
The current MGM AC Appliances site reads as a generic enterprise template — static, text-heavy, and visually forgettable. In 2026, users expect websites to feel alive. HVAC is a competitive local market and the site is not creating any emotional connection or memorable impression. A visitor lands, reads a wall of text, and bounces.

## Business Value
A visually engaging site builds trust, keeps visitors on the page longer, and differentiates MGM from competitors still using 2018-era designs. Better first impressions convert more visitors into calls and quote requests.

## Scope
- Hero section: full-screen animated background (e.g. ambient particle effect, looping lottie, or CSS motion) replacing static image
- Section transitions: scroll-triggered entrance animations using Framer Motion or GSAP
- Service cards: micro-interactions on hover (lift, glow, icon animate)
- Stats/numbers section: animated counters that trigger on scroll into view
- Testimonials: smooth auto-scroll carousel with stagger fade
- CTA buttons: shimmer or pulse animation to draw the eye
- Mobile-first: all animations respect `prefers-reduced-motion`
- Performance: animations must not degrade Lighthouse score below 85

## Out of Scope
- Redesigning the information architecture or navigation structure
- Adding new pages
- Backend or form logic changes
- Content rewrites (copy stays the same)
- Video backgrounds (performance risk)

## Success Metrics
- Lighthouse performance score remains ≥ 85 on mobile
- Average time-on-page increases (baseline to be captured before deployment)
- Zero layout shift regressions (CLS stays ≤ 0.1)
- All animations disabled cleanly when `prefers-reduced-motion: reduce` is set
- QA sign-off on all 5 targeted sections

## Risks
- Animation libraries (GSAP, Framer Motion) may add bundle weight — mitigation: tree-shake and lazy-load where possible
- Overanimating can feel cheap — mitigation: UI/UX agent owns restraint and consistency
- `prefers-reduced-motion` compliance must be enforced from the start, not bolted on

## Technical Constraints
_Architect-owned section_

## Solution Notes
_Architect-owned section_

## Dependencies
_Architect-owned section_
