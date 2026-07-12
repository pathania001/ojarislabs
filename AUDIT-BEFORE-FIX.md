# AUDIT-BEFORE-FIX

Audit of the previously deployed OjarisLabs site before the repair pass in this session. Screenshots: `qa/before-fix/`.

## Key defects found on the live build

| # | Area | Issue | Severity |
| --- | --- | --- | --- |
| 1 | Home | Large **blank/black empty area** after the services "View all services" button; the brand-features, why-choose, FAQ and CTA content exists in the DOM but renders invisible. | Critical |
| 2 | Services | FAQ renders as **unstyled native `<details>`** with default ▶/▼ markers — not a designed component. | High |
| 3 | Global | Scroll-reveal content is hidden by default (`.reveal { opacity: 0 }`) and depends on JavaScript to become visible — a single JS/observer failure blanks whole sections. | Critical (root cause of #1) |

## Root cause — homepage blank/black section

The live build hides every `.reveal` element with `opacity: 0` and relies on an `IntersectionObserver` (in `main.js`) to add `.is-visible`. Two problems combine:

1. **Content visibility depends on JS.** If `main.js` fails to load/execute (or runs before layout), the reveal elements never receive `.is-visible` and stay at `opacity: 0` → the dark section background shows through as a blank/black area even though the DOM content is present.
2. **Observer threshold too high for tall sections.** The observer used `threshold: 0.15`; tall sections may never expose 15% of their area within the viewport, so the callback never fires for them.

This is a CSS/JS animation-architecture failure, not missing content. Removing the dark background would be wrong — the sections must be restored to visible.

## Root cause — unstyled Services FAQ

The live build predates the styled FAQ component, so `<details>/<summary>` fell back to the browser's default marker and layout. There was no custom accordion styling (custom marker removal, card styling, +/− icon).

## Per-page snapshot (live, before)

| Page | HTTP | Visible content | Design fidelity | Issues |
| --- | --- | --- | --- | --- |
| / (home) | 200 | Partial — blanks after services | Broken mid-page | #1, #3 |
| services.html | 200 | Yes | FAQ unstyled | #2, #3 |
| solutions/about/resources/careers/contact | 200 | Mostly, reveal-dependent | Reveal risk | #3 |
| service detail + articles + legal | 200 | Reveal-dependent | Reveal risk | #3 |

The repository build already differed from the live build; the fixes below were applied to the repository (generator) so the next deploy resolves all three defects. See `FINAL-WEBSITE-QA.md`.
