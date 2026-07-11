# AGENTS.md

## Project overview

OjarisLabs marketing website. Static, multi-page, **no framework and no build step**: semantic HTML5 + modern CSS (design tokens) + vanilla JS. The repository root is the deployable site.

## Cursor Cloud specific instructions

- **Run the site:** `npm run dev` (starts `serve` on `http://localhost:3000`). This is a static site — there is no backend, database, or build step. `npm run build` is intentionally a no-op. `serve.json` sets `cleanUrls: false` so the dev server mirrors plain static hosting (Hostinger): `/services.html` serves directly and `/services` 404s unless `.htaccess` rewriting is active.
- **Internal links are RELATIVE `.html` paths** (`./services.html`, `./index.html`, `css/base.css`, `js/main.js`), NOT root-absolute or extensionless. This is required for Hostinger/static hosting (Linux, case-sensitive, no server routing). Do not reintroduce `href="/services"`-style links. `.htaccess` provides optional clean-URL rewriting + `DirectoryIndex` + `ErrorDocument 404` as progressive enhancement, but the site must work without it.
- **Canonical / Open Graph / JSON-LD URLs stay absolute** (`https://www.ojarislabs.com/...`, extensionless) — do not convert those to relative.
- **Check links before shipping:** `npm run check:links` (`scripts/check-links.js`) scans every HTML file and fails on any broken internal link or missing `#fragment` target. Run it after touching links.
- **Shared header/footer are duplicated inline in every page** (no partial/include system, by design for zero-build + SEO). When changing the nav or footer, update it in every `*.html` file, and set `aria-current="page"` on the active nav item per page.
- **Design system lives in `css/variables.css`** (colors, gradient, typography scale via `clamp()`, spacing, radii, shadows, motion). Prefer editing tokens over hard-coding values. CSS load order matters: variables → base → components → animations → responsive.
- **Lint:** `npm run lint` runs stylelint (`css/**/*.css`) and htmlhint (`**/*.html`). Config in `.stylelintrc.json` / `.htmlhintrc` intentionally relaxes compact single-line CSS and hex-length rules.
- **JS is one file** (`js/main.js`), progressive-enhancement, no dependencies: sticky header, mobile nav, IntersectionObserver scroll-reveal + stat count-up, testimonial slider (only transforms on ≤980px; grid on desktop), resources search/filter, and form validation with simulated submit.
- **Placeholder content is deliberate.** Stats, testimonials, case studies, milestone dates and contact details are unverified and flagged with code comments — do not present them as factual without business confirmation. The contact/newsletter forms simulate submission; wire to a real endpoint before production.
