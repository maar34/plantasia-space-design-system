# plantasia.space Design System

**plantasia.space** is a platform for *regenerative music* — a space where listeners become creators, and sound interacts with the living landscape. The tagline is: *"Home for Regenerative Music."*

## Sources

| Resource | Path / URL |
|---|---|
| Main app codebase | `plantasia-space-org/plantasia.space-root` (private GitHub) |
| Global CSS & tokens | `src/app/globals.css` |
| UI components | `src/components/ui/` |
| Copy/strings (EN) | `messages/en/*.json` |
| Entity icons (SVG) | CDN: `https://herbarium.plantasia.space/assets/symbols/v2/` |
| Electron shell | `electron/` subfolder of root repo |

---

## Products

| Surface | Description |
|---|---|
| **Web App** (primary) | Next.js 14 SPA — authenticated music player, entity creator, community feed |
| **Electron (Helix)** | Desktop kiosk variant. Same codebase. Helix = installation/exhibition mode |
| **xPlorer landing** | Guest-facing marketing pages: xPlorer, Release, Search |

---

## Core Entities

| Entity | Shape | Accent Color | Description |
|---|---|---|---|
| **Audio / Track** | Square | `--ps-entity-track` (pink-red) | Music uploads; the atomic unit |
| **Orbiter** | Hexagon | `--ps-entity-orbiter` (green) | Meta-musical instrument; processes audio via sensors/MIDI |
| **Entangled World** | Rounded rect + red border | `--ps-entity-world` (blue) | Linked to a real exoplanet; worldbuilding container |
| **Collection** | Diamond | `--ps-teal` | Curated sets of tracks/worlds |
| **xPlorer** | Circle avatar | `--ps-pink` | The user/community member |

---

## CONTENT FUNDAMENTALS

### Voice & Tone

plantasia.space writes in a **poetic, philosophical, manifesto-driven voice**. Copy feels like it was written by someone equally influenced by ecology, experimental music, and space science.

- **Register:** lyrical, philosophical, unhurried. Never corporate.
- **Perspective:** "we" for the platform community; "you" for the user. Not "I".
- **Casing:** sentence case throughout. The brand is always written `plantasia.space` — lowercase, with the dot.
- **Rhythm:** short lines, poetic pacing. Copy feels designed to be read aloud.
- **Emoji:** none. The brand uses special Unicode for the term *regenerative music*: `𝕣ꫀᧁꫀꪀꫀ𝕣ꪖ𝕥ⅈꪜꫀ ꪑꪊડⅈᥴ` — treat this as a proper glyph, not decoration.

### Key Metaphor Systems

| Domain | Examples |
|---|---|
| **Gardening / ecology** | "The garden is quiet", "each sound is a seed", "cultivate new worlds", "xPlorers are gardeners of the soundscape" |
| **Space / astronomy** | "Orbiters", "Entangled Worlds", "exoplanets", "orbit around the fire" |
| **Ancient/tribal memory** | "Before studios, music was made around the fire", "memory of the landscape", "a key to time travel" |
| **Biology / fungi** | "spore", "mycelium", "germinates in every ear", "the living archive" |

### Membership Tiers (copy names)

`Listener (0)` → `Seed (1)` → `Bloom (2)` → `(unnamed tier 3)`

### Example Strings

> "The garden is quiet—for now."  
> "Music as a tool for time travel, a key to the memory of the landscape."  
> "xPlorers are gardeners of the soundscape."  
> "Join plantasia.space — a space where music regenerates and flourishes."  
> "Space music for plan(e)ts and the xPlorers who love them."  
> "What if listening was a form of care?"

---

## VISUAL FOUNDATIONS

### Color System

Two signature brand hues — teal and hot pink — that **swap roles** between light and dark mode:

| Token | Value (oklch) | Approx | Light role | Dark role |
|---|---|---|---|---|
| `--ps-teal` | `oklch(0.8982 0.1458 194.8698)` | aqua/mint | secondary | **primary** |
| `--ps-pink` | `oklch(0.6903 0.2708 340.8828)` | hot pink/magenta | **primary** | secondary |
| `--background` | `oklch(1 0 0)` / `oklch(0 0 0)` | white / black | bg | bg |
| `--foreground` | `oklch(0 0 0)` / `oklch(1 0 0)` | black / white | text | text |
| `--border` | black / white | | full-strength border | full-strength border |
| `--border-2` | `--ps-pink` / `--ps-teal` | | accent border | accent border |

Entity accent colors:
- Track: `oklch(0.78 0.12 350)` — pink-red
- World: `oklch(0.78 0.10 230)` — sky blue  
- Orbiter: `oklch(0.78 0.12 165)` — green

**Color vibe of imagery:** Not defined in the codebase. The space + organic palette suggests desaturated cosmic imagery with occasional vibrant editorial accents.

### Typography

| Role | Family | Weight | Usage |
|---|---|---|---|
| **Display / Title** | `Orbit` (Google Fonts) | 400 | All h1/h2/h3, navigation labels, section titles |
| **Body / UI** | `Inter` | 300–700 | All body copy, labels, inputs, descriptions |
| **Mono** | `JetBrains Mono` | 300–500 | Code, technical metadata |

- Headings use **Orbit** — a sci-fi/space-geometric typeface. Very intentional brand statement.
- Body copy uses Inter. No decorative serifs in the UI.
- Letter spacing: `normal` (no tracking adjustment applied globally).
- Line heights: 1.2 (display) → 1.6 (body).

### Spacing & Radius

- **Base radius:** `0.75rem` (12px). Cards, inputs, buttons all use variants of this.
- `radius-sm: 8px`, `radius-md: 10px`, `radius-lg: 12px`, `radius-xl: 16px`

### Shadows

**No box shadows.** All shadow variables are `0`. The design achieves depth through **borders** and **color contrast** rather than elevation. This is a deliberate, flat aesthetic.

### Borders

- Default border: full-strength foreground color (black in light, white in dark). High contrast, graphic.
- Accent border (`--border-2`): the brand's `--ps-pink` (light) or `--ps-teal` (dark).
- Border width: 1px standard; 2px for entity frames and accent elements.
- The `border-b-bottom` / `border-b-top` / `border-b-right` utilities use `--border-2` (accent) specifically.

### Backgrounds

- Pure white (light) or pure black (dark). **No gradients** on backgrounds.
- Navigation bars and mini-player use **glassmorphism**: `backdrop-filter: blur(12px)` with semi-transparent `--blur-bg` (`#ffffffeb` / `#000000cf`).

### Animations & Motion

- `fade-in`: `opacity 0→1` + `translateY(10px→0)`, `0.5s ease-out`. Used for feed items.
- `collapsible-down/up`: height + opacity, `0.3s ease-out`. Accordion/expand animations.
- `orbiter-glow`: `brightness` + `saturate` alternating, `3s ease-in-out infinite`. Subtle pulse on Orbiter frames.
- Motion philosophy: **subtle, purposeful**. No bounces. `ease-out` dominates.

### Hover States

- Buttons (default, outline, ghost): **color inversion** — fill becomes background, background fills with foreground/primary.
- Entity frames: `scale(1.05)` on hover.
- Ghost buttons use `aria-pressed` for active state (same inversion as hover).

### Entity Frame Shapes (clip-path)

| Entity | Shape | CSS |
|---|---|---|
| User/Profile | Circle | `clip-path: circle(50%)` |
| Track | Square | No clip-path; plain square |
| Collection | Diamond | `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)` |
| Orbiter | Hexagon | `clip-path: polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)` |
| Entangled World | Rounded rect | `border-radius: var(--radius-lg)` + red destructive border |

### Cards

- Card component: `bg-card`, `rounded-xl`, `border` (1px solid `--border`), `shadow-sm` (effectively no shadow), `py-6` padding.
- **FourCornerCard**: A distinctive UI pattern — decorative corner brackets (not a full border). Sci-fi / technical aesthetic. Used for featured content and form sections.
- No cards with colored left-border accents. No rounded corners + left-border hybrid.

### Use of Transparency & Blur

- Navigation bars (header, mobile bottom bar): glassmorphism backdrop blur.
- Mini-player: same blur treatment.
- Blur is used **only** for navigation overlays — not for cards or content.

### Layout Rules

- Desktop nav: collapsible sidebar on left, sticky header on top.
- Mobile nav: fixed bottom bar (portrait) or left side rail (landscape), height `64px`.
- Navigation breakpoint: `1268px`.
- Scrollbar: thin, theme-aware; thumb = `--muted-foreground`.

### Corner Radius

- `0.75rem` base. Not aggressively rounded; geometric-clean aesthetic.
- Entity frames (User, Collection, Orbiter) use **clip-path** instead of border-radius.

---

## ICONOGRAPHY

### Asset CDN

All production assets are served from:

```
PLANTASIA_ASSET_BASE = 'https://herbarium.plantasia.space/assets'
```

**Logos (v2/2025):**
```
/logos/v2/2025/plantasia-space-logo-black-transparent-background-512.svg  ← use on light bg
/logos/v2/2025/plantasia-space-white-transparent-background-512.svg        ← use on dark bg
```

**Entity icons (v2):**
```
/symbols/v2/track.svg
/symbols/v2/orbiter.svg
/symbols/v2/entangled-world.svg
/symbols/v2/collection.svg
/symbols/v2/release.svg
/symbols/v2/xplorer.svg
```

All SVGs use `currentColor` for fills/strokes. When loading via `<img>`:
- Light bg: apply `filter: brightness(0)` → renders black
- Dark bg: apply `filter: invert(1)` → renders white

When inlining SVGs directly, set `color: #000` (light) or `color: #fff` (dark) on the container.

App-local copies live in `src/icons-remote/` in frontend repos for SVGR imports. They are generated mirrors of the CDN assets and are not authored design-system files.

### Lucide Icons (General UI)

The app uses [Lucide React](https://lucide.dev/) for all general UI icons (arrows, check, palette, external-link, etc.). Override: `stroke-width: 1.0` applied globally via `svg.lucide { stroke-width: 1.0 !important }`. This gives them a **thin, elegant** feel rather than the default 2.0 weight.

### No Emoji

Emoji are not used as icons or decorations anywhere in the UI.

### Unicode Special Characters

The "regenerative music" phrase uses special Unicode glyphs as a designed typographic element: `𝕣ꫀᧁꫀꪀꫀ𝕣ꪖ𝕥ⅈꪜꫀ ꪑꪊડⅈᥴ`. This is intentional branding, not a display bug.

---

## File Index

```
README.md                      ← this file
colors_and_type.css            ← CSS vars: colors, type scale, entity frames, utilities
SKILL.md                       ← Agent skill descriptor
preview/
  colors-brand.html            ← brand palette swatch card
  colors-semantic-light.html   ← light-mode semantic tokens
  colors-semantic-dark.html    ← dark-mode semantic tokens
  colors-entity.html           ← entity accent colors
  type-display.html            ← Orbit display type specimen
  type-body.html               ← Inter body type specimen
  type-mono.html               ← JetBrains Mono specimen
  type-scale.html              ← full type hierarchy
  spacing-tokens.html          ← radius + spacing tokens
  spacing-shadows.html         ← shadow / elevation system
  entity-frames.html           ← entity frame shapes (clip-paths)
  components-buttons.html      ← button variants
  components-badges.html       ← badge variants
  components-cards.html        ← card + FourCornerCard
  components-nav.html          ← header + sidebar chrome
  brand-logos.html             ← logo variants
  brand-icons.html             ← entity icon set
ui_kits/
  website/
    README.md                  ← kit overview
    index.html                 ← interactive web app prototype
    Header.jsx                 ← site header component
    Sidebar.jsx                ← desktop sidebar
    MobileNav.jsx              ← mobile bottom bar
    EntityCards.jsx            ← track/orbiter/world/collection cards
    FeedPage.jsx               ← home feed screen
    GuestLanding.jsx           ← guest/marketing landing
```
