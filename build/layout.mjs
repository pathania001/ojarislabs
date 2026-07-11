/* =====================================================================
   OjarisLabs static site generator — shared layout, head, header, footer.
   Emits plain static HTML (no runtime build on the host).
   ===================================================================== */

// ⚠️ Change SITE_URL to the real production domain before launch.
// Staging is temporary — do NOT let production canonicalize to it.
export const SITE_URL = "https://grey-worm-168584.hostingersite.com";

export const BRAND = {
  name: "OjarisLabs",
  tagline: "Digital engineering & growth partner",
  description:
    "OjarisLabs is a digital engineering and growth company providing web development, custom software, AI automation, eCommerce, mobile apps, UI/UX design, SEO and cloud services.",
  email: "hello@ojarislabs.com",
  securityEmail: "security@ojarislabs.com",
  social: {
    linkedin: "https://www.linkedin.com/company/ojarislabs",
    x: "https://x.com/ojarislabs",
    github: "https://github.com/ojarislabs"
  }
};

/* ---------- inline SVG icons (stroke = currentColor) ---------- */
const P = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  check: '<path d="M5 12l4 4 10-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  play: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M10 9l5 3-5 3z" fill="currentColor"/>',
  web: '<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3 9h18M6.5 7h.01M9 7h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  code: '<path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  cart: '<path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="9" cy="19" r="1.4" fill="currentColor"/><circle cx="17" cy="19" r="1.4" fill="currentColor"/><path d="M6 6L5 3H3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  ai: '<rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M9 9h6v6H9z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  mobile: '<rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M11 18h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  brush: '<path d="M4 20c0-2 1-3 3-3s3 1 3 3-2 2-4 2-2-1-2-2zM10 17l8-8a2 2 0 013 3l-8 8" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  growth: '<path d="M4 19h16M6 19V9m6 10V5m6 14v-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  cloud: '<path d="M7 18a4 4 0 010-8 5 5 0 019.6-1.5A3.5 3.5 0 0118 18H7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  gear: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6 6l1.5 1.5M16.5 16.5L18 18M18 6l-1.5 1.5M7.5 16.5L6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  server: '<rect x="4" y="4" width="16" height="7" rx="2" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="13" width="16" height="7" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M7.5 7.5h.01M7.5 16.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 01-12 0zM12 17v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  search: '<circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="1.8"/><path d="M20 20l-4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.7"/>',
  spark: '<path d="M12 3l2.2 4.6L19 8.2l-3.5 3.4.9 5-4.4-2.4L7.6 16.6l.9-5L5 8.2l4.8-.6L12 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  infinity: '<path d="M8 12a4 4 0 108 0 4 4 0 00-4-4M8 12a4 4 0 11-4 4M16 12a4 4 0 104 4" stroke="currentColor" stroke-width="1.6"/>',
  person: '<circle cx="12" cy="8" r="3.2" stroke="currentColor" stroke-width="1.7"/><path d="M5.5 20a6.5 6.5 0 0113 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  clock: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v4l3 2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  target: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.7"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  doc: '<path d="M6 4h9l5 5v11a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M15 4v5h5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  wrench: '<path d="M15 7a4 4 0 01-5 5L5 17l2 2 5-5a4 4 0 005-5l-2 2-2-2 2-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  pin: '<path d="M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="11" r="2.4" stroke="currentColor" stroke-width="1.6"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  chat: '<path d="M4 5h16v11H8l-4 3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  rocket: '<path d="M5 15c-1 2-1 4-1 4s2 0 4-1M14 5c3-2 6-2 6-2s0 3-2 6c-2 3-6 6-8 7l-3-3c1-2 4-6 7-8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="15" cy="9" r="1.4" fill="currentColor"/>',
  refresh: '<path d="M4 12a8 8 0 0113.7-5.7M20 12A8 8 0 016.3 17.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M17 3v4h-4M7 21v-4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  globe: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M4 12h16M12 4a12 12 0 010 16M12 4a12 12 0 000 16" stroke="currentColor" stroke-width="1.4"/>',
  book: '<path d="M4 5a2 2 0 012-2h6v18H6a2 2 0 01-2-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  compass: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M15 9l-2 4-4 2 2-4 4-2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'
};
export const icon = (name, cls = "") =>
  `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"${cls ? ` class="${cls}"` : ""}>${P[name] || P.check}</svg>`;

const brandMark = (id) =>
  `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><defs><linearGradient id="${id}" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FF8A00"/><stop offset=".35" stop-color="#F72585"/><stop offset=".68" stop-color="#8B3DFF"/><stop offset="1" stop-color="#168BFF"/></linearGradient></defs><path d="M33.5 9.8A17 17 0 1 0 41 24" stroke="url(#${id})" stroke-width="5.2" stroke-linecap="round"/><path d="M13.5 34.5 38 10" stroke="url(#${id})" stroke-width="5.2" stroke-linecap="round"/><circle cx="40.4" cy="8" r="3.3" fill="#FF8A00"/></svg>`;

export const NAV = [
  { key: "home", label: "Home", file: "" },
  { key: "services", label: "Services", file: "services.html" },
  { key: "solutions", label: "Solutions", file: "solutions.html" },
  { key: "about", label: "About Us", file: "about.html" },
  { key: "resources", label: "Resources", file: "resources.html" },
  { key: "careers", label: "Careers", file: "careers.html" }
];

/* base = relative prefix to site root, e.g. "./" (root pages) or "../" (nested) */
export const link = (base, file) => (file === "" ? base : base + file);

export function head({ base, title, description, canonicalPath, ogType = "website", extraJsonLd = [], preloadImage = "assets/images/hero-orbital.svg" }) {
  const canonical = canonicalPath === "" ? SITE_URL + "/" : SITE_URL + "/" + canonicalPath;
  const ogImage = SITE_URL + "/assets/brand/og-default.jpg";
  const preload = preloadImage ? `\n  <link rel="preload" as="image" href="${base}${preloadImage}" />` : "";
  const ld = extraJsonLd
    .map((o) => `  <script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n  </script>`)
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="theme-color" content="#030817" />
  <meta property="og:type" content="${ogType}" />
  <meta property="og:site_name" content="OjarisLabs" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <link rel="icon" href="${base}assets/brand/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="${base}assets/brand/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />${preload}
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${base}css/variables.css" />
  <link rel="stylesheet" href="${base}css/base.css" />
  <link rel="stylesheet" href="${base}css/components.css" />
  <link rel="stylesheet" href="${base}css/animations.css" />
  <link rel="stylesheet" href="${base}css/responsive.css" />
${ld}
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>`;
}

export function header(base, activeKey) {
  const items = NAV.map(
    (n) => `<li><a href="${link(base, n.file)}"${n.key === activeKey ? ' aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");
  return `
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <a class="brand" href="${base}" aria-label="OjarisLabs home">
        ${brandMark("hm")}
        <span class="brand-name">OjarisLabs</span>
      </a>
      <nav class="primary-nav" id="primary-nav" aria-label="Primary">
        <ul>${items}</ul>
      </nav>
      <div class="header-cta">
        <a class="btn btn--primary btn--sm${activeKey === "contact" ? " mobile-visible" : ""}" href="${base}contact.html"${activeKey === "contact" ? ' aria-current="page"' : ""}>Start a Project ${icon("arrow", "arrow")}</a>
        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav"><span></span></button>
      </div>
    </div>
  </header>
  <div class="nav-backdrop" aria-hidden="true"></div>`;
}

const social = (b) => `
        <ul class="socials">
          <li><a href="${BRAND.social.linkedin}" rel="noopener" aria-label="OjarisLabs on LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 105 0 2.5 2.5 0 00-2.52-2.5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.4 8.65 21 11 21 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9z"/></svg></a></li>
          <li><a href="${BRAND.social.x}" rel="noopener" aria-label="OjarisLabs on X"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.7l8-9.2L1 2h7l4.8 6.3zM16.7 20h1.9L7.4 4H5.4z"/></svg></a></li>
          <li><a href="${BRAND.social.github}" rel="noopener" aria-label="OjarisLabs on GitHub"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0012 2z"/></svg></a></li>
        </ul>`;

export function footer(base) {
  const col = (title, links) =>
    `<nav class="footer-col" aria-label="${title}"><h4>${title}</h4><ul>${links
      .map((l) => `<li><a href="${l[1].startsWith("http") ? l[1] : link(base, l[1])}">${l[0]}</a></li>`)
      .join("")}</ul></nav>`;
  return `
  <footer class="site-footer">
    <div class="container container--wide">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="${base}" aria-label="OjarisLabs home">${brandMark("fm")}<span class="brand-name">OjarisLabs</span></a>
          <p>A digital engineering & growth partner — helping businesses design, build, automate and grow through modern technology.</p>
          ${social(base)}
        </div>
        ${col("Company", [["About Us", "about.html"], ["Careers", "careers.html"], ["Contact", "contact.html"], ["Resources", "resources.html"], ["Sitemap", "sitemap.html"]])}
        ${col("Services", [["Web Development", "web-development.html"], ["WordPress", "wordpress-development.html"], ["Shopify & eCommerce", "shopify-development.html"], ["Custom Software", "custom-software-development.html"], ["AI & Automation", "ai-automation.html"], ["Mobile Apps", "mobile-app-development.html"], ["UI/UX Design", "ui-ux-design.html"], ["SEO & Growth", "seo-services.html"], ["All Services", "services.html"]])}
        ${col("Solutions", [["Launch a Digital Product", "solutions.html"], ["Automate Operations", "solutions.html"], ["eCommerce Engine", "solutions.html"], ["Modernize Technology", "solutions.html"], ["Integrate AI", "solutions.html"], ["Grow Organic Visibility", "solutions.html"]])}
        ${col("Resources", [["Resources Hub", "resources.html"], ["WordPress vs Shopify", "resources/wordpress-vs-shopify.html"], ["AI Automation Guide", "resources/ai-automation-business-guide.html"], ["Technical SEO", "resources/technical-seo-foundations.html"], ["Redesign Checklist", "resources/website-redesign-checklist.html"]])}
        ${col("Legal", [["Privacy Policy", "privacy-policy.html"], ["Terms of Service", "terms.html"], ["Security", "security.html"], ["Compliance", "compliance.html"]])}
      </div>
      <div class="footer-bottom">
        <p>&copy; <span id="current-year">2026</span> OjarisLabs. All rights reserved.</p>
        <p><a href="${base}sitemap.html">Sitemap</a> &middot; Built by experienced technology professionals.</p>
      </div>
    </div>
  </footer>
  <script src="${base}js/main.js" defer></script>
</body>
</html>`;
}

/* ---------- reusable content helpers ---------- */
export const arrowLink = (base, file, label) =>
  `<a class="link-arrow" href="${link(base, file)}">${label} ${icon("arrow")}</a>`;

export const heroVisual = (base, src = "hero-orbital.svg", alt = "OjarisLabs abstract brand visual") =>
  `<div class="hero-visual"><img src="${base}assets/images/${src}" width="520" height="520" fetchpriority="high" decoding="async" alt="${alt}" /></div>`;

export const ctaBanner = (base, title, text, btn = "Start a Project", href = "contact.html") => `
    <section class="section bg-white" style="padding-top:0">
      <div class="container">
        <div class="cta-banner reveal">
          <div class="cta-copy"><h2>${title}</h2><p>${text}</p></div>
          <a class="btn btn--dark btn--lg" href="${href.startsWith("#") ? href : link(base, href)}">${btn} ${icon("arrow", "arrow")}</a>
        </div>
      </div>
    </section>`;

export const breadcrumbs = (base, trail) => {
  const items = trail
    .map((t, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${t.label}</li>`
        : `<li><a href="${link(base, t.file)}">${t.label}</a></li>`
    )
    .join("");
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items}</ol></nav>`;
};

export const faqBlock = (faqs) => `
        <div class="faq-list">
          ${faqs
            .map(
              (f) => `<details class="faq-item reveal"><summary><span class="faq-q">${f.q}</span><span class="faq-ico" aria-hidden="true"></span></summary><div class="faq-answer"><p>${f.a}</p></div></details>`
            )
            .join("\n          ")}
        </div>`;

export const faqJsonLd = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
});

export const breadcrumbJsonLd = (trail) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.label,
    item: t.file === "" ? SITE_URL + "/" : SITE_URL + "/" + t.file
  }))
});
