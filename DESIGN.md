# DESIGN.md — plantasia.space Design Language

## Overview

plantasia.space uses a **configurable design system** built on CSS custom properties. The default palette (teal + hot pink on white/black) is one of many possible **theme presets** that can be fetched from the backend and applied at runtime. All design decisions documented here describe **the defaults** — any preset should adapt to the same structural rules while swapping the color values.

---

## Theme Presets

The app supports runtime theme switching via design presets stored in the backend. Presets override CSS custom properties on `:root` via `DesignSettingsApplier`. This means:

- **Colors** are all CSS vars — every component automatically respects the active preset
- **Fonts** can also be swapped per-preset (title font + body font, loaded via Google Fonts or custom URLs)
- **Radius** can vary per preset
- The defaults documented here are what you see when no preset is applied

When designing or prototyping: **use the CSS vars**, not hardcoded hex values. A design that targets `--primary`, `--secondary`, `--border` etc. will work across all presets for free.

```css
/* ✅ Do this — works across all presets */
color: var(--foreground);
background: var(--primary);
border: 1px solid var(--border);

/* ❌ Avoid this — breaks in non-default presets */
color: #000;
background: oklch(0.6903 0.2708 340.88);
```

---

## Color Architecture

### Two-hue system

The brand has exactly **two signature hues** that swap roles between light and dark mode:

| Token         | Default value                      | Light mode  | Dark mode   |
|---------------|------------------------------------|-------------|-------------|
| `--ps-teal`   | `oklch(0.8982 0.1458 194.8698)`    | secondary   | **primary** |
| `--ps-pink`   | `oklch(0.6903 0.2708 340.8828)`    | **primary** | secondary   |

Everything else is black, white, or a variant of these two hues.

### Semantic tokens (from `globals.css`)

| Token                | Light                        | Dark                         | Usage                          |
|----------------------|------------------------------|------------------------------|--------------------------------|
| `--background`       | `oklch(1 0 0)` = white       | `oklch(0 0 0)` = black       | Page background                |
| `--foreground`       | `oklch(0 0 0)` = black       | `oklch(1 0 0)` = white       | Body text                      |
| `--primary`          | `--ps-pink`                  | `--ps-teal`                  | CTAs, active states            |
| `--primary-foreground`| white                       | black                        | Text on primary                |
| `--secondary`        | `--ps-teal`                  | `--ps-pink`                  | Secondary actions              |
| `--border`           | black                        | white                        | Full-strength borders          |
| `--border-2`         | `--ps-pink`                  | `--ps-teal`                  | Accent borders, FourCornerCard |
| `--destructive`      | `oklch(62.8% 0.258 29.2)`    | `oklch(64.9% 0.237 26.9)`    | Errors, world frames           |
| `--success`          | `oklch(0.7 0.15 145)`        | `oklch(0.872 0.272 143.5)`   | Success states                 |
| `--input`            | `oklch(0.9 0 0)` = light grey| `oklch(0.59 0 0)` = mid grey | Input backgrounds              |
| `--muted`            | white                        | black                        | Muted surfaces (same as bg)    |
| `--muted-foreground` | black                        | white                        | Muted/placeholder text         |

### Entity accent colors

Defined in `@theme inline` — used for frames, charts, and visual accents (not badges):

```css
--entity-track:   oklch(0.78 0.12 350);  /* pink-red  */
--entity-world:   oklch(0.78 0.10 230);  /* sky blue  */
--entity-orbiter: oklch(0.78 0.12 165);  /* green     */
```

---

## Typography

### Font stack

| Role      | Family          | CSS var          | Usage                              |
|-----------|-----------------|------------------|------------------------------------|
| Display   | `Orbit`         | `--font-title`   | All `h1`/`h2`/`h3`, nav labels     |
| Body / UI | `Inter`         | `--font-sans`    | Body copy, labels, inputs          |
| Mono      | `JetBrains Mono`| `--font-mono`    | Code, technical metadata           |

**Font loading:** loaded via Google Fonts by default. Per-preset overrides use `--font-title` and `--font-sans` CSS vars + injected `<link>` tags from `DesignSettingsApplier`.

### Scale

```
h1   Orbit  2.25rem  (36px)  lh 1.2   — page titles
h2   Orbit  1.5rem   (24px)  lh 1.25  — section headers
h3   Orbit  1.125rem (18px)  lh 1.3   — sub-sections
body Inter  1rem     (16px)  lh 1.6   — main copy
sm   Inter  0.875rem (14px)            — secondary copy
xs   Inter  0.75rem  (12px)            — captions, metadata
mono JBMono 0.875rem (14px)            — tokens, code
```

### Rules

- All headings (`h1`, `h2`, `h3`) and `.font-title` use `--font-title`
- `letter-spacing: normal` globally — no tracking utilities in default config
- `text-wrap: balance` is encouraged for headings (`title-balance` utility class exists)

---

## Spacing & Layout

### Border radius

```css
--radius-sm:  0.5rem    /* 8px  */
--radius-md:  0.625rem  /* 10px */
--radius-lg:  0.75rem   /* 12px — base --radius */
--radius-xl:  1rem      /* 16px */
```

### Shadows

**None.** All `--shadow-*` vars resolve to zero. Depth is achieved via **borders and color contrast only**. Do not add box-shadows to components.

### Layout constants

```css
--nav-mobile-bar-height: 64px   /* mobile bottom nav + mini player */
--mini-player-height:    64px
```

### Navigation breakpoint

`1268px` — below this, sidebar is replaced by the mobile bottom bar.

### Page layout — standard heading pattern

The platform uses a single heading pattern across all content pages — entity lists, settings, release flows, profile pages, search, and any other full-page view. The reference implementation is `src/components/settings/settings-page.tsx`.

**Page container** (outermost `<div>` inside `<SidebarInset>` or equivalent):
```
px-4 md:px-8 py-10
```
`py-10` (40px top/bottom) is the platform standard. Horizontal padding is responsive. Deviations (e.g. `p-4`, `pt-8`) are inconsistencies to fix.

**Page header element:**
```html
<header class="text-center space-y-3">
  <h1 class="inline-flex items-center justify-center gap-2 text-2xl font-semibold">
    <!-- optional: icon h-6 w-6 -->
    <!-- title text -->
  </h1>
  <!-- optional subtitle: <p class="text-sm text-muted-foreground"> -->
</header>
```

Rules:
- Tag: semantic `<header>` (not a `<div>`)
- Alignment: `text-center`
- h1 size: `text-2xl font-semibold`
- Icon (when present): entity's own custom SVG from `@/icons-remote/`, `h-6 w-6`, `gap-2` inline-flex — never a Lucide icon as the primary heading icon
- Subtitle: `text-sm text-muted-foreground`, sits inside the `<header>` below h1
- Spacing between h1 and subtitle: `space-y-3` (from the header's own class)

**Gap between header and content** (outer content wrapper):
```
space-y-8
```
32px between `<header>` and first content block. The outer wrapper also holds the `<header>` as its first child.

**Section headings (h2) inside a page:**
```html
<h2 class="text-lg font-semibold">Section title</h2>
```
Use `text-lg font-semibold` for section-level breaks within a page. Keep them left-aligned unless inside a centred container.

**Hierarchy summary:**
| Level | Use | Size | Font |
|-------|-----|------|------|
| h1 | Page title | `text-2xl font-semibold` | Orbit (via `--font-title`) |
| h2 | Page section | `text-lg font-semibold` | Orbit |
| h3 | Sub-section / card heading | `text-base font-medium` | Orbit |
| subtitle | Supporting line under h1 | `text-sm text-muted-foreground` | Inter |

---

### Feed card page margins

Every page that renders a feed of full-width cards (home feed, public profile, entity list pages, etc.) must use the same horizontal padding so cards appear consistent across surfaces.

**Rule:** the page-level wrapper provides the horizontal padding. The feed component or card list inside must **not** add its own `px-*` margin — that would double the gutter.

**Correct pattern:**
```tsx
// Page wrapper — single source of horizontal padding
<div className={`${formWidthClass('wide')} w-full max-w-full min-w-0 mx-auto px-4 md:px-6`}>
  <FeedComponent />
</div>

// Inside FeedComponent — no extra px-* on the card list wrapper
<div className="grid grid-cols-1 gap-6 w-full max-w-full min-w-0">
  {cards}
</div>
```

**Why this matters on mobile:** adding `px-4` at both the page and the component level results in 32 px side gutters instead of 16 px, visibly shrinking cards relative to the viewport.

**Individual cards** (`TrackViewCard`, `FourCornerCard`, etc.) handle their own internal padding (`px-4 md:px-6`) independently — that is intentional and should not be removed.

---

### Entity list pages — title grammar

Entity list pages (`/[username]/stars`, `/[username]/orbiters`, `/[username]/collections`, `/[username]/entangled-worlds`, `/[username]/audios`) follow the standard heading pattern above, with these title rules:

**Title grammar:**
- Own page: `My [EntityType]` — "My Stars", "My Orbiters", "My Collections", "My Entangled Worlds", "My Audios"
- Another user's page: `[DisplayName]'s [EntityType]` — uses `displayName` from the user profile, not the raw `username`

**Subtitles:**
- Stars own page: "Content you have starred."
- Stars another user: "Content starred by [DisplayName]."
- Other entity pages: no subtitle unless the design calls for one.

---

## Component Patterns

### Buttons

6 variants, all defined via CVA in `src/components/ui/button.tsx`:

| Variant        | Default style                      | Hover                          |
|----------------|------------------------------------|--------------------------------|
| `default`      | `--primary` bg, white text         | bg → transparent, text → primary, border → primary |
| `outline`      | transparent bg, `--border` border  | bg → foreground, text → background |
| `ghost`        | transparent, no border             | bg → foreground, text → background |
| `outlineAccent`| transparent, `--border-2` border   | stays same (accent color)      |
| `secondary`    | `--secondary` bg                   | opacity 80%                    |
| `destructive`  | transparent, `--destructive` border| —                              |
| `link`         | text only, underline on hover      | —                              |

**Key pattern:** hover = **full color inversion** (bg ↔ foreground swap). Not opacity reduction.

Button sizes: `sm` (h-8), `default` (h-9), `lg` (h-10), `icon` (36×36).

### Badges

4 variants from `src/components/ui/badge.tsx`: `default`, `secondary`, `destructive`, `outline`. No entity-specific badge colors — entity type is communicated through frame shapes and card context.

### Cards

**FourCornerCard** is the primary card pattern. Standard `<Card>` is used rarely.

```
FourCornerCard props:
  cornerColors  — 1–4 values: [bl, tl, tr, br] or shorthand
  cornerWidth   — 20px default
  cornerHeight  — 16px default
  connectHorizontal — close top/bottom edges
  connectVertical   — close left/right edges
  rounded       — 2px border-radius on corners (default true)
```

Color values: `--border` (default) or `--border-2` (accent).

**TwoCornerCard** is used for bracket/link patterns (e.g. `LinkBracket` component pairing two fields with a visual connection).

### Entity frames

Shape communicates entity type — do not mix shapes:

| Entity         | Shape     | CSS technique                                           |
|----------------|-----------|--------------------------------------------------------|
| User/Profile   | Circle    | `clip-path: circle(50%)`                               |
| Audio / Track  | Square    | No clip-path                                           |
| Collection     | Diamond   | `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)` |
| Orbiter        | Hexagon   | `clip-path: polygon(25% 6.7%, 75% 6.7%, 100% 50%, …)` |
| Entangled World| Rounded + red border | `border-radius: var(--radius-lg)` + `--destructive` border |

Orbiter frames have a `brightness`/`saturate` glow animation (`orbiter-glow`, 3s, `ease-in-out`, `infinite alternate`).

---

## Icons

### Current operating model

The production CDN bucket is the source of truth for shared design-system icons.
App-local files in `src/icons-remote/` are mirrored copies used for SVGR imports
such as `@/icons-remote/track.svg`; they are not authored assets and should not
be edited manually.

Current sync command:

```bash
npm run icons:sync
```

By default, the sync reads from:

```
https://herbarium.plantasia.space
```

The raw DigitalOcean Spaces origin URL is an implementation detail and should
not be used in design-system specs or frontend icon references. For local
testing, `PLANTASIA_ICON_CDN_BASE`, `NEXT_PUBLIC_SPACES_BASE_URL`, or
`SPACES_BASE` may override the base.

Current limitation: icon updates are currently made in the production bucket
only. A future dashboard workflow should upload shared icons to the required
buckets and update a manifest, but that is not part of the current workflow.

### Entity icons (CDN)

```
Base: https://herbarium.plantasia.space/assets/symbols/v2/
  home.svg
  track.svg
  track/*
  orbiter.svg
  entangled-world.svg
  collection.svg
  release.svg
  xplorer.svg
  xplorer-plus.svg
  xplorer-check.svg
  fungi.svg
  cc.logo.svg
  ccheart_black.svg
  ps.svg
```

All SVGs use `currentColor`. Rendering rules:
- In `<img>` tags: `filter: brightness(0)` on light bg; `filter: invert(1)` on dark bg
- Inlined SVGs: set `color` on the container

### Logos (CDN)

```
Base: https://herbarium.plantasia.space/assets/logos/v2/2025/
  plantasia-space-logo-black-transparent-background-512.svg  ← light bg
  plantasia-space-white-transparent-background-512.svg        ← dark bg
```

`logo-black.svg` uses `currentColor`; `logo-white.svg` uses literal `white` fills.

### General UI icons

[Lucide React](https://lucide.dev/) — globally overridden to `stroke-width: 1.0` via:
```css
svg.lucide { stroke-width: 1.0 !important; }
```

No emoji used as icons.

---

## Motion & Animation

| Name               | Keyframes                                    | Duration    | Easing       | Usage               |
|--------------------|----------------------------------------------|-------------|--------------|---------------------|
| `fade-in`          | opacity 0→1, translateY 10px→0               | 0.5s        | ease-out     | Feed item entry     |
| `collapsible-down` | height 0→content, opacity 0→1               | 0.3s        | ease-out     | Accordion open      |
| `collapsible-up`   | height content→0, opacity 1→0               | 0.3s        | ease-out     | Accordion close     |
| `orbiter-glow`     | brightness 1→1.2, saturate 1→1.3            | 3s          | ease-in-out  | Orbiter frame pulse |
| `marquee`          | translateX 0 → -50%                          | 28s         | linear       | Text marquee strips |

**No bounce easing.** All transitions use `ease-out` or `linear`. Hover transitions are `0.12–0.15s`.

---

## Glass / Blur Utility

Used **only** for navigation overlays (header, mobile bottom bar, mini player):

```css
.bg-blur-bg {
  background: var(--blur-bg);          /* #ffffffeb light / #000000cf dark */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

Do not apply blur to content cards.

---

## Navigation Structure

### Desktop (≥ 1268px)

```
┌─────────────────────────────────────────┐
│  [☰] [search]    LOGO    [notif] [user] │  ← sticky header, h=64px, glass blur
├──────┬──────────────────────────────────┤
│ side │                                  │
│ bar  │       main content               │
│ 52px │       (scrollable)               │
│ or   │                                  │
│220px │                                  │
│      │  ┌─────────────────────────────┐ │
│      │  │  mini player  h=64px        │ │  ← sticky bottom, glass blur
└──────┴──┴─────────────────────────────┴─┘
```

Sidebar collapse toggle: icon-only (`52px`) ↔ expanded (`220px`), animated at 0.2s ease.

### Mobile (< 1268px)

Portrait: fixed bottom bar `h=64px`, 5 items, glass blur, `--border-2` top border.
Landscape: fixed left rail `w=64px` instead.

---

## Configurable Presets — Design Guidance

When a user applies a theme preset, these CSS vars are overridden:
`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--border`, `--border-2`, `--destructive`, `--success`, `--input`, `--ring`, all `--chart-*`, all `--sidebar-*`, `--shadow-*`, `--radius`, `--blur-bg`, `--bottom-bar-bg`.

Fonts (`--font-title`, `--font-sans`) can also be overridden per preset.

**Design implication:** The entire visual language can shift — different brand hues, different font families, different radius. The *structural* decisions (flat elevation, inversion hover, FourCornerCard, entity frame shapes, glassmorphism nav) remain constant across presets because they are hardcoded in components.

When designing new UI:
1. Use semantic tokens (`--primary`, `--border`, `--foreground`) — never raw oklch values
2. Use the structural patterns (FourCornerCard, entity frames, hover inversion) — they are preset-safe
3. Font families should reference `var(--font-title)` and `var(--font-sans)`, not `'Orbit'` or `'Inter'` directly

---

## Writing / Copy

- Brand name: always `plantasia.space` — lowercase, with dot
- Tone: poetic, ecological, cosmic. Never corporate.
- Voice: "we" for platform, "you" for user
- Casing: sentence case throughout
- No emoji in UI copy
- Special glyph for regenerative music: `𝕣ꫀᧁꫀꪀꫀ𝕣ꪖ𝕥ⅈꪜꫀ ꪑꪊડⅈᥴ` (intentional, not a bug)
- Membership tiers: `Listener → Seed → Bloom → (top tier)`
