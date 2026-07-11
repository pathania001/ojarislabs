# OjarisLabs Brand Guide

A concise guide to using the OjarisLabs identity consistently.

## Brand positioning

OjarisLabs is a **digital engineering & growth partner** — "OjarisLabs helps businesses design, build, automate and grow through modern technology." A new brand, built by experienced technology professionals. Premium, global, engineering-led, transparent, business-focused. Never present it as a large, long-established company.

## The Ojas concept

Ojas = **intelligent energy, vitality, clarity, momentum and potential** — expressed abstractly and non-religiously. It shapes the tone (focused, curious, purposeful) and the visual language (orbital motion, luminous gradients, precise geometry).

## Logo

Concept: **O + intelligent energy + orbital motion + forward momentum** — an open circular ring with a diagonal energy line crossing it and a small "comet" dot at the top-right.

Assets (`assets/brand/`):

| File | Use |
| --- | --- |
| `ojarislabs-mark.svg` | Icon-only mark (gradient) |
| `ojarislabs-logo-light.svg` | Full logo for **light** backgrounds (dark wordmark) |
| `ojarislabs-logo-dark.svg` | Full logo for **dark** backgrounds (white wordmark) |
| `favicon.svg` | Mark on a dark rounded square; works at 16px |
| `apple-touch-icon.png` | 180×180 app icon |
| `og-default.jpg` | 1200×630 default social share image |

- The **core mark works without glow.** Glow/energy trails belong only in hero illustrations (e.g. `assets/images/hero-orbital.svg`), never baked into the logo SVG.
- Keep the mark geometric and simple. No planet/Saturn look, no brain or lightning-bolt clichés, no religious symbols.

### Clear space & minimum size
- Clear space: at least the height of the comet dot on all sides.
- Minimum: mark 16px (favicon); full logo ~120px wide. Below that, use the mark alone.

## Color

Defined as CSS custom properties in `css/variables.css`:

| Token | Value | Role |
| --- | --- | --- |
| `--bg-core` / `--color-bg-primary` | `#030817` | Primary dark background |
| `--bg-dark-1/2/3` | `#050A18` `#071126` `#0A1224` | Supporting darks |
| `--bg-white` / `--bg-light-1/2` | `#FFFFFF` `#F7F8FC` `#FAFAFC` | Light surfaces |
| `--oj-orange` | `#FF8A00` | Accent |
| `--oj-pink` | `#F72585` | Accent |
| `--oj-purple` | `#8B3DFF` | Accent |
| `--oj-blue` | `#168BFF` | Accent |
| `--oj-cyan` | `#00C9D8` | Accent |

## Gradient

Signature gradient: `linear-gradient(90deg, #FF8A00 0%, #F72585 35%, #8B3DFF 68%, #168BFF 100%)` (`--grad-primary`).

Use it as an **accent**, not everywhere: primary CTA buttons, selected headline words (`.gradient-text`), the capability strip, CTA banners, and subtle brand accents. Avoid gradient on large text blocks or as a background for whole sections.

## Typography

- Display/headings: **Poppins** (`--font-display`).
- Body/UI: **Inter** (`--font-sans`).
- Fluid sizing via `clamp()` tokens (`--fs-hero`, `--fs-h1`, …).

## Reusable classes

`.gradient-text`, `.btn--primary` (gradient button), `.card` / `.card--dark`, `.card-icon`, `.cap-strip`, `.section-head` + `.eyebrow`, `.hero` / `.hero-visual`, `.cta-banner`, `.faq-list`. Prefer these over new one-off styles.

## Incorrect usage

- Don't recolor the logo outside the brand palette or place the gradient logo on a busy background.
- Don't add glow/shadow to the core logo SVG.
- Don't stretch, rotate or crop the mark.
- Don't imply scale the brand doesn't have (fake stats, clients, offices, certifications).
