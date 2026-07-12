# CONTENT-AUDIT

OjarisLabs is a **new brand**. This audit records what was removed as unverified, and what business details still need real confirmation before/around launch.

## Unverified claims REMOVED in this pass

| Claim | Where it was | Replaced with |
| --- | --- | --- |
| "10+ Years of Innovation", "250+ Projects Delivered", "120+ Happy Clients", "25+ Countries Served", "98% Client Retention", "50+ Experts & Developers" | Home, Services, Solutions, About, Resources | Honest capability strip (Full-Stack / Multi-Platform / AI-Ready / Growth-Focused / Long-Term) and capability tiles; no numeric metrics. |
| Company timeline (2014 → 2024) implying years of company history | About | New-brand story: "A New Technology Brand. Built on Real Experience." No fabricated timeline. |
| Fake client logos (Axion, Cloudverge, InnovateX, Lumora, Finexo, Datonix) | Home "Trusted by" | "Built across the modern digital stack" (WordPress, WooCommerce, Shopify, Laravel, React, Node.js, Webflow, AWS) with an explicit note that these are technologies, not clients/partners. |
| Fictional testimonials (Rohan Malhotra, Priya Nair, Daniel Reed) | Home | "Why OjarisLabs" credibility cards (experience, full-stack, global collaboration, partnership). |
| Case-study metrics (+37% forecast accuracy, −40% infra cost, +60% efficiency) presented as "Success Stories" | Solutions | "Common Challenges We Help Solve" + outcome-focused solution categories. No fabricated results. |
| Fabricated resource counters (250+ Blog Articles, 40+ Guides, 30+ Case Studies, 25+ Webinars, 20+ Free Tools) | Resources | Honest category descriptors (Insights / Guides / Engineering / Growth) + 6 real published articles. |
| Fake phone number `+1 (415) 123-4567` and US office address | Contact | Removed. "Global Collaboration — remote-first delivery." Email + form only. |
| Certification claims (SOC 2 / ISO / HIPAA / GDPR "certified") | Security/Compliance | Practices described, not certifications. Explicit statement that no formal certifications are currently claimed. |

## Business details STILL requiring confirmation

- **Contact email** `hello@ojarislabs.com` and **security email** `security@ojarislabs.com` — confirm mailboxes exist and are monitored. (`build/layout.mjs` → `BRAND`.)
- **Phone number** — none published (was fake). Add a real number to the contact page + `BRAND` config once available.
- **Social profiles** — LinkedIn / X / GitHub URLs previously listed in `build/layout.mjs` (`BRAND.social`) returned 404 / unverified during the 2026-07 audit and were removed from the footer and Organization `sameAs`. Re-add only after each profile is confirmed live.
- **Production domain / `SITE_URL`** — currently the temporary staging domain in `build/layout.mjs`. Replace with the real domain and rebuild so canonicals/OG/sitemap are correct.
- **Statistics** — intentionally none. Only introduce numbers that are genuinely verifiable.

## Content to add later (not fabricated now)

- **Real case studies** — the Solutions page uses generic "challenges we solve." Add documented, permissioned client case studies later; only then consider case-study pages and (if genuine) review content.
- **Real testimonials** — add attributable client quotes (with permission) when available; do not invent them.
- **More resource articles** — 6 original articles are published; expand over time via `build/articles.mjs`.
- **Service detail proof** — service pages describe capabilities honestly; add real examples/portfolio as the brand delivers work.

## Structured data honesty
- Organization/WebSite/Service/ItemList/BlogPosting/BreadcrumbList/FAQPage/CollectionPage only.
- No `foundingDate`, `numberOfEmployees`, `award`, `aggregateRating` or `review` markup. FAQPage is used only where the FAQs are visibly on the page.

## Legal
- `privacy-policy.html`, `terms.html`, `security.html`, `compliance.html` are starting-point templates with an on-page note. Have qualified legal counsel review before publishing.
