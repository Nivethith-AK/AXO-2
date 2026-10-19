---
name: Memento Mori
description: Official web chronicle and archive for Memento Mori by Δxolotl
colors:
  primary: "#d4af37"
  primary-bright: "#f3ce65"
  neutral-bg: "#060606"
  neutral-bg-raised: "#0e0e0e"
  neutral-fg: "#ffffff"
  neutral-fg-mid: "#d2d2d2"
  neutral-fg-dim: "#9a9a9a"
  light-bg: "#f7f7f9"
  light-bg-raised: "#ffffff"
  light-fg: "#0c0c0c"
  light-fg-mid: "#3a3a3a"
  light-gold: "#9e7714"
typography:
  display:
    fontFamily: "'Orbitron', 'Cormorant Garamond', sans-serif"
    fontWeight: 700
    letterSpacing: "0.14em"
  body:
    fontFamily: "'Roboto Mono', monospace"
    fontWeight: 400
    lineHeight: "1.65"
  mono:
    fontFamily: "'Roboto Mono', monospace"
    fontWeight: 500
rounded:
  none: "0px"
  sm: "2px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
---

## Overview

Memento Mori is a celestial, dark-fantasy web experience accompanying the web-novel chronicle by Δxolotl. The design aesthetic synthesizes sacred geometry, planetary mechanics (orrery), archival typography, and a duality between deep cosmic dark mode and an illuminated manuscript light mode.

## Colors

The palette operates around a dual theme system with high-contrast foregrounds and gold accents:

### Dark Mode (Default)
- **Background (`--bg`):** `#060606` deep obsidian void.
- **Surface / Card (`--card-bg`):** `rgba(12, 12, 12, 0.90)` with backdrop blur.
- **Foreground (`--fg`):** `#ffffff` high-contrast crisp text.
- **Secondary Text (`--fg-mid`):** `#d2d2d2`.
- **Gold Accent (`--gold`):** `#d4af37` celestial metallic gold.
- **Gold Highlight (`--gold-bright`):** `#f3ce65`.

### Light Mode (Manuscript)
- **Background (`--bg`):** `#f7f7f9` tactile archival parchment.
- **Surface / Card (`--card-bg`):** `rgba(255, 255, 255, 0.96)`.
- **Foreground (`--fg`):** `#0c0c0c` deep carbon ink.
- **Secondary Text (`--fg-mid`):** `#3a3a3a`.
- **Gold Accent (`--gold`):** `#9e7714` antique illuminated gold.

## Typography

- **Display Headings (`--font-display`):** `Orbitron`, uppercase, tracked (`0.12em` to `0.14em`), geometric sci-fi elegance.
- **Body & Metadata (`--font-body` / `--font-mono`):** `Roboto Mono`, monospaced for code-like narrative realism, telemetry, and timecodes. Minimum functional text size is `11px`.
- **Literary Accents (`--font-serif`):** `Cormorant Garamond` for classical quotations and novelistic flavor.
- **Glyph Integrity:** Greek characters (like `α` for Chapter α) must always retain their identity using `.glyph-preserve { text-transform: none !important; }`.

## Layout

- **Grid & Max Width:** Centered container with max width `1200px` and adaptive gutters (`clamp(20px, 7vw, 120px)`).
- **Navigation (`--nav-h: 72px`):** Fixed glassmorphism header with active section tracking, theme toggle, music button, and mobile drawer.
- **Reading Viewport (`--read-w: 680px`):** Constrained column for optimal line length and comfortable long-form reading.

## Elevation & Depth

- **Tonal Layering:** Depth is primarily established through background luminosity shifts (`--bg` vs `--bg-raised` vs `--card-bg`) and frosted glass (`backdrop-filter: blur(20px)`).
- **Precision Borders:** 1px borders using `--gold-border` (`rgba(212,175,55,0.3)`) and sharp corner brackets.
- **Subtle Glow:** Ambient gold aura (`rgba(212, 175, 55, 0.15)`) reserved for interactive focus and active states.

## Shapes

- **Corner Language:** Sharp, angular, unrounded forms (`border-radius: 0`) reflecting mathematical precision and celestial coordinates.
- **HUD Pill & Dots:** Circular accents (`border-radius: 9999px`) reserved for indicators and audio controls.
- **Framing Brackets:** Absolute positioned corner brackets (`4px × 4px` or `10px × 10px`) reinforcing mechanical framing.

## Components

- **Planetary Orrery Player:** Kinetic orbital canvas syncing audio playback with celestial rotation.
- **Telemetry Cards:** Monospaced stat metrics with corner notches.
- **Archive Chapter List:** Tabular chapter directory with lock state indicators and direct chapter links.
- **Reader Overlay:** Modal reading experience with drop caps and chapter navigation.
- **Contact Form:** High-contrast inputs with gold bottom accents.

## Do's and Don'ts

### Do
- Maintain high contrast between typography and backgrounds in both themes.
- Preserve Greek glyphs like `α` and `Ω` explicitly without letting CSS uppercase transform them into Latin equivalents.
- Provide smooth, zero-flash transitions when switching themes.
- Keep audio synchronized across navigation toggle and interactive player.

### Don't
- Don't use generic blue or purple gradient backgrounds; stick strictly to the celestial gold and obsidian/parchment palette.
- Don't set interactive or readable text below `11px`.
- Don't round cards or buttons with generic bubbly border radii.
- Don't add jarring unexpected layout shifts during chapter or audio loading.
