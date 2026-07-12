# HOMEPAGE-REDESIGN-QA

Redesign of the OjarisLabs homepage below the Services section, plus brand-asset centralization. Verified with `npm run lint`, `npm run audit` (43 files, 2,538 links — clean) and manual browser QA at 1440px and 390px. Screenshots in `qa/after-fix/`.

## 1. Root cause of the previous invisible / blank homepage sections
Scroll-reveal content was hidden by default (`.reveal { opacity: 0 }`) and only made visible by JavaScript adding `.is-visible`. If the reveal didn't fire — JS load/exec failure, or `IntersectionObserver` `threshold: 0.15` never met by tall sections — those elements stayed at `opacity: 0`, so the dark section background showed as a large blank/black area.

**Status: fixed (and re-hardened this pass).** Content is visible by default in CSS; the `js` class that enables hide-then-reveal is added **only inside `main.js` after the observer is created**, wrapped in `try/catch` that reveals everything on any error; `threshold: 0`; `prefers-reduced-motion` and unsupported-IO both reveal everything; if `main.js` never loads, `js` is never added and nothing hides. No essential content depends on JS to be visible.

## 2. Sections redesigned (new homepage flow)
Header → Hero → Technology stack → Services (preserved), then a completely redesigned experience:

| # | Section | Background | Design |
| --- | --- | --- | --- |
| 05 | Digital Capability Engine | Light | 5-stage connected journey (Discover · Design · Build · Connect · Grow) with a gradient energy line; stacks vertically on mobile with a vertical line |
| 06 | The Ojas Principle | Dark | Left brand story + right **orbital composition**: glowing "OJAS" core (brand mark) with 5 principles (Energy, Clarity, Innovation, Growth, Transformation) arranged in a diamond; radial glow + orbital ring; stacks on mobile |
| 07 | How We Turn Ideas Into Impact | Light | Vertical process timeline with large gradient numbers (Understand · Architect · Create · Validate · Evolve) |
| 08 | Why OjarisLabs | Light | Asymmetric **bento grid** (2 wide + 2 narrow cards) with gradient hover edge |
| 09 | Technology Ecosystem | Dark | 6 categorized capability cards (Web & CMS, Commerce, Engineering, AI & Automation, Cloud & Infrastructure, Design & Growth) with tech chips + a "not clients/partners" note |
| 10 | FAQ | Light | Two-column (left heading, right premium accordion with +/− icon) |
| 11 | Final CTA | Gradient | "Let's Build What Comes Next" in a navy-controlled gradient environment with a faint orbital graphic |
| 12 | Footer | Dark | Structured columns + brand |

Light/dark rhythm alternates: dark → light → dark → light → dark → light → gradient → dark. No large uninterrupted black area. No section uses `min-height:100vh`.

## 3. Exact logo asset used
The approved OjarisLabs identity (orbital "O" + diagonal energy stroke + orange→pink→purple→blue gradient + wordmark) is used consistently across every page via the generator's shared header/footer (single source in `build/layout.mjs`) and `assets/brand/ojarislabs-mark.svg` (Ojas core).

**⚠️ Action needed — exact attached files:** The final approved logo/favicon were pasted as **chat images**, which are not accessible as files on the build VM (searched `/tmp`, `/home`, `/workspace`, `/opt/cursor`, `.cursor`). Raster bytes cannot be losslessly extracted from a chat preview, and recreating/approximating is explicitly disallowed. The site currently uses the existing **faithful vector** of the same approved design. To drop in the exact approved files verbatim, add them to the repo and I will wire them in one place:
- `assets/brand/ojarislabs-logo.(svg|png)` → referenced by header + footer (`build/layout.mjs`)
- `assets/brand/ojarislabs-favicon.(svg|png)` + `apple-touch-icon.png` → referenced in `head()`
Because header/footer/head are centralized in the generator, this is a single-place swap that propagates to all 43 pages.

## 4. Exact favicon asset used
Currently `assets/brand/favicon.svg` (rounded mark) + `assets/brand/apple-touch-icon.png`, referenced once in `head()` so every page uses the same. Same drop-in note as above for the exact attached favicon.

## 5. Old/incorrect logo references removed
The legacy `assets/icons/` logo files are unused; all pages reference the centralized `assets/brand/` mark and the generator's shared header/footer. No page carries a divergent logo.

## 6. Responsive screenshots checked
1440px and 390px inspected. `qa/after-fix/`: `home-journey`, `home-ojas-orbital`, `home-bento`, `home-ecosystem`, `home-mobile-redesign` (+ earlier home/services shots). Mobile: no horizontal overflow; journey, Ojas orbital, steps, bento and ecosystem all stack cleanly.

## 7. Console errors found and fixed
None. DevTools console clean on the homepage after hard refresh; all network requests 200 (incl. `favicon.svg`, `ojarislabs-mark.svg`, `main.js`).

## 8. Broken links found and fixed
None. `npm run audit`: 0 broken links/assets/anchors across 43 files / 2,538 links; unique titles/descriptions; one H1/page; canonicals; image alts; no EMPTY PAGE warnings.

## Animation safety
`.reveal` visible by default; `.js`-gated hide-then-reveal added only after observer init; `try/catch` fail-safe; reduced-motion safe. No content can be stuck invisible.
