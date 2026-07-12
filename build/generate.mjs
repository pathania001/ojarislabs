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

/* ---- llms.txt (llmstxt.org: H1 + blockquote + markdown link lists) ---- */
const abs = (path) => (path === "" ? `${SITE_URL}/` : `${SITE_URL}/${path}`);
const shortDesc = (text, max = 110) => {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return (at > 40 ? cut.slice(0, at) : cut).trimEnd() + "…";
};
const mdLink = (title, path, description) =>
  `- [${title}](${abs(path)}): ${shortDesc(description)}`;

const llmsTxt = `# OjarisLabs

> OjarisLabs is a digital engineering and growth company that designs, builds and improves websites, custom software, eCommerce, mobile apps, AI automation, SEO and cloud systems. It is a new brand built by experienced technology professionals.

## Main
${mdLink("Home", "", "Brand overview and how OjarisLabs helps businesses build and grow digital products.")}
${mdLink("Services", "services.html", "Overview of web, software, commerce, AI, mobile, design, SEO and cloud services.")}
${mdLink("Solutions", "solutions.html", "Outcome-focused approaches to common business and technology challenges.")}
${mdLink("About", "about.html", "Company identity, approach and values for a new digital engineering brand.")}
${mdLink("Resources", "resources.html", "Guides and engineering notes for platform choices, AI automation and SEO.")}
${mdLink("Careers", "careers.html", "Open collaboration opportunities for developers, designers and specialists.")}
${mdLink("Contact", "contact.html", "Start a project conversation by form or email at hello@ojarislabs.com.")}

## Services
${SERVICE_PAGES.map((s) => mdLink(s.eyebrow, `${s.slug}.html`, s.intro || s.metaDescription)).join("\n")}

## Resources
${ARTICLES.map((a) => mdLink(a.title, `resources/${a.slug}.html`, a.excerpt || a.metaDescription)).join("\n")}

## Optional
${mdLink("Sitemap", "sitemap.html", "HTML index of all public OjarisLabs pages.")}
${mdLink("Privacy Policy", "privacy-policy.html", "How OjarisLabs collects, uses and protects information.")}
${mdLink("Terms of Service", "terms.html", "Terms that govern use of the OjarisLabs website and services.")}
${mdLink("Security", "security.html", "Security practices applied when building and operating software.")}
${mdLink("Compliance", "compliance.html", "How compliance and data governance are approached on client projects.")}
`;
out("llms.txt", llmsTxt);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
for (const rel of written) copyPublic(rel);
for (const rel of ["assets", "css", "js", ".htaccess", "serve.json"]) copyPublic(rel);

console.log(`Generated ${written.length} files:`);
for (const w of written) console.log("  " + w);
console.log("Prepared dist/ for production serving.");
