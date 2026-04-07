# MGM A/C Appliances — Design Reference
> The single source of truth for all visual and design decisions. Reference this before touching any styling.

---

## Theme Name: Cryo

Inspired by the relief of cold AC in South Florida heat. Clean, premium, cool.
Dark navy hero → ice-white body → sky blue accents.

---

## Color Palette

| Name | Hex | Tailwind Equivalent | Usage |
|---|---|---|---|
| Ice | `#F0F9FF` | `sky-50` | Page background |
| Sky | `#0EA5E9` | `sky-500` | Primary brand color, CTA buttons, active states |
| Sky Light | `#BAE6FD` | `sky-200` | Highlights, text on dark backgrounds, stat numbers |
| Sky Dark | `#0369A1` | `sky-700` | Hover states, gradient end color |
| Navy | `#0F172A` | `slate-900` | Hero section, footer, dark overlays |
| Navy Mid | `#1E293B` | `slate-800` | Secondary dark surfaces |
| Slate | `#475569` | `slate-600` | Body copy, subtitles, secondary text |
| White | `#FFFFFF` | `white` | Card backgrounds, form fields |

### Color Usage Rules
- **Never** use pure black (`#000`) for text — use Navy or Slate
- **Primary CTAs** always use Sky (`#0EA5E9`) background
- **Dark sections** (Hero, Why Us, Footer) use Navy background
- **Card borders** always `1px solid rgba(14, 165, 233, 0.1)` — subtle, not heavy
- **Hover glow** on cards: `box-shadow: 0 16px 40px rgba(14, 165, 233, 0.12)`

---

## Typography

### Fonts
- **Outfit** — headings, logo, display text (loaded from Google Fonts)
- **Inter** — body text, labels, UI elements (loaded from Google Fonts)

### Type Scale

| Role | Font | Weight | Size | Letter Spacing |
|---|---|---|---|---|
| Hero H1 | Outfit | 900 | `clamp(2.8rem, 6vw, 5rem)` | `-2px` |
| Section H2 | Outfit | 900 | `clamp(1.8rem, 3.5vw, 2.8rem)` | `-1px` |
| Card Title H3 | Outfit | 700 | `1.1rem` | `normal` |
| Body | Inter | 400 | `1rem` | `normal` |
| Body Large | Inter | 400 | `1.15rem` | `normal` |
| Label/Badge | Inter | 600–700 | `0.7–0.8rem` | `0.5–2px` |
| Button | Inter | 600–700 | `0.85–1rem` | `0.3px` |
| Stat Number | Outfit | 900 | `2.2rem` | `normal` |

### Typography Rules
- Section labels (e.g. "What We Do") are always UPPERCASE with `letter-spacing: 2px` in Sky color
- H1 uses `line-height: 1.05`, H2 uses `line-height: 1.1`
- Max line length for body text: `540px` (`max-w-xl` in Tailwind)
- Hero body text opacity on dark: `rgba(255,255,255,0.65)`

---

## Spacing

| Token | Value | Usage |
|---|---|---|
| Section vertical padding | `6rem` (96px) | Top/bottom of every major section |
| Card padding | `2rem` (32px) | Inside service and why-us cards |
| Form card padding | `2.5rem` (40px) | Inside the contact form card |
| Grid gap (services) | `1.5rem` (24px) | Between service cards |
| Grid gap (why us) | `2rem` (32px) | Between trust pillar cards |
| Max content width | `1100px` | Centered content container |

---

## Components

### Navbar
- Height: `68px`
- Background: `rgba(15, 23, 42, 0.95)` with `backdrop-filter: blur(12px)`
- Border bottom: `1px solid rgba(14, 165, 233, 0.2)`
- Position: `sticky top-0 z-100`
- Logo: Outfit 900, white with Sky accent on "A/C"
- Nav links: `rgba(255,255,255,0.75)`, hover → Sky Light
- Language toggle: pill shape, active tab is Sky filled
- Call Now button: Sky background, `8px` radius

### Buttons

**Primary (Sky fill)**
```
background: #0EA5E9
color: white
padding: 16px 32px
border-radius: 10px
font-weight: 700
box-shadow: 0 8px 32px rgba(14, 165, 233, 0.35)
hover: translateY(-2px), stronger shadow
```

**Secondary (Glass)**
```
background: rgba(255,255,255,0.08)
color: white
padding: 16px 32px
border-radius: 10px
border: 1px solid rgba(255,255,255,0.15)
backdrop-filter: blur(8px)
— Only used on dark backgrounds
```

**Submit (Gradient)**
```
background: linear-gradient(135deg, #0EA5E9, #0369A1)
width: 100%
padding: 15px
border-radius: 10px
box-shadow: 0 4px 20px rgba(14, 165, 233, 0.3)
hover: translateY(-1px)
```

### Cards (Service Cards)
```
background: white
border-radius: 16px
padding: 2rem
border: 1px solid rgba(14, 165, 233, 0.1)
box-shadow: 0 2px 16px rgba(0,0,0,0.04)
hover: translateY(-4px), blue glow shadow, border darkens
hover top accent: 3px gradient bar (Sky → Sky Light) at top edge
```

### Cards (Why Us — Dark Background)
```
background: rgba(255,255,255,0.12)
border: 1px solid rgba(255,255,255,0.2)
border-radius: 16px
padding: 2rem
backdrop-filter: blur(8px)
text-align: center
```

### Form Inputs
```
border: 1.5px solid #E2E8F0
border-radius: 10px
padding: 12px 16px
background: #F0F9FF (ice)
font: Inter 0.9rem
focus: border → #0EA5E9, background → white
```

### Hero Section
```
background: linear-gradient(135deg, #0F172A 0%, #0c1e3e 40%, #0a3255 100%)
+ radial glow top-right: rgba(14, 165, 233, 0.15) 700px circle
+ radial glow bottom-left: rgba(186, 230, 253, 0.07) 500px circle
min-height: 92vh
```

### Section Labels
```
font: Inter 700 0.8rem uppercase
color: #0EA5E9
letter-spacing: 2px
margin-bottom: 0.75rem
```

---

## Responsive Breakpoints (Tailwind defaults)

| Breakpoint | Width | Changes |
|---|---|---|
| `sm` | 640px | — |
| `md` | 768px | Hamburger nav, contact stacks |
| `lg` | 1024px | Full desktop layout |
| `xl` | 1280px | — |

### Mobile-Specific Rules
- Navbar: hamburger menu below `md`, full links above
- Services grid: `grid-cols-1` (mobile) → `grid-cols-2` (sm) → `grid-cols-3` (lg)
- Why Us grid: `grid-cols-1` (mobile) → `grid-cols-3` (md)
- Contact: stacked (mobile) → 2-column (md)
- All tap targets: minimum `44px` height
- Hero H1: uses `clamp()` so it scales smoothly on all screen sizes

---

## Effects & Motion

- **Card hover lift:** `transform: translateY(-4px)` — subtle, not bouncy
- **Button hover lift:** `transform: translateY(-2px)` on primary
- **Transition duration:** `0.2s` on all interactive elements — fast and snappy
- **Backdrop blur:** `12px` on navbar, `8px` on glass cards
- **No heavy animations** — the design is elegant, not flashy

---

## i18n Notes

- All visible strings go through `t()` from `next-intl`
- Locale files: `messages/en.json` and `messages/es.json`
- Phone numbers stored in locale files even though they don't change
- Language toggle in navbar switches between `/en` and `/es` routes
- `hreflang` tags in `<head>` for SEO

---

## Do's and Don'ts

| Do | Don't |
|---|---|
| Use Outfit for all headings | Mix in other display fonts |
| Use `clamp()` for hero font sizes | Use fixed px for large headings |
| Keep card borders subtle (low opacity) | Use heavy solid borders on cards |
| Lift cards on hover | Use color changes alone for hover |
| Keep body text max-width ≤ 540px | Let text run full width |
| Use Sky for all CTAs | Use multiple CTA colors |
| Keep transitions at 0.2s | Use slow animations (> 0.4s) |
| Keep the Cryo palette | Add unrelated colors |
