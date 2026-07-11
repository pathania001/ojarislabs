# SEO-AUDIT

Automated checks run via `npm run check:links`; the rest verified during the build.

## Metadata (every indexable page)
- ✅ Unique `<title>` and unique `<meta name="description">` — enforced by the link checker (fails on duplicates).
- ✅ Self-referencing canonical via `SITE_URL` (home → `/`, others → `/<file>.html`, articles → `/resources/<slug>.html`).
- ✅ Open Graph (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`) and Twitter summary_large_image on every page.
- ✅ Exactly one `<h1>` per page (checker enforced); logical H2/H3 structure.
- ✅ Default OG image: `assets/brand/og-default.jpg` (1200×630).

## Canonical strategy
- Single canonical format. Home canonical is `SITE_URL/` (not `/index.html`); Home is linked as `./` and is **not** listed as `/index.html` anywhere or in the sitemap.
- Absolute canonical/OG/JSON-LD URLs; relative internal navigation links.

## Structured data (JSON-LD)
| Page | Schema |
| --- | --- |
| Home | Organization, WebSite, FAQPage |
| Services | BreadcrumbList, ItemList, FAQPage |
| Solutions | BreadcrumbList, ItemList |
| Resources | BreadcrumbList, CollectionPage |
| Service landing pages (24) | BreadcrumbList, Service, FAQPage |
| Articles (6) | BreadcrumbList, BlogPosting |
| About / Careers / Contact / Legal | BreadcrumbList |

No `Review`/`AggregateRating`, no `foundingDate`/`numberOfEmployees`. FAQPage only where FAQs are visibly rendered.

## Crawl & indexation
- ✅ `robots.txt` — allows all, references sitemap; does not block CSS/JS/images.
- ✅ `sitemap.xml` — 42 canonical, indexable, 200-status URLs only (no `404.html`, no `/index.html`, no duplicates). `lastmod` set at build time.
- ✅ HTML sitemap (`sitemap.html`) linked in the footer; helps users and crawlers reach every page.
- ✅ Custom `404.html` with `noindex,follow`.
- ✅ `llms.txt` for AI/LLM discoverability (concise, factual).

## Internal linking
- Contextual links beyond header/footer: service pages cross-link to related services; articles link to relevant services and other articles; footer surfaces key service landing pages. Reduces orphan pages.

## Performance-related SEO
- Hero LCP image preloaded with `fetchpriority="high"` + `decoding="async"`; below-the-fold images lazy-loaded.
- Explicit image dimensions (no CLS); fonts `display=swap`; lean single JS file, deferred.

## AI search readiness
- Clear entity naming ("OjarisLabs"), explicit service descriptions, semantic HTML, visible FAQs, answer-focused article content, structured data and `llms.txt`.

## Before production launch
- Set `SITE_URL` in `build/layout.mjs` to the real domain and rebuild so canonicals/OG/sitemap/robots/llms point to production, not staging.
