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

Production page: https://ojarislabs.com/contact.html  
API endpoint: `POST /api/contact`  
Start command: `npm start` (runs `node server/index.mjs` after `prestart` build)  
Build command: `npm run build`

The server sends enquiries to **hello@ojarislabs.com** over Hostinger SMTP.

Set these environment variables in the Hostinger Node.js panel (see `.env.example`):

```
PORT=3000
HOST=0.0.0.0
CONTACT_TO_EMAIL=hello@ojarislabs.com
CONTACT_FROM_EMAIL=hello@ojarislabs.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=hello@ojarislabs.com
SMTP_PASS=<set securely in Hostinger — never commit>
```

Notes:

- Port **465** uses implicit TLS/SSL → `SMTP_SECURE=true`.
- **From** is the authenticated mailbox (`OjarisLabs Website <hello@ojarislabs.com>`).
- **Reply-To** is the visitor’s email so mailbox “Reply” goes to them.
- Do **not** put the visitor’s address in From (SPF/DMARC).
- IMAP/POP are not used by the website — only SMTP for sending.
- Never put `SMTP_PASS` in frontend JS, HTML, README, or Git.
- Leave `CONTACT_DRY_RUN` unset/false in production. Use it only for local tests:

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
