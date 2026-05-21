# plantasia.space Web App UI Kit

A high-fidelity click-through prototype of the plantasia.space web app. Built from the live codebase (`plantasia-space-org/plantasia.space-root`).

## Usage

Open `index.html` in a browser to view the interactive prototype.

## Screens

| Screen | Access | Notes |
|---|---|---|
| **Guest Home** | Default | Public feed + CTA banners |
| **xPlorer** | Guest | Marketing landing with marquee + pillars |
| **Release** | Guest | Release feature showcase |
| **Dashboard** | Authenticated | Home feed with sidebar navigation |
| **Entity Lists** | Authenticated | Audios / Orbiters / Worlds / Collections |

**Click "Log in"** in the header to toggle between guest and authenticated states.

## Components

| File | Exports | Description |
|---|---|---|
| `Header.jsx` | `SiteHeader` | Sticky glass header, logo centered, auth buttons |
| `Sidebar.jsx` | `AppSidebar`, `MobileNav` | Desktop collapsible sidebar + mobile bottom nav |
| `EntityCards.jsx` | `TrackCard`, `OrbiterCard`, `WorldCard`, `CollectionCard`, `FeedGrid` | Entity cards with correct clip-path frames |
| `styles.css` | — | All CSS: tokens, frames, layout, buttons, badges |

## Design Tokens Used

- `--ps-teal`: `oklch(0.8982 0.1458 194.87)` — teal/mint
- `--ps-pink`: `oklch(0.6903 0.2708 340.88)` — hot pink (primary light)
- `--ps-red`: `oklch(62.793% 0.25768 29.223)` — destructive / world border
- Fonts: `Orbit` (display), `Inter` (body), `JetBrains Mono` (meta)
- No box shadows; depth via borders only
- Lucide-style SVG icons at stroke-width 1.0

## Interaction Notes

- Dark/light toggle: moon/sun icon in header
- Sidebar collapse: panel-left icon in header
- Navigation: sidebar items route between screens
- "Log in" → simulates auth state, reveals sidebar + mini player
- "Log out" → click avatar in header, returns to guest state
