/* =====================================================================
   OjarisLabs — legal pages, HTML sitemap, 404.
   ===================================================================== */
import { SITE_URL, head, header, footer, icon, link, breadcrumbs, breadcrumbJsonLd } from "./layout.mjs";
import { SERVICE_PAGES } from "./data.mjs";
import { ARTICLES } from "./articles.mjs";

const wrap = (base, activeKey, title, description, canonicalPath, jsonLd, main) =>
  head({ base, title, description, canonicalPath, extraJsonLd: jsonLd }) + header(base, activeKey) + main + footer(base);

function legal({ slug, title, description, eyebrow, h1, lead, bodyHtml }) {
  const base = "./";
  const main = `
  <main id="main">
    <section class="hero hero--compact">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: h1 }])}
        <p class="eyebrow">${eyebrow}</p>
        <h1 class="hero-title">${h1}</h1>
        <p class="lead">${lead}</p>
      </div>
    </section>
    <section class="section bg-white">
      <div class="container"><article class="prose">${bodyHtml}</article></div>
    </section>
  </main>`;
  const jsonLd = [breadcrumbJsonLd([{ label: "Home", file: "" }, { label: h1, file: slug + ".html" }])];
  return { file: slug + ".html", html: wrap(base, null, title, description, slug + ".html", jsonLd, main + "\n") };
}

export function renderLegalPages() {
  const note = (t) => `<p class="note">${t}</p>`;
  return [
    legal({
      slug: "privacy-policy", title: "Privacy Policy | OjarisLabs", description: "How OjarisLabs collects, uses and protects your information.",
      eyebrow: "Legal", h1: "Privacy Policy", lead: "How we collect, use and protect your information.",
      bodyHtml: `${note("This is a starting-point privacy policy. Review and finalize with qualified legal counsel before publishing.")}
        <p>OjarisLabs ("we", "us") respects your privacy. This policy explains what information we collect and how we use it when you interact with our website and services.</p>
        <h2>Information We Collect</h2><ul><li>Contact details you provide (name, email, company, website) when you submit a form.</li><li>Project information you choose to share.</li><li>Basic, aggregated usage data to improve our website.</li></ul>
        <h2>How We Use Information</h2><ul><li>To respond to enquiries and provide requested services.</li><li>To improve our website and offerings.</li><li>To send updates you have opted into (unsubscribe anytime).</li></ul>
        <h2>Data Protection</h2><p>We apply appropriate technical and organizational measures to protect your data. We do not sell your personal information.</p>
        <h2>Your Rights</h2><p>You may request access to, correction of, or deletion of your personal data by contacting <a href="mailto:hello@ojarislabs.com">hello@ojarislabs.com</a>.</p>
        <h2>Contact</h2><p>Questions? Email <a href="mailto:hello@ojarislabs.com">hello@ojarislabs.com</a> or use our <a href="./contact.html">contact page</a>.</p>`
    }),
    legal({
      slug: "terms", title: "Terms of Service | OjarisLabs", description: "The terms that govern use of the OjarisLabs website and services.",
      eyebrow: "Legal", h1: "Terms of Service", lead: "The terms that govern your use of our website and services.",
      bodyHtml: `${note("This is a starting-point terms of service. Review and finalize with qualified legal counsel before publishing.")}
        <p>By accessing the OjarisLabs website, you agree to these terms. If you do not agree, please do not use the site.</p>
        <h2>Use of the Site</h2><ul><li>Use the site lawfully and do not disrupt its operation.</li><li>Content is provided for general information and may change without notice.</li></ul>
        <h2>Intellectual Property</h2><p>Branding, content and design on this site are the property of OjarisLabs unless otherwise stated.</p>
        <h2>Services</h2><p>Specific engagements are governed by separate written agreements. Nothing here is a binding offer.</p>
        <h2>Limitation of Liability</h2><p>The site is provided "as is". To the extent permitted by law, OjarisLabs is not liable for indirect or consequential damages arising from use of the site.</p>
        <h2>Contact</h2><p>Questions? Contact <a href="mailto:hello@ojarislabs.com">hello@ojarislabs.com</a>.</p>`
    }),
    legal({
      slug: "security", title: "Security | OjarisLabs", description: "How OjarisLabs approaches security in the way we build and operate software.",
      eyebrow: "Trust", h1: "Security", lead: "Security is considered in how we design, build and operate software.",
      bodyHtml: `${note("This page describes our general practices, not formal certifications.")}
        <p>We apply security-conscious development practices appropriate to each project, including secure configuration, access control, dependency management and deployment hygiene.</p>
        <h2>Practices We Apply</h2><ul><li>Encryption of data in transit and, where appropriate, at rest.</li><li>Least-privilege access and strong authentication.</li><li>Dependency management and timely updates.</li><li>Secure deployment and configuration.</li><li>Monitoring and incident-response readiness proportional to the project.</li></ul>
        <h2>Report a Vulnerability</h2><p>If you believe you've found a security issue, please contact us responsibly at <a href="mailto:security@ojarislabs.com">security@ojarislabs.com</a>.</p>
        <p>We do not currently claim formal certifications (such as SOC 2 or ISO 27001). Where a project requires specific compliance, we work with you to meet those requirements.</p>`
    }),
    legal({
      slug: "compliance", title: "Compliance | OjarisLabs", description: "How OjarisLabs approaches compliance and data governance for client projects.",
      eyebrow: "Trust", h1: "Compliance", lead: "We help clients build solutions that can meet the standards their business depends on.",
      bodyHtml: `${note("This page describes our general approach. Specific certifications, attestations and regulatory frameworks must be confirmed per project.")}
        <p>Compliance is treated as an engineering concern. We build data governance, auditability and access controls into solutions so they can align with the standards relevant to your industry and region.</p>
        <h2>Our Approach</h2><ul><li>Data governance: clear handling, retention and access policies.</li><li>Auditability: logging and traceability across critical workflows.</li><li>Privacy by design: data minimization and purpose limitation.</li><li>Documentation to support your own audits.</li></ul>
        <h2>Frameworks We Work With</h2><p>Applicable frameworks depend on your sector and geography. We commonly help teams align with GDPR-style data-protection principles and control objectives associated with frameworks such as SOC 2 and ISO 27001. We do not claim to be certified under these unless verified for a specific engagement.</p>
        <h2>Security &amp; Compliance Together</h2><p>See our <a href="./security.html">security approach</a> and <a href="./contact.html">contact us</a> to discuss your requirements.</p>`
    })
  ];
}

export function renderSitemapHtml() {
  const base = "./";
  const li = (label, file) => `<li><a href="${link(base, file)}">${label}</a></li>`;
  const serviceLinks = SERVICE_PAGES.map((s) => li(s.eyebrow, s.slug + ".html")).join("");
  const articleLinks = ARTICLES.map((a) => li(a.title, "resources/" + a.slug + ".html")).join("");
  const main = `
  <main id="main">
    <section class="hero hero--compact">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Sitemap" }])}
        <p class="eyebrow">Sitemap</p>
        <h1 class="hero-title">Explore the <span class="gradient-text">Whole Site</span></h1>
        <p class="lead">Every page on OjarisLabs, organized by area.</p>
      </div>
    </section>
    <section class="section bg-white">
      <div class="container">
        <div class="card-grid cols-4">
          <nav class="card" aria-label="Company"><h3>Company</h3><ul class="footer-col-list">${li("Home", "")}${li("About", "about.html")}${li("Careers", "careers.html")}${li("Contact", "contact.html")}${li("Resources", "resources.html")}</ul></nav>
          <nav class="card" aria-label="Solutions"><h3>Solutions</h3><ul class="footer-col-list">${li("Solutions Hub", "solutions.html")}${li("Services Hub", "services.html")}</ul></nav>
          <nav class="card" aria-label="Legal"><h3>Legal</h3><ul class="footer-col-list">${li("Privacy Policy", "privacy-policy.html")}${li("Terms of Service", "terms.html")}${li("Security", "security.html")}${li("Compliance", "compliance.html")}</ul></nav>
          <nav class="card" aria-label="Resources"><h3>Resources</h3><ul class="footer-col-list">${li("Resources Hub", "resources.html")}${articleLinks}</ul></nav>
        </div>
        <div style="margin-top:2rem">
          <nav class="card" aria-label="Services"><h3>Services</h3><ul class="footer-col-list" style="columns:3;gap:1rem">${serviceLinks}</ul></nav>
        </div>
      </div>
    </section>
  </main>`;
  return { file: "sitemap.html", html: wrap(base, null, "Sitemap | OjarisLabs", "Browse all OjarisLabs pages — services, solutions, resources and company information.", "sitemap.html", [], main + "\n") };
}

export function render404() {
  const base = "./";
  const main = `
  <main id="main" class="hero" style="min-height:80vh;display:grid;place-items:center;text-align:center">
    <div class="container">
      <img src="${base}assets/images/hero-orbital.svg" width="240" height="240" decoding="async" alt="OjarisLabs orbital symbol" style="width:200px;margin:0 auto 1.5rem" />
      <p class="eyebrow eyebrow--center">Error 404</p>
      <h1 class="hero-title" style="margin-bottom:1rem">Page <span class="gradient-text">Not Found.</span></h1>
      <p class="lead measure mx-auto" style="margin-bottom:2rem">The page you're looking for doesn't exist or has moved. Let's get you back on track.</p>
      <div class="hero-actions" style="justify-content:center">
        <a class="btn btn--primary btn--lg" href="${base}">Back to Home ${icon("arrow", "arrow")}</a>
        <a class="btn btn--outline-light btn--lg" href="${base}sitemap.html">View Sitemap</a>
      </div>
    </div>
  </main>`;
  // 404 uses a minimal doc (noindex)
  const doc = head({ base, title: "Page Not Found | OjarisLabs", description: "The page you're looking for can't be found.", canonicalPath: "404.html" })
    .replace('<meta name="theme-color"', '<meta name="robots" content="noindex,follow" />\n  <meta name="theme-color"') + header(base, null) + main + footer(base);
  return { file: "404.html", html: doc };
}
