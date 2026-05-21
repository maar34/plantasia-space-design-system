---
name: plantasia-space-design
description: Use this skill to generate well-branded interfaces and assets for plantasia.space, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, spacing rules, and UI kit components for the plantasia.space music platform.
user-invocable: true
---

Read the DESIGN.md file within this skill for the canonical source of truth. README.md gives platform and entity context. Explore other available files as needed.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, use the rules here as authoritative design guidance.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

> **This skill lives in `.claude/skills/plantasia-space-design/` inside the main `plantasia.space-root` repo.** Edit it there as design decisions are made in production. To export a polished version: copy this directory back to `plantasia-space-root-design-system/`.

## Quick Reference

**Brand:** plantasia.space (always lowercase with dot) — "Home for Regenerative Music"

**Colors:**
- Teal: `oklch(0.8982 0.1458 194.8698)` — primary in dark, secondary in light
- Pink: `oklch(0.6903 0.2708 340.8828)` — primary in light, secondary in dark
- Black/white backgrounds only. No gradient backgrounds.

**Fonts:**
- Display/headings: `Orbit` (Google Fonts) — all h1/h2/h3
- Body/UI: `Inter`
- Mono: `JetBrains Mono`

**Key patterns:**
- No box shadows — depth via borders only
- Entity frames: circle (user), square (track), diamond (collection), hexagon (orbiter), rounded+red-border (world)
- FourCornerCard: decorative corner brackets — a signature sci-fi UI element
- Glassmorphism: `backdrop-filter: blur(12px)` on nav bars only
- Lucide icons at stroke-width 1.0
- Ghost/outline buttons invert on hover (bg ↔ text swap)

**Entity vocabulary:** Audio/Track, Orbiter, Entangled World, Collection, xPlorer (user)

**Tone:** Poetic, philosophical, ecological + cosmic metaphors. "The garden is quiet — for now." Never corporate.

**Page heading pattern (entity list pages):**
- Container: `px-4 md:px-8 py-10` — matches Settings page rhythm
- Header: `<header class="text-center space-y-3">` with `text-2xl font-semibold` h1
- Icon: entity's custom SVG, `h-6 w-6`, inline-flex `gap-2`
- Content gap: outer wrapper `space-y-8`
- Own page title: `My [EntityType]` — Other user: `[DisplayName]'s [EntityType]`
- See **Spacing & Layout → Page layout — entity list pages** in DESIGN.md for full spec.

**Assets:** shared icons are sourced from the production CDN (`https://herbarium.plantasia.space`); app-local `src/icons-remote/` files are mirrored copies for SVGR imports, not authored assets.
**CSS vars:** `colors_and_type.css` in the root.
**Full spec:** `DESIGN.md` — canonical design reference.
**UI Kit:** `ui_kits/website/index.html` — interactive prototype.
