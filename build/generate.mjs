/* =====================================================================
   OjarisLabs — build entrypoint. Renders committed static HTML at the
   repository root and prepares a clean dist/ directory for Node hosting.
   Run: npm run build:site
   ===================================================================== */
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "./layout.mjs";
import { SERVICE_PAGES } from "./data.mjs";
import { ARTICLES } from "./articles.mjs";
import {
  renderHome, renderServices, renderSolutions, renderAbout, renderResources,
  renderCareers, renderContact, renderServicePage, renderArticle
} from "./render.mjs";
import { renderLegalPages, renderSitemapHtml, render404 } from "./misc.mjs";

const root = process.cwd();
const dist = join(root, "dist");
const write = (rel, html) => {
  const full = join(root, rel);
  mkdirSync(join(full, ".."), { recursive: true });
  writeFileSync(full, html.trimStart() + "\n");
};
const copyPublic = (rel) => {
  const from = join(root, rel);
  const to = join(dist, rel);
  if (!existsSync(from)) return;
  mkdirSync(join(to, ".."), { recursive: true });
  cpSync(from, to, { recursive: true });
};

const written = [];
const out = (rel, html) => { write(rel, html); written.push(rel); };

/* ---- main pages ---- */
out("index.html", renderHome());
out("services.html", renderServices());
out("solutions.html", renderSolutions());
out("about.html", renderAbout());
out("resources.html", renderResources());
out("careers.html", renderCareers());
out("contact.html", renderContact());

/* ---- service landing pages ---- */
for (const s of SERVICE_PAGES) out(`${s.slug}.html`, renderServicePage(s));

/* ---- articles ---- */
for (const a of ARTICLES) out(`resources/${a.slug}.html`, renderArticle(a));

/* ---- legal + sitemap.html + 404 ---- */
for (const p of renderLegalPages()) out(p.file, p.html);
const sm = renderSitemapHtml();
out(sm.file, sm.html);
const nf = render404();
out(nf.file, nf.html);

/* ---- sitemap.xml (canonical, indexable, 200 pages only; no 404) ---- */
const xmlUrls = [
  "", "services.html", "solutions.html", "about.html", "resources.html", "careers.html", "contact.html",
  ...SERVICE_PAGES.map((s) => `${s.slug}.html`),
  ...ARTICLES.map((a) => `resources/${a.slug}.html`),
  "privacy-policy.html", "terms.html", "security.html", "compliance.html", "sitemap.html"
];
const today = new Date().toISOString().slice(0, 10);
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls
  .map((u) => `  <url><loc>${u === "" ? SITE_URL + "/" : SITE_URL + "/" + u}</loc><lastmod>${today}</lastmod></url>`)
  .join("\n")}
</urlset>
`;
out("sitemap.xml", sitemapXml);

/* ---- robots.txt ---- */
out(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
);

/* ---- llms.txt ---- */
out(
  "llms.txt",
  `# OjarisLabs

OjarisLabs is a digital engineering and growth company providing web development, custom software, AI automation, eCommerce, mobile app development, UI/UX design, SEO, cloud and technical support services. OjarisLabs is a new brand built by experienced technology professionals.

## Core Services
- Web Development (WordPress, WooCommerce, Webflow, Squarespace, custom)
- Software & SaaS Development (PHP, Laravel, JavaScript, APIs)
- eCommerce (Shopify, WooCommerce, custom)
- AI Integration & Automation (assistants, workflow & CRM automation, GoHighLevel)
- Mobile App Development (React Native, Flutter, iOS, Android)
- UI/UX & Creative Design
- SEO, Technical SEO & AI Search Optimization
- Cloud, DevOps, Server Management & Maintenance

## Important Pages
- Home: ${SITE_URL}/
- Services: ${SITE_URL}/services.html
- Solutions: ${SITE_URL}/solutions.html
- About: ${SITE_URL}/about.html
- Resources: ${SITE_URL}/resources.html
- Contact: ${SITE_URL}/contact.html
- Sitemap: ${SITE_URL}/sitemap.html

## Notes
- OjarisLabs is a new brand; we do not publish fabricated client counts, case-study metrics or company history.
- Remote-first delivery, working with businesses across locations and time zones.
- Contact: hello@ojarislabs.com
`
);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const rel of written) copyPublic(rel);
for (const rel of ["assets", "css", "js", ".htaccess", "serve.json"]) copyPublic(rel);

console.log(`Generated ${written.length} files:`);
for (const w of written) console.log("  " + w);
console.log("Prepared dist/ for production serving.");
