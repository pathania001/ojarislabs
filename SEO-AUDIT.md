# SEO-AUDIT

Automated checks: `npm run build:site && npm run lint && npm run audit && npm run check:links`.

## Metadata (every indexable page)
- Unique `<title>` and unique `<meta name="description">` — enforced by audit + link checker.
- Self-referencing canonical via `SITE_URL` (home → `/`, others → `/<file>.html`, articles → `/resources/<slug>.html`).
- Open Graph + Twitter (`og:*`, `twitter:card/title/description/image`) on every page.
- Exactly one `<h1>` per page; duplicate H1s across indexable pages fail the audit.
- Default social image: `assets/brand/og-default.jpg` (1200×630).

## Canonical strategy
- Home canonical is `SITE_URL/` (not `/index.html`).
- Absolute canonical/OG/JSON-LD URLs; relative internal navigation links.
- Audit fails on localhost, Hostinger preview, or non-production hosts.

## Structured data (JSON-LD)
Site-wide on every page (via `build/layout.mjs`):
- Organization (`@id` = `https://ojarislabs.com/#organization`) — name, url, logo, email; `sameAs` only when verified
- WebSite (`@id` = `https://ojarislabs.com/#website`)

| Page | Additional schema |
| --- | --- |
| Home | WebPage, FAQPage |
| Services | WebPage, BreadcrumbList, ItemList, FAQPage |
| Solutions | WebPage, BreadcrumbList, ItemList |
| Resources | CollectionPage, BreadcrumbList |
| Service landing pages (24) | WebPage, BreadcrumbList, Service, FAQPage |
| Articles (6) | WebPage, BreadcrumbList, BlogPosting |
| About | AboutPage, BreadcrumbList |
| Contact | ContactPage, BreadcrumbList |
| Careers / Legal / Sitemap | WebPage, BreadcrumbList |

No `Review`/`AggregateRating`/`LocalBusiness`. FAQPage only where FAQs are visibly rendered. No unverified social `sameAs`.

## Crawl & indexation
- `robots.txt` — allows all, references sitemap.
- `sitemap.xml` — 42 canonical, indexable URLs (no `404.html`, no `/index.html`).
- Audit enforces sitemap ↔ indexable page parity, orphans, and noindex mismatches.
- Custom `404.html` with `noindex,follow`.

## Content uniqueness
- Service process and “why” copy are unique per service (`build/service-extras.mjs`).
- Shared DEFAULT process/why template removed.

## Before publishing new claims
- Re-add social profiles only after URLs are verified.
- Do not invent clients, metrics, testimonials, awards or certifications.
