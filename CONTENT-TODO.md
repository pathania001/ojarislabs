# CONTENT-TODO — Business details requiring confirmation

Everything below is currently **placeholder / representative** content in the site. Confirm real values, then update the referenced location. Do **not** publish these as factual until verified.

Central config for many of these values: `data/site-config.js`.

## Statistics (`data/site-config.js` → `stats` / `library`, mirrored in HTML fallbacks)
Shown on Home, Services, Solutions, About and Resources.

| Stat | Placeholder | Where |
| --- | --- | --- |
| Projects Delivered | 250+ | home, services, solutions, about |
| Happy Clients | 120+ | home, services, solutions, about |
| Countries Served | 25+ | home, services, solutions, about |
| Client Retention | 98% | home, services, solutions, about |
| Years of Innovation / Excellence | 10+ | home, about |
| Experts & Developers | 50+ | about |
| Blog Articles / Guides / Case Studies / Webinars / Free Tools | 250+ / 40+ / 30+ / 25+ / 20+ | resources |

> ⚠️ If any statistic cannot be verified, replace it with a verifiable claim or remove it. When you change a value in `data/site-config.js`, mirror it in the matching HTML `class="counter"` fallback so the no-JS value stays accurate.

## Contact details (`data/site-config.js` → `contact`, used on Contact page)
- **Email:** `hello@ojarislabs.com` — confirm this mailbox exists.
- **Security email:** `security@ojarislabs.com` — confirm.
- **Phone:** intentionally removed from the UI (was a fake `+1 (415) 123-4567`). The "Prefer to Talk?" card now routes to the contact form. Add a real number to config + restore a phone card once confirmed.
- **Location/offices:** No physical office is published. Global-presence map shows regions "we actively serve — not fixed office locations." Replace with real offices only if they exist.

## Social profiles (`data/site-config.js` → `social`, used in every footer)
Confirm each URL exists before publishing: LinkedIn, X, Facebook, YouTube, Instagram (`.../ojarislabs`).

## About page — company history / milestone timeline (`about.html`)
Dates and events are illustrative and flagged with a code comment:
- 2014 The Beginning · 2016 Early Growth · 2019 Expanding Horizons · 2022 Global Presence · 2024+ Shaping the Future

Confirm the real founding year and milestones, or replace with verified history.

## Solutions page — case studies (`solutions.html`)
Labeled "Representative examples" and flagged in a comment. Replace with verified client case studies (with permission) or keep clearly labeled as representative:
- AI-Powered Demand Forecasting for Retail (+37% forecast accuracy)
- Cloud Migration for Global Enterprise (−40% infra cost)
- Intelligent Automation for Financial Services (+60% efficiency)

## Resources page — articles/guides/tools (`resources.html`)
Cards are representative content for the CMS integration. Replace titles, dates, images and links with real published resources.

## Legal pages (`privacy-policy.html`, `terms.html`, `security.html`)
Template copy marked with an on-page note. Review and finalize with qualified legal counsel before publishing; confirm security certifications/compliance frameworks on `security.html`.

## Removed unverified claims (no action needed unless you have real data)
- Removed "Trusted by innovative companies worldwide" + fake company logos (Axion, Cloudverge, InnovateX, Lumora, Finexo, Datonix) → replaced with a "Built with technologies businesses trust" section.
- Removed fictional testimonials (Rohan Malhotra, Priya Nair, Daniel Reed) → replaced with a factual "Why OjarisLabs" credibility section. Add real, attributable testimonials (with permission) when available.
