# AGENTS.md

## Project overview

OjarisLabs marketing website. Static, multi-page, **no framework and no build step**: semantic HTML5 + modern CSS (design tokens) + vanilla JS. The repository root is the deployable site.

## Cursor Cloud specific instructions

- **The HTML is GENERATED — do not hand-edit `*.html`.** All pages (`index.html`, service pages, `resources/*.html`, legal, `sitemap.html`, `404.html`) plus `sitemap.xml`, `robots.txt` and `llms.txt` are produced by the static site generator in `build/`. Edit content/templates there and regenerate with `npm run build:site` (aliased as `npm run build`). Hand edits to generated files will be overwritten on the next build. The generated files ARE committed so the host serves pure static files (no build runs on Hostinger).
  - `build/layout.mjs` — `SITE_URL`, head/header/footer, icons, shared helpers.
  - `build/data.mjs` — service groups, the 24 service landing pages, solutions, FAQs.
  - `build/articles.mjs` — resource article content.
  - `build/render.mjs` / `build/misc.mjs` — page renderers. `build/generate.mjs` — entrypoint.
- **`SITE_URL` is in `build/layout.mjs`** and must remain the production origin (`https://ojarislabs.com`) for canonicals, Open Graph URLs, JSON-LD and sitemap generation.
- **Truthfulness is non-negotiable.** OjarisLabs is a NEW brand. Never add fabricated clients, testimonials, statistics, case-study metrics, company history/timeline, offices, phone numbers, awards or certifications. Team experience may be stated honestly ("built by experienced technology professionals"). See `CONTENT-AUDIT.md`.
- **Run the site:** `npm run dev` (`serve` on `http://localhost:3000`). Static, no backend. `serve.json` sets `cleanUrls: false` + a `/`→`index.html` rewrite so the dev server mirrors Hostinger: `/services.html` serves directly, extensionless 404s unless `.htaccess` rewriting is active.
- **Internal links are RELATIVE `.html` paths** with correct depth (`./x.html` at root, `../x.html` under `resources/`). Canonical / Open Graph / JSON-LD URLs stay ABSOLUTE via `SITE_URL`. The generator handles all of this.
- **Animation architecture is fail-safe — keep it that way.** Reveal content is VISIBLE by default in CSS. The `js` class (which enables the hide-then-reveal animation) is added ONLY inside `js/main.js` after the `IntersectionObserver` is created, inside a `try/catch` that reveals everything on any failure; unsupported-IO and `prefers-reduced-motion` also reveal everything. Never hide essential content with a default `opacity:0`/`visibility:hidden` that depends on JS, and never add the `js` class from a standalone inline script — that reintroduces the "blank/black section" bug.
- **Validate before shipping:** always rebuild first, then run all checks: `npm run build:site && npm run lint && npm run audit`. `npm run audit` (`scripts/audit-site.js`) covers broken links/assets/anchors, empty-href/placeholder-#, duplicate titles/descriptions, missing/multiple H1, missing canonical/description, missing alt, and flags EMPTY PAGES (large `<main>` with little visible text). `npm run check:links` is the lighter link+SEO subset. `npm run visual:audit` (`scripts/visual-audit.js`) is optional Playwright screenshot QA.
- **Shared header/footer are duplicated inline in every page** (no partial/include system, by design for zero-build + SEO). When changing the nav or footer, update it in every `*.html` file, and set `aria-current="page"` on the active nav item per page.
- **Design system lives in `css/variables.css`** (colors, gradient, typography scale via `clamp()`, spacing, radii, shadows, motion). Prefer editing tokens over hard-coding values. CSS load order matters: variables → base → components → animations → responsive.
- **Lint:** `npm run lint` runs stylelint (`css/**/*.css`) and htmlhint (`**/*.html`). Config in `.stylelintrc.json` / `.htmlhintrc` intentionally relaxes compact single-line CSS and hex-length rules.
- **JS is one file** (`js/main.js`), progressive-enhancement, no dependencies: sticky header, mobile nav, IntersectionObserver scroll-reveal + stat count-up, testimonial slider (only transforms on ≤980px; grid on desktop), resources search/filter, and form validation with simulated submit.
- **Placeholder content is deliberate.** Stats, testimonials, case studies, milestone dates and contact details are unverified and flagged with code comments — do not present them as factual without business confirmation. The contact/newsletter forms simulate submission; wire to a real endpoint before production.
