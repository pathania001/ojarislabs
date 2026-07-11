/* =====================================================================
   OjarisLabs — page renderers. Each returns a full HTML document string.
   ===================================================================== */
import {
  SITE_URL, BRAND, head, header, footer, icon, link, arrowLink, heroVisual, ctaBanner,
  breadcrumbs, breadcrumbJsonLd, faqBlock, faqJsonLd
} from "./layout.mjs";
import {
  SERVICE_GROUPS, CAPABILITY_STRIP, OJAS, STACK, CHALLENGES, SOLUTION_CATEGORIES,
  HOME_FAQ, SERVICES_FAQ, SERVICE_PAGES, SERVICE_BY_SLUG
} from "./data.mjs";
import { ARTICLES } from "./articles.mjs";

const ICO_COLORS = ["ico-orange", "ico-pink", "ico-purple", "ico-blue", "ico-cyan"];
const cyc = (i) => ICO_COLORS[i % ICO_COLORS.length];
// Fixed accent per service group (brand-consistent, distinct per card)
const ACCENT = { web: "ico-orange", software: "ico-purple", ecommerce: "ico-pink", ai: "ico-blue", mobile: "ico-cyan", design: "ico-pink", seo: "ico-cyan", cloud: "ico-blue" };

const page = ({ base, activeKey, title, description, canonicalPath, jsonLd = [], main, ogType = "website", preloadImage }) =>
  head({ base, title, description, canonicalPath, ogType, extraJsonLd: jsonLd, preloadImage }) + header(base, activeKey) + main + footer(base);

const eyebrow = (t, center) => `<p class="eyebrow${center ? " eyebrow--center" : ""}">${t}</p>`;
const capStrip = () => `
        <div class="cap-strip reveal">
          ${CAPABILITY_STRIP.map(
            (c) => `<div class="cap-item"><span class="cap-ico">${icon(c.icon)}</span><div><h3>${c.title}</h3><p>${c.text}</p></div></div>`
          ).join("\n          ")}
        </div>`;
const stackStrip = () => `
    <section class="section--tight bg-white">
      <div class="container">
        <p class="trusted-label" style="color:var(--text-muted);text-align:center;margin-bottom:1.25rem">Built across the modern digital stack</p>
        <ul class="tech-row reveal">
          ${STACK.map((t) => `<li>${t}</li>`).join("\n          ")}
        </ul>
        <p style="text-align:center;font-size:var(--fs-xs);color:var(--text-muted);margin-top:1rem">Technologies we build with. Logos/brands shown are not clients or official partners.</p>
      </div>
    </section>`;

/* ============================ HOME ============================ */
export function renderHome() {
  const base = "./";
  const caps = [
    { icon: "code", t: "Web & Software" },
    { icon: "ai", t: "AI & Automation" },
    { icon: "cart", t: "eCommerce" },
    { icon: "growth", t: "Digital Growth" }
  ];
  const serviceCards = SERVICE_GROUPS.map(
    (g, i) => `<article class="card reveal" style="--i:${i % 3}">
            <span class="card-icon ${ACCENT[g.key]}">${icon(g.icon)}</span>
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
            <div class="card-foot">${arrowLink(base, g.slug, "Explore")}</div>
          </article>`
  ).join("\n          ");
  const ojas = OJAS.map(
    (o, i) => `<div class="feature-brand reveal" style="--i:${i}"><span class="ico ${cyc(i)}">${icon(o.icon)}</span><h3>${o.title}</h3><p>${o.text}</p></div>`
  ).join("\n          ");
  const credibility = [
    { icon: "clock", t: "Built on Real Experience", d: "Backed by years of hands-on work across web, software, eCommerce and digital platforms." },
    { icon: "code", t: "Full-Stack Engineering", d: "From strategy and UX to development, deployment and optimization." },
    { icon: "globe", t: "Global Collaboration", d: "Remote-first delivery designed for businesses across markets and time zones." },
    { icon: "infinity", t: "Long-Term Partnership", d: "We build maintainable solutions designed to evolve with the business." }
  ];
  const main = `
  <main id="main">
    <section class="hero hero-with-caps">
      <div class="container container--wide">
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow("Digital Engineering &amp; Growth")}
            <h1 class="hero-title">Build Smarter.<br />Move Faster.<br /><span class="gradient-text">Grow Further.</span></h1>
            <p class="lead">OjarisLabs brings together software engineering, web development, AI, automation, eCommerce, design and digital growth to turn ambitious ideas into high-performing digital products.</p>
            <div class="hero-actions">
              <a class="btn btn--primary btn--lg" href="${base}contact.html">Start a Project ${icon("arrow", "arrow")}</a>
              <a class="btn btn--outline-light btn--lg" href="${base}services.html">Explore Our Services</a>
            </div>
          </div>
          <div class="hero-visual">
            <div class="capabilities" aria-label="Core capabilities">
              <img src="${base}assets/images/hero-orbital.svg" width="520" height="520" fetchpriority="high" decoding="async" alt="OjarisLabs orbital energy symbol representing intelligent, connected technology" style="grid-column:1/-1;margin-bottom:.5rem" />
              ${caps.map((c) => `<div class="capability"><span class="ico">${icon(c.icon)}</span><div><h3>${c.t}</h3></div></div>`).join("\n              ")}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${stackStrip()}

    <section class="section bg-white" style="padding-top:0">
      <div class="container">
        <div class="section-head">
          ${eyebrow("What We Do")}
          <h2>Technology that <span class="gradient-text">transforms.</span><br />Solutions that <span class="gradient-text">scale.</span></h2>
        </div>
        <div class="card-grid cols-4">
          ${serviceCards}
        </div>
        <div class="text-center" style="margin-top:2.5rem"><a class="btn btn--outline" href="${base}services.html">View all services ${icon("arrow", "arrow")}</a></div>
      </div>
    </section>

    <section class="section--tight bg-dark">
      <div class="container">${capStrip()}</div>
    </section>

    <section class="section bg-dark" style="padding-top:0">
      <div class="container">
        <div class="section-head section-head--center">
          ${eyebrow("Our Philosophy", true)}
          <h2>The <span class="gradient-text">Ojas</span> in Everything We Build.</h2>
          <p>Ojas represents intelligent energy — the force behind clarity, momentum and meaningful progress. At OjarisLabs, that idea shapes how we approach technology: with focus, curiosity and the drive to turn complex challenges into useful digital experiences.</p>
        </div>
        <div class="card-grid cols-5">
          ${ojas}
        </div>
      </div>
    </section>

    <section class="section bg-light">
      <div class="container">
        <div class="section-head section-head--center">
          ${eyebrow("Why OjarisLabs", true)}
          <h2>Built on Experience.<br /><span class="gradient-text">Focused on What Comes Next.</span></h2>
        </div>
        <div class="card-grid cols-4">
          ${credibility.map((c, i) => `<article class="card reveal" style="--i:${i}"><span class="card-icon ${cyc(i)}">${icon(c.icon)}</span><h3>${c.t}</h3><p>${c.d}</p></article>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container container--narrow">
        <div class="section-head section-head--center">
          ${eyebrow("FAQ", true)}
          <h2>Questions, <span class="gradient-text">answered.</span></h2>
        </div>
        ${faqBlock(HOME_FAQ)}
      </div>
    </section>

    ${ctaBanner(base, "Let's Build Something That Lasts", "Tell us what you're trying to achieve — we'll help you get there.")}
  </main>`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": SITE_URL + "/#org",
      name: "OjarisLabs",
      url: SITE_URL + "/",
      logo: SITE_URL + "/assets/brand/ojarislabs-logo-dark.svg",
      description: BRAND.description,
      sameAs: [BRAND.social.linkedin, BRAND.social.x, BRAND.social.github]
    },
    { "@context": "https://schema.org", "@type": "WebSite", "@id": SITE_URL + "/#website", url: SITE_URL + "/", name: "OjarisLabs", publisher: { "@id": SITE_URL + "/#org" } },
    faqJsonLd(HOME_FAQ)
  ];
  return page({ base, activeKey: "home", title: "OjarisLabs | Web, Software, AI & Digital Engineering", description: "OjarisLabs helps businesses build, automate and grow with web development, custom software, AI, eCommerce, mobile apps, SEO and digital engineering.", canonicalPath: "", jsonLd, main });
}

/* ============================ SERVICES ============================ */
export function renderServices() {
  const base = "./";
  const groups = SERVICE_GROUPS.map(
    (g, i) => `<article class="card reveal" style="--i:${i % 2}">
            <span class="card-icon ${ACCENT[g.key]}">${icon(g.icon)}</span>
            <h3>${g.title}</h3>
            <p>${g.desc}</p>
            <ul class="card-list">${g.capabilities.slice(0, 4).map((c) => `<li>${icon("check")}${c}</li>`).join("")}</ul>
            <div class="card-foot">${arrowLink(base, g.slug, "Explore " + g.title)}</div>
          </article>`
  ).join("\n          ");
  const proc = [
    { icon: "search", no: "01", t: "Discover", d: "We understand your goals, challenges and vision." },
    { icon: "brush", no: "02", t: "Design", d: "We craft the right strategy and solution blueprint." },
    { icon: "code", no: "03", t: "Build", d: "We build with precision, agility and best practices." },
    { icon: "check", no: "04", t: "Deliver", d: "We deploy, optimize and drive measurable impact." }
  ];
  const main = `
  <main id="main">
    <section class="hero">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Services" }])}
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow("Our Services")}
            <h1 class="hero-title">Digital Services Built<br /><span class="gradient-text">Around Your Business</span></h1>
            <p class="lead">From a high-performing website to a custom SaaS platform, AI automation or a complete digital growth strategy, OjarisLabs brings the right capabilities together around your goals.</p>
            <div class="hero-actions">
              <a class="btn btn--primary btn--lg" href="${base}contact.html">Start a Project ${icon("arrow", "arrow")}</a>
              <a class="btn btn--outline-light btn--lg" href="${base}solutions.html">View Solutions</a>
            </div>
          </div>
          ${heroVisual(base, "hero-services.svg", "Connected services ecosystem")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="section-head section-head--center">
          ${eyebrow("What We Do", true)}
          <h2>Comprehensive Capabilities.<br /><span class="gradient-text">One Technology Partner.</span></h2>
          <p>We combine deep technology expertise with business insight to deliver solutions that are secure, scalable and future-ready.</p>
        </div>
        <div class="card-grid cols-4">
          ${groups}
        </div>
      </div>
    </section>

    <section class="section bg-dark">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Our Process", true)}<h2>A Proven Process.<br /><span class="gradient-text">Consistent Results.</span></h2></div>
        <div class="process">
          <span class="line-progress" aria-hidden="true"></span>
          ${proc.map((p, i) => `<div class="process-step reveal" style="--i:${i}"><div class="node"><span class="step-no">${p.no}</span>${icon(p.icon)}</div><h3>${p.t}</h3><p>${p.d}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    ${stackStrip()}

    <section class="section bg-light">
      <div class="container">
        <div class="split" style="align-items:start">
          <div class="reveal">
            ${eyebrow("FAQ")}
            <h2>Questions Before <span class="gradient-text">We Build?</span></h2>
            <p class="lead" style="margin-top:1rem">Clear answers for a smoother start. Still unsure about the right approach? <a href="${base}contact.html" style="color:var(--oj-purple);font-weight:600">Talk to us &rarr;</a></p>
          </div>
          <div>
            ${faqBlock(SERVICES_FAQ)}
          </div>
        </div>
      </div>
    </section>

    ${ctaBanner(base, "Ready to Build Something Extraordinary?", "Let's turn your ideas into powerful, future-ready solutions.")}
  </main>`;
  const jsonLd = [
    breadcrumbJsonLd([{ label: "Home", file: "" }, { label: "Services", file: "services.html" }]),
    { "@context": "https://schema.org", "@type": "ItemList", name: "OjarisLabs Services", itemListElement: SERVICE_GROUPS.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title, url: SITE_URL + "/" + g.slug })) },
    faqJsonLd(SERVICES_FAQ)
  ];
  return page({ base, activeKey: "services", title: "Technology & Digital Services | OjarisLabs", description: "Explore OjarisLabs services across web development, custom software, AI automation, eCommerce, mobile apps, UI/UX design, SEO and cloud.", canonicalPath: "services.html", jsonLd, main, preloadImage: "assets/images/hero-services.svg" });
}

/* ============================ SOLUTIONS ============================ */
export function renderSolutions() {
  const base = "./";
  const challenges = CHALLENGES.map((c, i) => `<article class="card reveal" style="--i:${i % 4}"><span class="card-icon ${cyc(i)}">${icon(c.icon)}</span><h3>${c.title}</h3><p>${c.text}</p></article>`).join("\n          ");
  const cats = SOLUTION_CATEGORIES.map((c, i) => `<article class="card reveal" style="--i:${i % 4}"><span class="card-icon ${cyc(i)}">${icon(c.icon)}</span><h3>${c.title}</h3><p>${c.text}</p></article>`).join("\n          ");
  const values = [
    { icon: "shield", t: "Secure by Design", d: "Security considered at every layer, from the first commit." },
    { icon: "bolt", t: "Future-Ready", d: "Scalable solutions built with modern, maintainable technology." },
    { icon: "target", t: "Business Focused", d: "Aligned to your goals and measurable outcomes." },
    { icon: "person", t: "Experienced Team", d: "Built by professionals with real delivery experience." },
    { icon: "infinity", t: "End-to-End Support", d: "From ideation to launch and long-term iteration." }
  ];
  const main = `
  <main id="main">
    <section class="hero">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Solutions" }])}
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow("Our Solutions")}
            <h1 class="hero-title">Solutions for Real<br /><span class="gradient-text">Business Challenges.</span></h1>
            <p class="lead">We build future-ready solutions that solve complex challenges, optimize operations and accelerate growth — designed around the outcomes that matter to your business.</p>
            <div class="hero-actions">
              <a class="btn btn--primary btn--lg" href="${base}contact.html">Start a Project ${icon("arrow", "arrow")}</a>
              <a class="btn btn--outline-light btn--lg" href="${base}services.html">Explore Services</a>
            </div>
          </div>
          ${heroVisual(base, "hero-solutions.svg", "Transformation from challenge to outcome")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("What We Solve", true)}<h2>Common Challenges <span class="gradient-text">We Help Solve</span></h2><p>Most projects start with a problem, not a product. Here are the challenges businesses bring to us most often.</p></div>
        <div class="card-grid cols-4">
          ${challenges}
        </div>
      </div>
    </section>

    <section class="section bg-light">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Solution Areas", true)}<h2>Outcome-Focused <span class="gradient-text">Solution Categories</span></h2></div>
        <div class="card-grid cols-4">
          ${cats}
        </div>
      </div>
    </section>

    <section class="section bg-dark">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Why Businesses Choose OjarisLabs", true)}<h2>Solutions That Create <span class="gradient-text">Lasting Value</span></h2></div>
        <div class="card-grid cols-5">
          ${values.map((v, i) => `<div class="feature-brand reveal" style="--i:${i}"><span class="ico ${cyc(i)}">${icon(v.icon)}</span><h3 style="text-transform:none;letter-spacing:0">${v.t}</h3><p>${v.d}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    ${ctaBanner(base, "Have a Challenge? Let's Solve It.", "Tell us what you're trying to achieve and we'll map a path forward.")}
  </main>`;
  const jsonLd = [
    breadcrumbJsonLd([{ label: "Home", file: "" }, { label: "Solutions", file: "solutions.html" }]),
    { "@context": "https://schema.org", "@type": "ItemList", name: "OjarisLabs Solutions", itemListElement: SOLUTION_CATEGORIES.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title })) }
  ];
  return page({ base, activeKey: "solutions", title: "Digital Business Solutions | OjarisLabs", description: "Discover how OjarisLabs helps solve real business challenges — launching digital products, automating operations, modernizing systems, building eCommerce and growing visibility.", canonicalPath: "solutions.html", jsonLd, main, preloadImage: "assets/images/hero-solutions.svg" });
}

/* ============================ ABOUT ============================ */
export function renderAbout() {
  const base = "./";
  const tiles = [
    { icon: "web", t: "Web", d: "Modern websites and digital platforms" },
    { icon: "code", t: "Software", d: "Custom applications and SaaS products" },
    { icon: "cart", t: "Commerce", d: "Shopify, WooCommerce and custom eCommerce" },
    { icon: "ai", t: "AI", d: "Intelligent integrations and automation" },
    { icon: "growth", t: "Growth", d: "SEO, performance and conversion" },
    { icon: "cloud", t: "Infrastructure", d: "Cloud, servers, deployment and support" }
  ];
  const values = [
    { icon: "eye", t: "Curiosity", d: "We keep learning and questioning to build better." },
    { icon: "shield", t: "Ownership", d: "We take responsibility for outcomes, not just tasks." },
    { icon: "bolt", t: "Clarity", d: "We simplify complexity and communicate openly." },
    { icon: "spark", t: "Craft", d: "We care about quality in the details." },
    { icon: "person", t: "Partnership", d: "We work with you for the long term." }
  ];
  const diff = [
    { icon: "layers", t: "Broad technical capability", d: "Web, software, commerce, AI, mobile, design, SEO and cloud under one partner." },
    { icon: "target", t: "Business-aware engineering", d: "We connect technical decisions to real outcomes." },
    { icon: "infinity", t: "Flexible engagement", d: "From a single project to an ongoing partnership." },
    { icon: "eye", t: "Transparent communication", d: "Clear scope, honest trade-offs, no jargon walls." },
    { icon: "clock", t: "Long-term thinking", d: "We build maintainable solutions designed to evolve." }
  ];
  const main = `
  <main id="main">
    <section class="hero">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "About" }])}
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow("About OjarisLabs")}
            <h1 class="hero-title">A New Technology Brand.<br /><span class="gradient-text">Built on Real Experience.</span></h1>
            <p class="lead">OjarisLabs was created to bring software engineering, digital experience, AI and growth expertise together under one focused technology brand.</p>
          </div>
          ${heroVisual(base, "hero-about.svg", "Experience converging into one brand")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="split">
          <div class="reveal">
            ${eyebrow("Our Story")}
            <h2>Why OjarisLabs <span class="gradient-text">Exists</span></h2>
            <p style="margin:1.2rem 0">We may be a new name, but the thinking behind OjarisLabs is shaped by years of hands-on work across websites, eCommerce, software platforms, integrations, infrastructure and digital growth.</p>
            <p>Our goal is simple: make technology more useful, more scalable and more connected to real business outcomes — with clear thinking, thoughtful execution and long-term value.</p>
            <div style="margin-top:1.75rem"><a class="btn btn--primary" href="${base}contact.html">Work with us ${icon("arrow", "arrow")}</a></div>
          </div>
          <div class="reveal">
            <div class="card card--dark" style="padding:clamp(1.75rem,1.2rem+2vw,2.5rem)">
              <div class="stat-grid">
                ${tiles.map((t) => `<div class="stat-cell"><span class="card-icon ${cyc(tiles.indexOf(t))}" style="margin-bottom:.6rem">${icon(t.icon)}</span><div class="num" style="font-size:1.05rem;color:var(--text-on-dark)">${t.t}</div><div class="label">${t.d}</div></div>`).join("\n                ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-light">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Our Approach", true)}<h2>Think Clearly. Build Carefully. <span class="gradient-text">Improve Continuously.</span></h2></div>
        <div class="card-grid cols-3">
          <article class="card reveal"><span class="card-icon ico-purple">${icon("eye")}</span><h3>Think Clearly</h3><p>We start by understanding the real problem and the outcome that matters, before writing a line of code.</p></article>
          <article class="card reveal" style="--i:1"><span class="card-icon ico-pink">${icon("code")}</span><h3>Build Carefully</h3><p>We engineer in iterations with clean, maintainable code and clear checkpoints.</p></article>
          <article class="card reveal" style="--i:2"><span class="card-icon ico-cyan">${icon("refresh")}</span><h3>Improve Continuously</h3><p>We measure, learn and keep refining after launch — a product is never truly finished.</p></article>
        </div>
      </div>
    </section>

    <section class="section bg-white" id="values">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Our Values", true)}<h2>What Drives <span class="gradient-text">Our Work</span></h2></div>
        <div class="card-grid cols-5">
          ${values.map((v, i) => `<div class="card reveal" style="--i:${i}"><span class="card-icon ${cyc(i)}">${icon(v.icon)}</span><h3>${v.t}</h3><p>${v.d}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section bg-dark">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("What Makes Us Different", true)}<h2>More Than a Vendor.<br /><span class="gradient-text">A Technology Partner.</span></h2></div>
        <div class="card-grid cols-5">
          ${diff.map((v, i) => `<div class="feature-brand reveal" style="--i:${i}"><span class="ico ${cyc(i)}">${icon(v.icon)}</span><h3 style="text-transform:none;letter-spacing:0">${v.t}</h3><p>${v.d}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    ${ctaBanner(base, "Let's Build Something Together", "Tell us about your project — we'd love to help.")}
  </main>`;
  const jsonLd = [breadcrumbJsonLd([{ label: "Home", file: "" }, { label: "About", file: "about.html" }])];
  return page({ base, activeKey: "about", title: "About OjarisLabs | A New Digital Engineering Brand", description: "OjarisLabs is a new technology brand built on real, hands-on experience across web, software, eCommerce, AI, growth and infrastructure.", canonicalPath: "about.html", jsonLd, main, preloadImage: "assets/images/hero-about.svg" });
}

/* ============================ RESOURCES ============================ */
export function renderResources() {
  const base = "./";
  const cats = [
    { icon: "spark", t: "Insights", d: "Practical thinking from technology and digital work" },
    { icon: "book", t: "Guides", d: "Clear explanations for better decisions" },
    { icon: "code", t: "Engineering", d: "Technical perspectives and implementation insights" },
    { icon: "growth", t: "Growth", d: "SEO, performance and conversion strategies" }
  ];
  const grads = ["media-grad-1", "media-grad-2", "media-grad-3", "media-grad-4", "media-grad-5"];
  const cards = ARTICLES.map((a, i) => {
    const cat = a.category.toLowerCase();
    return `<article class="card resource-card reveal" data-resource data-category="${cat}" data-search="${(a.title + " " + a.excerpt).toLowerCase().replace(/"/g, "")}">
            <a class="resource-media" href="${base}resources/${a.slug}.html" aria-label="${a.title}"><img src="${base}assets/images/thumb-${a.slug}.svg" width="400" height="225" loading="lazy" decoding="async" alt="" /></a>
            <div class="resource-body">
              <span class="resource-cat">${a.category}</span>
              <h3><a href="${base}resources/${a.slug}.html">${a.title}</a></h3>
              <p>${a.excerpt}</p>
              <div class="resource-meta"><span>${icon("calendar")}${new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span><span>${icon("clock")}${a.readingTime}</span></div>
            </div>
          </article>`;
  }).join("\n          ");
  const main = `
  <main id="main">
    <section class="hero">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Resources" }])}
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow("Resources")}
            <h1 class="hero-title">Knowledge That<br /><span class="gradient-text">Empowers Innovation.</span></h1>
            <p class="lead">Practical guides and engineering perspectives to help you make better technology and growth decisions.</p>
            <form class="search-bar" role="search" onsubmit="return false">
              <label for="resource-search" class="visually-hidden">Search resources</label>
              ${icon("search")}
              <input type="search" id="resource-search" placeholder="Search resources..." autocomplete="off" />
            </form>
          </div>
          ${heroVisual(base, "hero-resources.svg", "Digital knowledge library")}
        </div>
        <div class="card-grid cols-4 reveal" style="margin-top:2.5rem">
          ${cats.map((c, i) => `<div class="cap-item" style="border:1px solid var(--border-dark);border-radius:var(--radius);padding:1.15rem"><span class="cap-ico">${icon(c.icon)}</span><div><h3 style="color:var(--text-on-dark)">${c.t}</h3><p style="color:var(--text-on-dark-muted);font-size:var(--fs-sm)">${c.d}</p></div></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="section-head">
          ${eyebrow("Latest")}
          <div class="split" style="align-items:end;gap:1.5rem">
            <h2>Featured <span class="gradient-text">Resources</span></h2>
            <div class="filter-tabs" role="tablist" aria-label="Filter resources by type">
              <button class="filter-tab" type="button" role="tab" aria-selected="true" data-filter="all">All</button>
              <button class="filter-tab" type="button" role="tab" aria-selected="false" data-filter="guides">Guides</button>
              <button class="filter-tab" type="button" role="tab" aria-selected="false" data-filter="engineering">Engineering</button>
            </div>
          </div>
        </div>
        <div class="card-grid cols-3" id="resource-grid">
          ${cards}
        </div>
        <p class="no-results" id="resource-empty" hidden>No resources match your search. Try a different keyword or category.</p>
      </div>
    </section>

    <section class="section bg-white" style="padding-top:0">
      <div class="container">
        <div class="newsletter reveal">
          <div>
            <h2 style="color:var(--text-on-dark)">Stay Ahead with <span class="gradient-text">OjarisLabs</span></h2>
            <p style="color:var(--text-on-dark-soft);margin-top:.5rem">Occasional, practical insights on building and growing digital products. No spam.</p>
          </div>
          <form class="newsletter-form" data-validate data-success="You're subscribed! Watch your inbox for insights." novalidate>
            <div class="field" style="flex:1">
              <label for="news-email" class="visually-hidden">Email address</label>
              <input class="control" type="email" id="news-email" name="email" placeholder="Enter your email" autocomplete="email" required style="border-radius:var(--radius-pill);background:rgba(255,255,255,.05);color:#fff;border-color:var(--border-dark-strong)" />
              <span class="error-msg"></span>
            </div>
            <button class="btn btn--primary" type="submit"><span class="btn-label">Subscribe</span><span class="spinner" aria-hidden="true"></span> ${icon("arrow", "arrow")}</button>
          </form>
          <p class="form-status" role="status" aria-live="polite" style="flex-basis:100%"></p>
        </div>
      </div>
    </section>
  </main>`;
  const jsonLd = [
    breadcrumbJsonLd([{ label: "Home", file: "" }, { label: "Resources", file: "resources.html" }]),
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "OjarisLabs Resources", url: SITE_URL + "/resources.html", description: "Practical guides and engineering perspectives from OjarisLabs.", isPartOf: { "@type": "WebSite", name: "OjarisLabs", url: SITE_URL + "/" } }
  ];
  return page({ base, activeKey: "resources", title: "Insights, Guides & Engineering Resources | OjarisLabs", description: "Practical guides and engineering perspectives on web development, software, AI automation, eCommerce, SEO and digital growth from OjarisLabs.", canonicalPath: "resources.html", jsonLd, main, preloadImage: "assets/images/hero-resources.svg" });
}

/* ============================ CAREERS ============================ */
export function renderCareers() {
  const base = "./";
  const perks = [
    { icon: "spark", t: "Meaningful Work", d: "Ship work that creates real impact for ambitious businesses." },
    { icon: "refresh", t: "Continuous Learning", d: "Grow across modern stacks, tools and disciplines." },
    { icon: "globe", t: "Flexible Collaboration", d: "Remote-first, across locations and time zones." },
    { icon: "shield", t: "Ownership", d: "Own outcomes and see your work through end to end." },
    { icon: "code", t: "Modern Technology", d: "Work with current, well-chosen tools and practices." },
    { icon: "eye", t: "Quality Over Noise", d: "We value thoughtful craft over busywork." }
  ];
  const howWeWork = [
    { icon: "chat", t: "Clear communication", d: "Honest, jargon-free and frequent." },
    { icon: "compass", t: "Thoughtful execution", d: "Understand the problem before building." },
    { icon: "refresh", t: "Continuous improvement", d: "Measure, learn and refine." },
    { icon: "brush", t: "Respect for craft", d: "Details and quality matter." },
    { icon: "globe", t: "Remote collaboration", d: "Async-friendly and outcome-focused." }
  ];
  const main = `
  <main id="main">
    <section class="hero">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Careers" }])}
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow("Careers")}
            <h1 class="hero-title">Build What<br /><span class="gradient-text">Comes Next.</span></h1>
            <p class="lead">OjarisLabs is growing a network of developers, designers, strategists and digital specialists who care about thoughtful work and continuous improvement.</p>
            <div class="hero-actions"><a class="btn btn--primary btn--lg" href="${base}contact.html">Introduce Yourself ${icon("arrow", "arrow")}</a></div>
          </div>
          ${heroVisual(base, "hero-careers.svg", "Collaboration and creative energy")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Why Work With OjarisLabs", true)}<h2>A Culture That <span class="gradient-text">Elevates You</span></h2></div>
        <div class="card-grid cols-3">
          ${perks.map((p, i) => `<div class="card reveal" style="--i:${i % 3}"><span class="card-icon ${cyc(i)}">${icon(p.icon)}</span><h3>${p.t}</h3><p>${p.d}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section bg-dark">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("How We Work", true)}<h2>Principles Over <span class="gradient-text">Process</span></h2></div>
        <div class="card-grid cols-5">
          ${howWeWork.map((p, i) => `<div class="feature-brand reveal" style="--i:${i}"><span class="ico ${cyc(i)}">${icon(p.icon)}</span><h3 style="text-transform:none;letter-spacing:0">${p.t}</h3><p>${p.d}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Current Opportunities", true)}<h2>Open <span class="gradient-text">Roles</span></h2></div>
        <div class="reveal" style="text-align:center">
          <div class="card" style="max-width:680px;margin-inline:auto">
            <span class="card-icon ico-purple" style="margin-inline:auto">${icon("compass")}</span>
            <h3>No open roles right now</h3>
            <p style="margin:.75rem 0 1.25rem">We're always interested in hearing from thoughtful developers, designers and digital specialists. If our approach resonates with you, introduce yourself and we'll keep your details in mind for future opportunities.</p>
            <a class="btn btn--primary" href="${base}contact.html">Introduce Yourself ${icon("arrow", "arrow")}</a>
          </div>
        </div>
      </div>
    </section>

    ${ctaBanner(base, "Like How We Think?", "Introduce yourself — we'd love to hear from you.", "Get in Touch")}
  </main>`;
  const jsonLd = [breadcrumbJsonLd([{ label: "Home", file: "" }, { label: "Careers", file: "careers.html" }])];
  return page({ base, activeKey: "careers", title: "Careers at OjarisLabs | Build What Comes Next", description: "Join a growing network of developers, designers and digital specialists at OjarisLabs. Remote-first, focused on thoughtful work.", canonicalPath: "careers.html", jsonLd, main, preloadImage: "assets/images/hero-careers.svg" });
}

/* ============================ CONTACT ============================ */
export function renderContact() {
  const base = "./";
  const benefits = [
    { icon: "bolt", t: "Fast Response", d: "We reply within one business day." },
    { icon: "chat", t: "Free Consultation", d: "Discuss your project with experienced professionals." },
    { icon: "target", t: "Tailored Approach", d: "Recommendations that fit your goals and budget." },
    { icon: "infinity", t: "Long-Term Partner", d: "Support that continues after launch." }
  ];
  const services = ["Web Development", "WordPress / WooCommerce", "Shopify / eCommerce", "Custom Software / SaaS", "Mobile App", "AI & Automation", "SEO & Digital Growth", "UI/UX & Design", "Cloud / Server Support", "Ongoing Development Support", "Other"];
  const main = `
  <main id="main">
    <section class="hero">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Contact" }])}
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow("Let's Connect")}
            <h1 class="hero-title">Let's Build Something<br /><span class="gradient-text">Extraordinary.</span></h1>
            <p class="lead">Have a project in mind? Tell us what you're trying to achieve and we'll help you find the right approach.</p>
            <div class="hero-badges">
              ${benefits.map((b) => `<div class="hero-badge"><span class="ico">${icon(b.icon)}</span><div><h3>${b.t}</h3><p>${b.d}</p></div></div>`).join("\n              ")}
            </div>
          </div>
          ${heroVisual(base, "hero-contact.svg", "Connected communication signals")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="split" style="align-items:start;grid-template-columns:1.3fr .9fr">
          <div class="reveal">
            ${eyebrow("Tell Us About Your Project")}
            <h2 style="margin-bottom:1.5rem">We're Here to Help You <span class="gradient-text">Succeed</span></h2>
            <form class="form-card" id="contact-form" data-validate data-success="Thanks! Your message has been received. We'll get back to you within one business day." novalidate>
              <div class="form-grid">
                <div class="field"><label for="name">Name <span class="req" aria-hidden="true">*</span></label><input class="control" type="text" id="name" name="name" placeholder="Jane Doe" autocomplete="name" required /><span class="error-msg"></span></div>
                <div class="field"><label for="email">Work Email <span class="req" aria-hidden="true">*</span></label><input class="control" type="email" id="email" name="email" placeholder="jane@company.com" autocomplete="email" required /><span class="error-msg"></span></div>
                <div class="field"><label for="company">Company</label><input class="control" type="text" id="company" name="company" placeholder="Company Inc." autocomplete="organization" /><span class="error-msg"></span></div>
                <div class="field"><label for="website">Website</label><input class="control" type="url" id="website" name="website" placeholder="https://" autocomplete="url" /><span class="error-msg"></span></div>
                <div class="field"><label for="service">Service Needed</label><select class="control" id="service" name="service"><option value="">Select a service</option>${services.map((s) => `<option>${s}</option>`).join("")}</select><span class="error-msg"></span></div>
                <div class="field"><label for="budget">Budget Range</label><select class="control" id="budget" name="budget"><option value="">Select a budget range</option><option>Under $5k</option><option>$5k – $15k</option><option>$15k – $50k</option><option>$50k+</option><option>Not sure yet</option></select><span class="error-msg"></span></div>
                <div class="field"><label for="timeline">Project Timeline</label><select class="control" id="timeline" name="timeline"><option value="">Select a timeline</option><option>ASAP</option><option>1–3 months</option><option>3–6 months</option><option>Just exploring</option></select><span class="error-msg"></span></div>
                <div class="field"><label for="message-heading" class="visually-hidden">spacer</label><span aria-hidden="true"></span></div>
                <div class="field full"><label for="details">Project Details <span class="req" aria-hidden="true">*</span></label><textarea class="control" id="details" name="details" placeholder="Share your goals, timeline and any details that help us understand your project." required></textarea><span class="error-msg"></span></div>
                <div class="field full"><label class="checkbox"><input type="checkbox" id="agree" name="agree" required /><span>I agree to the <a href="${base}privacy-policy.html" style="color:var(--oj-purple)">Privacy Policy</a> and <a href="${base}terms.html" style="color:var(--oj-purple)">Terms of Service</a>.</span></label><span class="error-msg"></span></div>
                <div class="field full" aria-hidden="true" style="position:absolute;left:-9999px" hidden><label for="website-hp">Do not fill</label><input class="control" type="text" id="website-hp" name="website-hp" tabindex="-1" autocomplete="off" /></div>
                <div class="field full"><button class="btn btn--primary btn--lg btn--block" type="submit"><span class="btn-label">Send Message</span><span class="spinner" aria-hidden="true"></span> ${icon("arrow", "arrow")}</button></div>
              </div>
              <p class="form-status" role="status" aria-live="polite" style="margin-top:1rem"></p>
              <p style="text-align:center;font-size:var(--fs-xs);color:var(--text-muted);margin-top:.75rem">Your information is safe with us. We respect your privacy.</p>
            </form>
          </div>
          <div class="reveal">
            ${eyebrow("Other Ways to Reach Us")}
            <div class="contact-info">
              <div class="info-card"><span class="ico">${icon("mail")}</span><div><h3>Email Us</h3><p><a href="mailto:${BRAND.email}">${BRAND.email}</a></p><p>We're here to answer your questions.</p></div></div>
              <div class="info-card"><span class="ico">${icon("globe")}</span><div><h3>Global Collaboration</h3><p>We work with businesses across locations and time zones through a remote-first delivery model.</p></div></div>
              <div class="info-card"><span class="ico">${icon("calendar")}</span><div><h3>Start a Conversation</h3><p>Prefer async? Send project details via the form and we'll propose a time to talk.</p><p><a href="#contact-form" style="color:var(--oj-purple);font-weight:600">Fill the form &rarr;</a></p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${ctaBanner(base, "Ready to Start Your Next Project?", "Let's create something people love to use.", "Start a Project", "#contact-form")}
  </main>`;
  const jsonLd = [breadcrumbJsonLd([{ label: "Home", file: "" }, { label: "Contact", file: "contact.html" }])];
  return page({ base, activeKey: "contact", title: "Contact OjarisLabs | Start a Project", description: "Talk to OjarisLabs about your next web, software, eCommerce, mobile, AI, automation, cloud or SEO project. Remote-first, worldwide.", canonicalPath: "contact.html", jsonLd, main, preloadImage: "assets/images/hero-contact.svg" });
}

/* ============================ SERVICE LANDING PAGE ============================ */
export function renderServicePage(s) {
  const base = "./";
  const related = s.related.map((slug) => SERVICE_BY_SLUG[slug]).filter(Boolean);
  const trail = [{ label: "Home", file: "" }, { label: "Services", file: "services.html" }, { label: s.eyebrow, file: s.slug + ".html" }];
  const main = `
  <main id="main">
    <section class="hero">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Services", file: "services.html" }, { label: s.eyebrow }])}
        <div class="hero-grid">
          <div class="hero-copy hero-animate">
            ${eyebrow(s.eyebrow)}
            <h1 class="hero-title">${s.h1}</h1>
            <p class="lead">${s.intro}</p>
            <div class="hero-actions">
              <a class="btn btn--primary btn--lg" href="${base}contact.html">Start a Project ${icon("arrow", "arrow")}</a>
              <a class="btn btn--outline-light btn--lg" href="${base}services.html">All Services</a>
            </div>
          </div>
          ${heroVisual(base, "hero-services.svg", "OjarisLabs services visual")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="split">
          <div class="reveal">
            ${eyebrow("Problems We Help Solve")}
            <h2>Where this <span class="gradient-text">helps most</span></h2>
            <ul class="check-list" style="margin-top:1.25rem">
              ${s.problems.map((p) => `<li><span class="tick">${icon("check")}</span><div><h3 style="font-weight:500">${p}</h3></div></li>`).join("\n              ")}
            </ul>
          </div>
          <div class="reveal">
            ${eyebrow("Capabilities")}
            <h2>What's <span class="gradient-text">included</span></h2>
            <ul class="card-list" style="margin-top:1.25rem;columns:2;gap:0.75rem">
              ${s.capabilities.map((c) => `<li>${icon("check")}${c}</li>`).join("\n              ")}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-light">
      <div class="container">
        <div class="split" style="align-items:center">
          <div class="reveal">
            ${eyebrow("Technology & Platforms")}
            <h2>Built with proven <span class="gradient-text">tools</span></h2>
            <p class="lead" style="margin-top:1rem">We choose technologies for maintainability and fit — not novelty.</p>
            <div class="topic-tags" style="margin-top:1.25rem">${s.tech.map((t) => `<span style="padding:.6rem 1.15rem;border:1px solid var(--border-light);border-radius:var(--radius-pill);background:#fff;font-weight:500;font-size:.9rem">${t}</span>`).join("")}</div>
          </div>
          <div class="reveal">
            ${eyebrow("Typical Use Cases")}
            <h2>Where it <span class="gradient-text">fits</span></h2>
            <ul class="check-list" style="margin-top:1.25rem">
              ${s.useCases.map((u) => `<li><span class="tick">${icon("check")}</span><div><h3 style="font-weight:500">${u}</h3></div></li>`).join("\n              ")}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-dark">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("How We Work", true)}<h2>A Clear, <span class="gradient-text">Collaborative Process</span></h2></div>
        <div class="process">
          <span class="line-progress" aria-hidden="true"></span>
          ${s.process.map((p, i) => `<div class="process-step reveal" style="--i:${i}"><div class="node"><span class="step-no">${p.no}</span>${icon(p.icon)}</div><h3>${p.title}</h3><p>${p.text}</p></div>`).join("\n          ")}
        </div>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="split">
          <div class="reveal">
            ${eyebrow("Why OjarisLabs")}
            <h2>An experienced, <span class="gradient-text">honest partner</span></h2>
            <ul class="check-list" style="margin-top:1.25rem">
              ${s.why.map((w) => `<li><span class="tick">${icon("check")}</span><div><p style="margin:0">${w}</p></div></li>`).join("\n              ")}
            </ul>
          </div>
          <div class="reveal">
            ${eyebrow("FAQ")}
            <h2>Common <span class="gradient-text">questions</span></h2>
            ${faqBlock(s.faqs)}
          </div>
        </div>
      </div>
    </section>

    <section class="section bg-light">
      <div class="container">
        <div class="section-head section-head--center">${eyebrow("Related Services", true)}<h2>Explore <span class="gradient-text">related work</span></h2></div>
        <div class="card-grid cols-4">
          ${related.map((r, i) => `<a class="card reveal" style="--i:${i}" href="${base}${r.slug}.html"><span class="card-icon ${ACCENT[r.group] || cyc(i)}">${icon(r.icon)}</span><h3>${r.eyebrow}</h3><p>${r.intro.split(".")[0]}.</p><div class="card-foot"><span class="link-arrow">Learn more ${icon("arrow")}</span></div></a>`).join("\n          ")}
        </div>
      </div>
    </section>

    ${ctaBanner(base, "Let's Talk About Your Project", "Tell us what you need — we'll recommend the right approach.")}
  </main>`;
  const jsonLd = [
    breadcrumbJsonLd(trail),
    { "@context": "https://schema.org", "@type": "Service", name: s.eyebrow, serviceType: s.eyebrow, description: s.metaDescription, provider: { "@type": "Organization", name: "OjarisLabs", url: SITE_URL + "/" }, areaServed: "Worldwide", url: SITE_URL + "/" + s.slug + ".html" },
    faqJsonLd(s.faqs)
  ];
  return page({ base, activeKey: "services", title: s.title, description: s.metaDescription, canonicalPath: s.slug + ".html", jsonLd, main, preloadImage: "assets/images/hero-services.svg" });
}

/* ============================ ARTICLE ============================ */
export function renderArticle(a) {
  const base = "../";
  const trail = [{ label: "Home", file: "" }, { label: "Resources", file: "resources.html" }, { label: a.category, file: "resources.html" }, { label: a.title, file: "resources/" + a.slug + ".html" }];
  const toc = a.sections.map((s) => `<li><a href="#${s.id}">${s.heading}</a></li>`).join("");
  const body = a.sections
    .map(
      (s) =>
        `<h2 id="${s.id}">${s.heading}</h2>\n${s.body.map((p) => `<p>${p}</p>`).join("\n")}${s.list ? `\n<ul>${s.list.map((li) => `<li>${li}</li>`).join("")}</ul>` : ""}`
    )
    .join("\n");
  const related = a.related.map((r) => `<a class="card reveal" href="${base}${r[1]}"><span class="card-icon ico-purple">${icon("doc")}</span><h3 style="font-size:1rem">${r[0]}</h3><div class="card-foot"><span class="link-arrow">Read ${icon("arrow")}</span></div></a>`).join("\n          ");
  const main = `
  <main id="main">
    <section class="hero hero--compact">
      <div class="container container--wide">
        ${breadcrumbs(base, [{ label: "Home", file: "" }, { label: "Resources", file: "resources.html" }, { label: a.category, file: "resources.html" }, { label: a.title }])}
        <p class="eyebrow">${a.category}</p>
        <h1 class="hero-title" style="max-width:20ch">${a.title}</h1>
        <p class="article-meta" style="color:var(--text-on-dark-soft)">${icon("person")} OjarisLabs Editorial &middot; <time datetime="${a.date}">${new Date(a.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time> &middot; ${a.readingTime}</p>
      </div>
    </section>

    <section class="section bg-white">
      <div class="container">
        <div class="article-layout">
          <aside class="toc reveal" aria-label="Table of contents">
            <h2>On this page</h2>
            <ul>${toc}</ul>
          </aside>
          <article class="prose reveal">
            <p class="lead">${a.excerpt}</p>
            ${body}
            <hr style="margin:2.5rem 0;border:none;border-top:1px solid var(--border-light)" />
            <p><strong>Talk to OjarisLabs</strong> about applying this to your project — <a href="${base}contact.html">start a conversation</a>.</p>
          </article>
        </div>

        <div style="margin-top:3.5rem">
          <div class="section-head">${eyebrow("Keep Reading")}<h2>Related <span class="gradient-text">resources</span></h2></div>
          <div class="card-grid cols-3">
          ${related}
          </div>
        </div>
      </div>
    </section>

    ${ctaBanner(base, "Have a Project in Mind?", "Let's turn these ideas into something real.")}
  </main>`;
  const jsonLd = [
    breadcrumbJsonLd(trail),
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: a.title,
      description: a.metaDescription,
      datePublished: a.date,
      dateModified: a.updated || a.date,
      author: { "@type": "Organization", name: "OjarisLabs" },
      publisher: { "@type": "Organization", name: "OjarisLabs", logo: { "@type": "ImageObject", url: SITE_URL + "/assets/brand/ojarislabs-logo-dark.svg" } },
      mainEntityOfPage: SITE_URL + "/resources/" + a.slug + ".html",
      image: SITE_URL + "/assets/brand/og-default.jpg"
    }
  ];
  return page({ base, activeKey: "resources", title: a.title + " | OjarisLabs", description: a.metaDescription, canonicalPath: "resources/" + a.slug + ".html", jsonLd, main, ogType: "article", preloadImage: null });
}
