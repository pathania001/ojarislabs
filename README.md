# OjarisLabs Website

Production-ready, fully responsive marketing website for **OjarisLabs** — a technology & digital innovation company (AI, software, cloud, automation, cybersecurity, web, mobile, data and digital transformation).

Built with **semantic HTML5**, **modern CSS** (design-token driven) and **vanilla JavaScript** — no framework, no build step required.

## Tech & architecture

- **No build step.** The repository root is the deployable site. Every page is a standalone semantic HTML document.
- **Clean URLs** via `serve` (`/services`, `/about`, …). The dev server config lives in `serve.json`.
- **Design system** in CSS custom properties (`css/variables.css`) drives colors, typography, spacing, radii, shadows and motion.

```
/                     index.html + page HTML files (services, solutions, about, resources, contact, careers, legal)
/assets/icons         logo.svg, logo-mark.svg, favicon.svg
/assets/images        hero-orbital.svg (brand hero visual)
/css                  variables.css, base.css, components.css, animations.css, responsive.css
/js                   main.js (nav, scroll reveal, count-up, slider, filters, form validation)
robots.txt, sitemap.xml, 404.html
```

## Getting started

```bash
npm install      # install tooling + nodemailer
npm run build    # generate static HTML into repo root + dist/
npm run dev      # static-only preview at http://localhost:3000
npm start        # production Node server (static + POST /api/contact)
```

### Contact form email (Hostinger)

`npm start` runs `node server/index.mjs`, which serves `dist/` and handles `POST /api/contact`.

Configure these environment variables in Hostinger (see `.env.example`):

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `CONTACT_TO_EMAIL=hello@ojarislabs.com`
- `CONTACT_FROM_EMAIL=` (authenticated mailbox allowed by your SMTP provider)

Never put SMTP passwords in frontend JS. For local API testing without SMTP:

```bash
npm run build && CONTACT_DRY_RUN=true npm run dev:server
npm run test:contact
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server (clean URLs) at `http://localhost:3000`. |
| `npm run lint` | Run CSS (stylelint) and HTML (htmlhint) linters. |
| `npm run lint:css` | Lint CSS only. |
| `npm run lint:html` | Lint HTML only. |
| `npm run build` | No-op — this is a static site; deploy the repo root as-is. |

## Pages

`/` `·` `/services` `·` `/solutions` `·` `/about` `·` `/resources` `·` `/contact` `·` `/careers` `·` `/privacy-policy` `·` `/terms` `·` `/security`

## Content requiring business verification

Statistics, testimonials, case studies, milestone dates and contact details are **representative placeholders** and are marked in code comments. Replace them with approved, verified content before publishing. The contact form is wired to a simulated submit handler — connect it to a real endpoint (and anti-spam token) in `js/main.js`.
