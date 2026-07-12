/* =====================================================================
   OjarisLabs — content data model (services, solutions, FAQs).
   Truthful, new-brand positioning. No fabricated clients/stats/history.
   ===================================================================== */
import { SERVICE_EXTRAS } from "./service-extras.mjs";

/* ---------- Homepage 8 service groups ---------- */
export const SERVICE_GROUPS = [
  {
    key: "web", icon: "web", slug: "web-development.html", title: "Web Development",
    desc: "High-performance websites and web platforms engineered for speed, usability and growth.",
    capabilities: ["Custom Website Development", "WordPress Development", "WooCommerce", "Webflow", "Squarespace", "CMS Development", "Website Redesign", "Performance Optimization"]
  },
  {
    key: "software", icon: "code", slug: "custom-software-development.html", title: "Software & SaaS Development",
    desc: "Custom software and SaaS products built around real business workflows and scalable architecture.",
    capabilities: ["PHP Development", "Laravel Development", "JavaScript Development", "Custom Web Applications", "SaaS Platforms", "API Development", "Third-Party Integrations", "Legacy Modernization"]
  },
  {
    key: "ecommerce", icon: "cart", slug: "shopify-development.html", title: "eCommerce",
    desc: "Conversion-focused commerce experiences built to sell, scale and simplify operations.",
    capabilities: ["Shopify Development", "WooCommerce Development", "Custom eCommerce", "Store Migration", "Checkout Optimization", "Subscription Commerce", "Payment Integration", "Marketplace Integration"]
  },
  {
    key: "ai", icon: "ai", slug: "ai-automation.html", title: "AI & Automation",
    desc: "Practical AI and automation solutions designed to reduce manual work and improve customer experiences.",
    capabilities: ["AI Integration", "ChatGPT Integration", "AI Chatbots", "AI Agents", "Workflow Automation", "Business Process Automation", "CRM Automation", "GoHighLevel Automation"]
  },
  {
    key: "mobile", icon: "mobile", slug: "mobile-app-development.html", title: "Mobile App Development",
    desc: "Intuitive mobile experiences designed for performance, engagement and long-term maintainability.",
    capabilities: ["iOS Apps", "Android Apps", "Cross-Platform Apps", "Flutter", "React Native", "API Integration", "App UI/UX", "App Maintenance"]
  },
  {
    key: "design", icon: "brush", slug: "ui-ux-design.html", title: "UI/UX & Creative",
    desc: "Design systems and digital experiences that make complex products feel clear, useful and memorable.",
    capabilities: ["UI/UX Design", "Figma Design", "Figma to HTML", "PSD to HTML", "Landing Page Design", "Brand Identity", "Graphic Design", "Design Systems"]
  },
  {
    key: "seo", icon: "growth", slug: "seo-services.html", title: "SEO & Digital Growth",
    desc: "Technical and content-led growth strategies built for traditional search and AI-powered discovery.",
    capabilities: ["Technical SEO", "On-Page SEO", "Local SEO", "eCommerce SEO", "Content Strategy", "AEO", "AI Search Optimization", "Conversion Optimization"]
  },
  {
    key: "cloud", icon: "cloud", slug: "cloud-devops.html", title: "Cloud, DevOps & Support",
    desc: "Reliable infrastructure, deployment and ongoing technical support for business-critical digital systems.",
    capabilities: ["Server Management", "Cloud Hosting", "AWS", "Deployment", "DNS & Email Configuration", "Website Migration", "Security Hardening", "Maintenance & Support"]
  }
];

/* ---------- Honest capability strip (replaces fake stats) ---------- */
export const CAPABILITY_STRIP = [
  { icon: "layers", title: "Full-Stack", text: "Strategy to deployment" },
  { icon: "globe", title: "Multi-Platform", text: "Web, commerce, software & mobile" },
  { icon: "ai", title: "AI-Ready", text: "Automation built into modern workflows" },
  { icon: "growth", title: "Growth-Focused", text: "Technology connected to business outcomes" },
  { icon: "infinity", title: "Long-Term", text: "Built to evolve, not just launch" }
];

/* ---------- Ojas pillars ---------- */
export const OJAS = [
  { icon: "bolt", title: "Energy", text: "We bring momentum to ambitious ideas." },
  { icon: "eye", title: "Clarity", text: "We simplify complexity and focus on what matters." },
  { icon: "spark", title: "Innovation", text: "We explore better ways to build and solve." },
  { icon: "growth", title: "Growth", text: "We create technology designed to move businesses forward." },
  { icon: "infinity", title: "Transformation", text: "We turn ideas, systems and opportunities into measurable progress." }
];

/* ---------- Modern stack strip ---------- */
export const STACK = ["WordPress", "WooCommerce", "Shopify", "Laravel", "React", "Node.js", "Webflow", "AWS"];

/* ---------- Solutions ---------- */
export const CHALLENGES = [
  { icon: "refresh", title: "Modernize an Outdated Website", text: "Rebuild dated sites into fast, accessible, easy-to-manage platforms." },
  { icon: "rocket", title: "Build a New Digital Product", text: "Take an idea from concept to a working, scalable product." },
  { icon: "cart", title: "Launch or Improve an Online Store", text: "Create commerce experiences that convert and are simple to run." },
  { icon: "gear", title: "Automate Repetitive Work", text: "Remove manual steps with dependable, well-scoped automation." },
  { icon: "plug", title: "Connect Disconnected Systems", text: "Integrate tools, data and APIs so information flows cleanly." },
  { icon: "search", title: "Improve Search Visibility", text: "Strengthen technical foundations and content for discoverability." },
  { icon: "server", title: "Scale Infrastructure", text: "Move to resilient hosting and deployment that grows with demand." },
  { icon: "spark", title: "Create a Better Customer Experience", text: "Design clearer, faster journeys across web and product." }
];

export const SOLUTION_CATEGORIES = [
  { icon: "rocket", title: "Launch a Digital Product", text: "Discovery, design and engineering to ship a product people can actually use." },
  { icon: "refresh", title: "Modernize Existing Technology", text: "Replatform legacy systems and pay down technical debt without disruption." },
  { icon: "gear", title: "Automate Business Operations", text: "Map workflows and automate the repetitive work that slows teams down." },
  { icon: "cart", title: "Build an eCommerce Engine", text: "Storefronts, checkout and back-office integrations that scale with sales." },
  { icon: "growth", title: "Improve Digital Performance", text: "Speed, accessibility and conversion improvements grounded in data." },
  { icon: "server", title: "Scale Infrastructure", text: "Cloud, deployment and reliability engineering for critical systems." },
  { icon: "ai", title: "Integrate AI", text: "Practical, well-scoped AI features connected to real workflows." },
  { icon: "search", title: "Grow Organic Visibility", text: "Technical SEO, content and AI-search readiness for long-term reach." }
];

/* ---------- Homepage FAQ ---------- */
export const HOME_FAQ = [
  { q: "What does OjarisLabs do?", a: "OjarisLabs is a digital engineering and growth partner. We design, build, automate and optimize websites, custom software, eCommerce stores, mobile apps and AI-powered workflows — connecting technology to real business outcomes." },
  { q: "What types of businesses do you work with?", a: "We work with startups, growing businesses and established teams across industries — from a first website or online store to a custom SaaS platform or an internal automation project." },
  { q: "Can OjarisLabs handle both design and development?", a: "Yes. We cover UI/UX and brand design through to front-end and back-end engineering, so strategy, design and build stay aligned end to end." },
  { q: "Do you provide ongoing support after launch?", a: "Yes. We offer maintenance, monitoring, performance work and iterative improvements so your product keeps evolving after go-live." },
  { q: "Can you work with an existing website or software product?", a: "Absolutely. We regularly take over, audit, extend and modernize existing codebases, sites and stores rather than always starting from scratch." },
  { q: "Do you provide AI and automation services?", a: "Yes — practical, well-scoped AI integrations and workflow automation such as assistants, document processing, lead qualification and CRM automation, connected through APIs to your existing tools." },
  { q: "Can you work with remote and international clients?", a: "Yes. We operate remote-first and collaborate with businesses across locations and time zones." },
  { q: "How do we start a project?", a: "Start with a short message about your goals through our contact page. We'll reply within one business day, ask a few clarifying questions and propose a practical way forward — no obligation." }
];

export const SERVICES_FAQ = [
  { q: "Which technologies and platforms do you work with?", a: "Across web and commerce we work with WordPress, WooCommerce, Shopify, Webflow and custom stacks; on software with PHP/Laravel, JavaScript/Node.js and React; on mobile with React Native and Flutter; and on infrastructure with AWS and modern deployment tooling." },
  { q: "Do you build custom solutions or use existing platforms?", a: "Both. We recommend the approach that best fits your goals, timeline and budget — an established platform when it accelerates you, or custom engineering when your workflows need it." },
  { q: "Can you take over an existing development project?", a: "Yes. We audit the current codebase, document what exists, stabilize it and then continue delivery with clear communication." },
  { q: "Do you provide ongoing maintenance?", a: "Yes — updates, security hardening, monitoring, performance tuning and feature work under flexible ongoing support arrangements." },
  { q: "How do you choose the right technology stack?", a: "We start from your requirements, team, integrations and scale expectations, then choose proven tools that keep the solution maintainable and cost-effective over time." },
  { q: "Can you integrate third-party APIs and business tools?", a: "Yes. Payments, CRMs, ERPs, marketing platforms, analytics and internal systems — we design reliable integrations with sensible error handling." }
];

/* ============================================================
   24 service landing pages (unique, service-specific content)
   Process + why copy lives in service-extras.mjs and is merged below.
   ============================================================ */
const S = (o) => ({ ...o });

export const SERVICE_PAGES = [
  S({
    slug: "web-development", group: "web", icon: "web",
    title: "Web Development Services | OjarisLabs",
    h1: "Web Development Built for Performance and Growth",
    metaDescription: "Custom web development from OjarisLabs — fast, accessible, SEO-ready websites and web platforms on WordPress, Webflow, custom stacks and more.",
    eyebrow: "Web Development",
    intro: "We design and build websites and web platforms that are fast, accessible and easy to manage — engineered around your users and your growth goals rather than a rigid template.",
    problems: ["A slow, dated site that is hard to update", "Poor mobile experience and accessibility gaps", "A design that no longer reflects the brand", "A site that does not support marketing or SEO"],
    capabilities: ["Custom website development", "WordPress & CMS development", "Webflow & Squarespace builds", "Website redesign & replatforming", "Responsive, accessible front-end", "Core Web Vitals & performance optimization", "Analytics & marketing integrations", "Ongoing maintenance & iteration"],
    tech: ["WordPress", "Webflow", "React", "Node.js", "HTML/CSS", "PHP"],
    useCases: ["Marketing sites that need speed and easy editing", "Redesigns that modernize an outdated presence", "Multi-page platforms with custom functionality"],
    faqs: [
      { q: "Do you build custom sites or use a CMS?", a: "Both — we recommend a CMS like WordPress or Webflow when it speeds you up, and custom builds when your requirements need them." },
      { q: "Can you redesign my existing website?", a: "Yes. We audit the current site, preserve what works, and modernize design, performance and structure." },
      { q: "Will the site be fast and accessible?", a: "Performance and WCAG-minded accessibility are part of how we build, not an afterthought." },
      { q: "Do you help with SEO?", a: "We build SEO-ready foundations and can pair this with our technical SEO service." }
    ],
    related: ["wordpress-development", "webflow-development", "seo-services", "website-maintenance"]
  }),
  S({
    slug: "wordpress-development", group: "web", icon: "web",
    title: "WordPress Development Services | OjarisLabs",
    h1: "Custom WordPress Sites Your Team Can Actually Run",
    metaDescription: "Custom WordPress development — themes, ACF, WooCommerce, Elementor, plugin development, speed optimization, security and migration by OjarisLabs.",
    eyebrow: "WordPress Development",
    intro: "We build custom WordPress websites that are fast, secure and genuinely easy for your team to manage — from bespoke themes to WooCommerce stores and custom plugins.",
    problems: ["A bloated theme that is slow and hard to edit", "Plugin sprawl causing conflicts and security risk", "Content editors who can't safely make changes", "A store that struggles under load"],
    capabilities: ["Custom WordPress development", "Custom theme development", "Elementor, WPBakery, Divi & Gutenberg", "Advanced Custom Fields (ACF)", "WooCommerce stores", "Custom plugin development", "REST API integrations", "Speed & security optimization", "Migration & ongoing maintenance"],
    tech: ["WordPress", "WooCommerce", "PHP", "ACF", "Elementor", "MySQL"],
    useCases: ["Editor-friendly marketing sites with custom blocks", "WooCommerce stores with custom workflows", "Migrations from other platforms to WordPress"],
    faqs: [
      { q: "Can you build a custom WordPress website?", a: "Yes — bespoke themes and blocks tailored to your brand and content model, not a generic template." },
      { q: "Can you redesign an existing WordPress site?", a: "Yes. We modernize design, clean up plugins and improve speed and security while preserving your content." },
      { q: "Do you work with Elementor and WPBakery?", a: "Yes — we work with Elementor, WPBakery, Divi and native Gutenberg, and can migrate between them." },
      { q: "Can you improve WordPress speed?", a: "Yes — caching, asset optimization, database cleanup and hosting recommendations to improve Core Web Vitals." },
      { q: "Can you migrate WordPress websites?", a: "Yes — we handle content, media, redirects and testing for safe migrations." },
      { q: "Do you provide ongoing WordPress support?", a: "Yes — updates, backups, security monitoring and iterative improvements under a maintenance plan." }
    ],
    related: ["woocommerce-development", "web-development", "seo-services", "website-maintenance"]
  }),
  S({
    slug: "woocommerce-development", group: "ecommerce", icon: "cart",
    title: "WooCommerce Development Services | OjarisLabs",
    h1: "WooCommerce Development for Stores That Scale",
    metaDescription: "WooCommerce development by OjarisLabs — custom stores, checkout optimization, subscriptions, payment and marketplace integrations, migration and support.",
    eyebrow: "WooCommerce Development",
    intro: "We build and optimize WooCommerce stores that are reliable to run and built to convert — from custom product experiences to checkout, subscriptions and integrations.",
    problems: ["A store that slows down as the catalog grows", "Clunky checkout that loses sales", "Manual order and inventory processes", "Disconnected payment or shipping tools"],
    capabilities: ["Custom WooCommerce development", "Product & catalog customization", "Checkout & conversion optimization", "Subscriptions & recurring billing", "Payment gateway integration", "Shipping & tax configuration", "Store migration", "Performance & maintenance"],
    tech: ["WooCommerce", "WordPress", "PHP", "Stripe", "PayPal", "MySQL"],
    useCases: ["Growing catalogs that need performance work", "Subscription and membership commerce", "Migrations to WooCommerce from other carts"],
    faqs: [
      { q: "Can you customize the WooCommerce checkout?", a: "Yes — we streamline and customize checkout to reduce friction while keeping it secure." },
      { q: "Do you handle subscriptions and memberships?", a: "Yes — recurring billing, memberships and gated content are common requests." },
      { q: "Can you migrate my store to WooCommerce?", a: "Yes — products, customers, orders and redirects with careful testing." }
    ],
    related: ["wordpress-development", "shopify-development", "seo-services", "website-maintenance"]
  }),
  S({
    slug: "shopify-development", group: "ecommerce", icon: "cart",
    title: "Shopify Development Services | OjarisLabs",
    h1: "Shopify Development for Stores Built to Convert and Scale",
    metaDescription: "Shopify development by OjarisLabs — Shopify 2.0 themes, custom sections, app integrations, migration, speed and conversion optimization, and maintenance.",
    eyebrow: "Shopify Development",
    intro: "We build Shopify stores that look sharp, load fast and are easy to merchandise — using Shopify 2.0 theme architecture, custom sections and reliable integrations.",
    problems: ["A theme that limits merchandising and layout", "Slow storefront hurting conversion", "Too many apps creating cost and clutter", "A migration that feels risky"],
    capabilities: ["Shopify store development", "Shopify 2.0 theme development", "Custom sections & blocks", "App integration & evaluation", "Store migration", "Checkout & conversion optimization", "Speed optimization", "Ongoing Shopify maintenance"],
    tech: ["Shopify", "Liquid", "Shopify 2.0", "JavaScript", "REST/GraphQL API"],
    useCases: ["New brand storefronts", "Theme rebuilds for flexibility", "Replatforming to Shopify"],
    faqs: [
      { q: "Do you build custom Shopify themes?", a: "Yes — Shopify 2.0 themes with reusable custom sections your team can arrange without code." },
      { q: "Can you migrate my store to Shopify?", a: "Yes — products, customers, content and redirects with testing to protect SEO." },
      { q: "Can you improve Shopify speed and conversion?", a: "Yes — theme performance, app auditing and checkout/UX improvements informed by data." }
    ],
    related: ["woocommerce-development", "ui-ux-design", "seo-services", "website-maintenance"]
  }),
  S({
    slug: "webflow-development", group: "web", icon: "web",
    title: "Webflow Development Services | OjarisLabs",
    h1: "Webflow Development for Fast, Editable Marketing Sites",
    metaDescription: "Webflow development by OjarisLabs — custom Webflow builds, CMS collections, interactions, migrations and clean, maintainable structure.",
    eyebrow: "Webflow Development",
    intro: "We build Webflow sites with clean structure and reusable components so marketing teams can publish confidently while keeping performance and design quality high.",
    problems: ["Design tools that block quick edits", "Messy Webflow projects that are hard to maintain", "Sites that don't scale beyond a few pages", "Manual content updates"],
    capabilities: ["Custom Webflow development", "CMS collections & dynamic content", "Reusable components & style systems", "Interactions & animation", "Figma to Webflow", "SEO-ready structure", "Migration to/from Webflow", "Training & handover"],
    tech: ["Webflow", "HTML/CSS", "JavaScript", "Webflow CMS"],
    useCases: ["Marketing sites owned by non-technical teams", "Design-led launches with rich interactions", "Migrations to Webflow"],
    faqs: [
      { q: "Can non-technical teams edit Webflow sites?", a: "Yes — we structure the CMS and components so editors can publish safely." },
      { q: "Can you convert Figma designs to Webflow?", a: "Yes — pixel-aware, responsive builds with clean class systems." }
    ],
    related: ["web-development", "ui-ux-design", "seo-services", "squarespace-development"]
  }),
  S({
    slug: "squarespace-development", group: "web", icon: "web",
    title: "Squarespace Development Services | OjarisLabs",
    h1: "Squarespace Design & Development",
    metaDescription: "Squarespace design and development by OjarisLabs — custom layouts, code injection, migrations and optimization for polished, low-maintenance sites.",
    eyebrow: "Squarespace",
    intro: "We design and extend Squarespace sites for businesses that want a polished, low-maintenance presence — with tasteful customization beyond the defaults.",
    problems: ["Templates that feel generic", "Layout limits that block the design you want", "Slow or cluttered pages", "Uncertain migrations"],
    capabilities: ["Squarespace site design", "Custom CSS & code injection", "Advanced layouts", "Commerce setup", "Migration to/from Squarespace", "SEO configuration", "Performance tuning", "Training"],
    tech: ["Squarespace", "HTML/CSS", "JavaScript"],
    useCases: ["Small businesses wanting low maintenance", "Portfolio and service sites", "Custom-styled Squarespace commerce"],
    faqs: [
      { q: "Can you customize Squarespace beyond templates?", a: "Yes — custom CSS and code injection let us push well beyond default styling." },
      { q: "Can you migrate to or from Squarespace?", a: "Yes — with content, redirects and SEO preserved." }
    ],
    related: ["web-development", "webflow-development", "seo-services", "ui-ux-design"]
  }),
  S({
    slug: "custom-software-development", group: "software", icon: "code",
    title: "Custom Software Development | OjarisLabs",
    h1: "Custom Software Built Around Your Workflows",
    metaDescription: "Custom software development by OjarisLabs — web applications, dashboards, integrations and internal tools with scalable architecture, APIs and testing.",
    eyebrow: "Custom Software Development",
    intro: "When off-the-shelf tools don't fit, we build custom software around how your business actually works — with clean architecture, secure access and reliable integrations.",
    problems: ["Spreadsheets and manual processes that don't scale", "Tools that almost fit but force awkward workarounds", "Disconnected systems and duplicated data", "No single source of truth for your team"],
    capabilities: ["Custom web applications", "Admin dashboards & internal tools", "Role-based access control", "REST & GraphQL API development", "Third-party & legacy integrations", "Database design & data modeling", "Automated testing", "Deployment & maintenance"],
    tech: ["PHP/Laravel", "Node.js", "JavaScript/TypeScript", "React", "PostgreSQL/MySQL", "REST/GraphQL"],
    useCases: ["Internal operations tools replacing spreadsheets", "Customer portals and dashboards", "Systems that unify data across tools"],
    faqs: [
      { q: "How do you approach architecture?", a: "We start from requirements and scale expectations, choose proven patterns, model the data carefully and keep the codebase modular and testable." },
      { q: "Can you integrate with our existing systems?", a: "Yes — CRMs, ERPs, payment, and internal APIs with sensible error handling and monitoring." },
      { q: "Do you write tests?", a: "Yes — automated tests appropriate to the risk of each area, plus CI where it helps." },
      { q: "Do you handle deployment and maintenance?", a: "Yes — deployment pipelines, monitoring and ongoing support." }
    ],
    related: ["laravel-development", "php-development", "saas-development", "cloud-devops"]
  }),
  S({
    slug: "php-development", group: "software", icon: "code",
    title: "PHP Development Services | OjarisLabs",
    h1: "PHP Development for Reliable, Maintainable Applications",
    metaDescription: "PHP development by OjarisLabs — custom PHP applications, APIs, integrations, modernization and maintenance with a focus on security and maintainability.",
    eyebrow: "PHP Development",
    intro: "We build and maintain PHP applications — from modern frameworks to modernizing older codebases — with attention to structure, security and long-term maintainability.",
    problems: ["An aging PHP codebase that's risky to change", "Security concerns and outdated dependencies", "Slow, unstructured queries and code", "No tests or documentation"],
    capabilities: ["Custom PHP applications", "Laravel & modern PHP frameworks", "API development", "Database design & optimization", "Authentication & authorization", "Legacy modernization", "Security hardening", "Testing & maintenance"],
    tech: ["PHP", "Laravel", "MySQL/PostgreSQL", "Composer", "REST APIs"],
    useCases: ["Modernizing legacy PHP systems", "Custom back-ends and APIs", "Performance and security remediation"],
    faqs: [
      { q: "Can you modernize an old PHP application?", a: "Yes — we assess, stabilize, upgrade dependencies and refactor incrementally to reduce risk." },
      { q: "Do you build APIs in PHP?", a: "Yes — well-documented REST APIs with authentication and validation." }
    ],
    related: ["laravel-development", "custom-software-development", "saas-development", "cloud-devops"]
  }),
  S({
    slug: "laravel-development", group: "software", icon: "code",
    title: "Laravel Development Services | OjarisLabs",
    h1: "Laravel Development for Scalable Web Applications and SaaS",
    metaDescription: "Laravel development by OjarisLabs — Laravel applications, APIs, admin panels, SaaS, queues, scheduled jobs, auth, database architecture and upgrades.",
    eyebrow: "Laravel Development",
    intro: "We build Laravel applications that are clean, testable and ready to scale — from admin panels and APIs to full SaaS platforms with background processing and integrations.",
    problems: ["A prototype that needs to become production-grade", "Slow background jobs and blocking requests", "Authentication and permissions that are hard to reason about", "Upgrades that keep getting deferred"],
    capabilities: ["Laravel application development", "REST & API development", "Admin panels & dashboards", "SaaS platforms & multi-tenancy", "Queues & background jobs", "Scheduled tasks & automation", "Authentication & role-based access", "Database architecture & version upgrades"],
    tech: ["Laravel", "PHP", "MySQL/PostgreSQL", "Redis", "Livewire/Inertia", "REST APIs"],
    useCases: ["SaaS products with subscriptions and roles", "API back-ends for web and mobile", "Operational dashboards with automation"],
    faqs: [
      { q: "Can you build a SaaS on Laravel?", a: "Yes — multi-tenancy, billing, roles, queues and scheduled jobs are common in our Laravel work." },
      { q: "Can you upgrade our Laravel version?", a: "Yes — staged upgrades with testing to minimize risk." },
      { q: "Do you handle queues and scheduled jobs?", a: "Yes — reliable background processing with monitoring and retries." }
    ],
    related: ["custom-software-development", "saas-development", "php-development", "cloud-devops"]
  }),
  S({
    slug: "javascript-development", group: "software", icon: "code",
    title: "JavaScript Development Services | OjarisLabs",
    h1: "JavaScript Development for Modern Web Experiences",
    metaDescription: "JavaScript development by OjarisLabs — React front-ends, Node.js back-ends, APIs, interactive UIs and integrations built with modern, maintainable JavaScript.",
    eyebrow: "JavaScript Development",
    intro: "We build interactive front-ends and Node.js services with modern, maintainable JavaScript and TypeScript — from component libraries to APIs and real-time features.",
    problems: ["A UI that feels dated or sluggish", "Fragile, hard-to-maintain front-end code", "No shared components or design system", "Back-end services that need to scale"],
    capabilities: ["React front-end development", "Node.js back-end & APIs", "TypeScript", "Interactive UIs & dashboards", "Component libraries & design systems", "Real-time features", "Third-party integrations", "Testing & tooling"],
    tech: ["JavaScript", "TypeScript", "React", "Node.js", "Vite", "REST/GraphQL"],
    useCases: ["Interactive dashboards and tools", "Component-driven front-ends", "Node.js APIs and services"],
    faqs: [
      { q: "Do you use React and TypeScript?", a: "Yes — we favor typed, component-driven front-ends for maintainability." },
      { q: "Can you build the back-end too?", a: "Yes — Node.js services and APIs to pair with the front-end." }
    ],
    related: ["custom-software-development", "saas-development", "web-development", "mobile-app-development"]
  }),
  S({
    slug: "saas-development", group: "software", icon: "layers",
    title: "SaaS Development Services | OjarisLabs",
    h1: "SaaS Development from Idea to Scalable Product",
    metaDescription: "SaaS development by OjarisLabs — multi-tenant architecture, subscriptions, roles, dashboards, APIs and integrations built to scale from MVP to growth.",
    eyebrow: "SaaS Development",
    intro: "We help turn SaaS ideas into products — starting with a focused MVP and a scalable foundation for multi-tenancy, billing, roles and integrations.",
    problems: ["An idea that needs a credible first version", "Uncertainty about architecture and scale", "Billing, roles and tenancy that are hard to get right", "A prototype that can't grow"],
    capabilities: ["MVP scoping & architecture", "Multi-tenant application design", "Subscriptions & billing", "Role-based access & teams", "Admin & analytics dashboards", "API development & integrations", "Automated testing", "Deployment & scaling"],
    tech: ["Laravel", "Node.js", "React", "PostgreSQL", "Stripe", "AWS"],
    useCases: ["MVPs validating a new product", "Scaling an existing SaaS", "Adding billing, roles or APIs"],
    faqs: [
      { q: "Can you build an MVP first?", a: "Yes — we scope a focused MVP on a foundation that can scale, avoiding throwaway work." },
      { q: "Do you handle subscriptions and billing?", a: "Yes — plans, trials, upgrades and webhooks with a provider such as Stripe." },
      { q: "How do you handle multi-tenancy?", a: "We choose a tenancy model suited to your data isolation and scale needs, and build roles and permissions around it." }
    ],
    related: ["laravel-development", "custom-software-development", "javascript-development", "cloud-devops"]
  }),
  S({
    slug: "mobile-app-development", group: "mobile", icon: "mobile",
    title: "Mobile App Development Services | OjarisLabs",
    h1: "Mobile App Development for iOS and Android",
    metaDescription: "Mobile app development by OjarisLabs — cross-platform apps with React Native and Flutter, native iOS/Android, API integration, app UI/UX and maintenance.",
    eyebrow: "Mobile App Development",
    intro: "We design and build mobile apps that feel intuitive and perform well — usually cross-platform for efficiency, always with maintainability and the roadmap in mind.",
    problems: ["An idea that needs a real app, not a wrapper", "A slow or unstable existing app", "No clear path from design to store", "APIs that need to power both web and mobile"],
    capabilities: ["iOS & Android apps", "Cross-platform (React Native, Flutter)", "App UI/UX design", "API design & integration", "Offline & sync patterns", "Push notifications", "App store deployment", "Maintenance & updates"],
    tech: ["React Native", "Flutter", "TypeScript", "REST/GraphQL", "Firebase"],
    useCases: ["Customer-facing apps for services and commerce", "Companion apps to existing platforms", "Field/operations apps"],
    faqs: [
      { q: "Native or cross-platform?", a: "Cross-platform (React Native or Flutter) is often the most efficient choice; we recommend native when a project truly needs it." },
      { q: "Do you handle app store submission?", a: "Yes — build configuration, store assets and submission support." }
    ],
    related: ["javascript-development", "ui-ux-design", "custom-software-development", "cloud-devops"]
  }),
  S({
    slug: "ai-development", group: "ai", icon: "ai",
    title: "AI Development & Integration | OjarisLabs",
    h1: "Practical AI Development and Integration",
    metaDescription: "AI development by OjarisLabs — practical AI integrations, assistants, chatbots and API-connected AI features built for real workflows, not hype.",
    eyebrow: "AI Development",
    intro: "We build practical AI features that solve specific problems — assistants, chatbots and API-connected tools grounded in your data and workflows, with realistic scope.",
    problems: ["Manual work that could be assisted or automated", "Customers waiting on repetitive answers", "Knowledge scattered across documents and tools", "Uncertainty about where AI actually helps"],
    capabilities: ["AI integration into apps & sites", "Custom chatbots & assistants", "Retrieval over your own content", "Document processing & extraction", "AI agents for scoped tasks", "API-connected AI tools", "Guardrails & evaluation", "Iteration & monitoring"],
    tech: ["OpenAI API", "Vector search", "Node.js", "Python", "REST APIs"],
    useCases: ["Support and knowledge assistants", "Document processing pipelines", "AI features inside existing products"],
    faqs: [
      { q: "Do you use ChatGPT/OpenAI?", a: "We integrate with providers such as OpenAI via their APIs where appropriate. We are not affiliated with or endorsed by them." },
      { q: "How do you keep AI reliable?", a: "We scope narrowly, ground responses in your data, add guardrails and evaluate outputs before and after launch." }
    ],
    related: ["ai-automation", "chatgpt-integration", "custom-software-development", "gohighlevel-automation"]
  }),
  S({
    slug: "ai-automation", group: "ai", icon: "gear",
    title: "AI & Workflow Automation Services | OjarisLabs",
    h1: "AI & Automation That Removes Manual Work",
    metaDescription: "AI and workflow automation by OjarisLabs — CRM automation, lead qualification, reporting, data extraction and API-connected AI tools that reduce manual work.",
    eyebrow: "AI & Automation",
    intro: "We automate the repetitive work that slows teams down — combining workflow automation with practical AI where it genuinely helps, connected through APIs to your existing tools.",
    problems: ["Repetitive manual steps across tools", "Data re-entered between systems", "Slow lead follow-up", "Reporting assembled by hand"],
    capabilities: ["Workflow & business process automation", "CRM automation", "Lead qualification & routing", "Reporting & data extraction automation", "Document & content workflows", "API-connected AI tools", "GoHighLevel automation", "Monitoring & iteration"],
    tech: ["OpenAI API", "Zapier/Make", "GoHighLevel", "Node.js", "REST APIs"],
    useCases: ["Customer support assistants", "Lead qualification and CRM automation", "Automated reporting and data extraction"],
    faqs: [
      { q: "What can you automate?", a: "Common examples include support assistants, lead qualification, CRM updates, reporting, document processing and data movement between tools." },
      { q: "Will automation fit our existing tools?", a: "Yes — we connect through APIs and platforms like GoHighLevel, Zapier or Make, or build custom where needed." }
    ],
    related: ["chatgpt-integration", "gohighlevel-automation", "ai-development", "custom-software-development"]
  }),
  S({
    slug: "chatgpt-integration", group: "ai", icon: "chat",
    title: "ChatGPT & AI Integration Services | OjarisLabs",
    h1: "ChatGPT & AI Integration for Your Product",
    metaDescription: "ChatGPT and AI integration by OjarisLabs — assistants and AI features grounded in your data, connected via API to your website, app or internal tools.",
    eyebrow: "ChatGPT Integration",
    intro: "We integrate conversational AI into your website, product or internal tools — grounded in your own content so answers are useful, on-brand and scoped.",
    problems: ["Generic chatbots that frustrate customers", "Support teams answering the same questions", "Content locked in documents no one can search", "AI experiments that never reach production"],
    capabilities: ["Website & in-app assistants", "Retrieval over your content (RAG)", "Internal knowledge assistants", "Lead capture & qualification chat", "Guardrails & tone control", "Analytics on conversations", "API integration", "Iteration & evaluation"],
    tech: ["OpenAI API", "Vector search", "Node.js", "REST APIs"],
    useCases: ["Customer support assistants", "Internal knowledge search", "Guided lead-capture chat"],
    faqs: [
      { q: "Is this affiliated with OpenAI?", a: "No. We integrate with the OpenAI API (and similar providers) but are not affiliated with or endorsed by them." },
      { q: "Can the assistant use our own content?", a: "Yes — we ground responses in your documentation and data so answers are accurate and relevant." }
    ],
    related: ["ai-development", "ai-automation", "gohighlevel-automation", "custom-software-development"]
  }),
  S({
    slug: "gohighlevel-automation", group: "ai", icon: "gear",
    title: "GoHighLevel Automation Services | OjarisLabs",
    h1: "GoHighLevel Automation & Setup",
    metaDescription: "GoHighLevel automation by OjarisLabs — funnels, pipelines, workflows, integrations and AI-assisted follow-up configured to fit how your business sells.",
    eyebrow: "GoHighLevel Automation",
    intro: "We configure GoHighLevel around how your business actually sells — pipelines, workflows, funnels and integrations that keep follow-up consistent and hands-off.",
    problems: ["Leads slipping through inconsistent follow-up", "Manual data entry between GHL and other tools", "Under-used automation features", "No clear reporting on pipeline"],
    capabilities: ["Account & pipeline setup", "Workflow & automation build", "Funnels & landing pages", "SMS/email sequences", "CRM & calendar integration", "AI-assisted follow-up", "Third-party integrations", "Reporting & optimization"],
    tech: ["GoHighLevel", "Webhooks", "Zapier/Make", "REST APIs"],
    useCases: ["Automated lead nurture and booking", "Consolidating tools into GHL", "AI-assisted follow-up"],
    faqs: [
      { q: "Can you connect GoHighLevel to other tools?", a: "Yes — via native integrations, webhooks and automation platforms, or custom API work." },
      { q: "Can you add AI follow-up?", a: "Yes — scoped AI-assisted responses and qualification within your workflows." }
    ],
    related: ["ai-automation", "chatgpt-integration", "ai-development", "seo-services"]
  }),
  S({
    slug: "ui-ux-design", group: "design", icon: "brush",
    title: "UI/UX Design Services | OjarisLabs",
    h1: "UI/UX Design That Makes Products Clear and Useful",
    metaDescription: "UI/UX design by OjarisLabs — product and web design, design systems, Figma, Figma/PSD to HTML and landing pages that balance clarity, brand and conversion.",
    eyebrow: "UI/UX & Creative",
    intro: "We design digital experiences that make complex products feel simple — from research and wireframes to polished UI, design systems and developer-ready handoff.",
    problems: ["A product that confuses new users", "Inconsistent screens and components", "Designs that don't translate cleanly to code", "Low conversion on key pages"],
    capabilities: ["UI/UX & product design", "Figma design & prototyping", "Design systems & component libraries", "Landing page design", "Figma to HTML", "PSD to HTML", "Brand identity", "Developer-ready handoff"],
    tech: ["Figma", "Design tokens", "HTML/CSS", "Accessibility (WCAG)"],
    useCases: ["New product and app interfaces", "Design systems for consistency", "High-converting landing pages"],
    faqs: [
      { q: "Do you build design systems?", a: "Yes — reusable components and tokens that keep product UI consistent and faster to build." },
      { q: "Can you convert Figma or PSD to HTML?", a: "Yes — clean, responsive, accessible markup that matches the design." }
    ],
    related: ["graphic-design", "web-development", "mobile-app-development", "seo-services"]
  }),
  S({
    slug: "graphic-design", group: "design", icon: "brush",
    title: "Graphic Design & Brand Identity | OjarisLabs",
    h1: "Graphic Design & Brand Identity",
    metaDescription: "Graphic design by OjarisLabs — brand identity, logos, marketing graphics and design assets that stay consistent across web, product and campaigns.",
    eyebrow: "Graphic Design",
    intro: "We create brand and marketing visuals that stay consistent everywhere — from identity and logos to campaign and social assets that support your digital presence.",
    problems: ["Inconsistent visuals across channels", "A brand that feels dated", "One-off assets with no system", "Design that doesn't match the product"],
    capabilities: ["Brand identity & logo design", "Visual identity systems", "Marketing & campaign graphics", "Social media assets", "Presentation & pitch design", "Iconography & illustration", "Print-ready assets", "Brand guidelines"],
    tech: ["Figma", "Vector/SVG", "Brand systems"],
    useCases: ["New brand identity", "Campaign asset packs", "Brand refresh"],
    faqs: [
      { q: "Do you deliver brand guidelines?", a: "Yes — usage rules, colors, type and assets so your brand stays consistent." }
    ],
    related: ["ui-ux-design", "web-development", "seo-services", "shopify-development"]
  }),
  S({
    slug: "seo-services", group: "seo", icon: "growth",
    title: "SEO Services & Digital Growth | OjarisLabs",
    h1: "SEO Services Built on Strong Technical Foundations",
    metaDescription: "SEO services by OjarisLabs — technical SEO, on-page, local and eCommerce SEO, content strategy and conversion optimization to improve discoverability.",
    eyebrow: "SEO & Digital Growth",
    intro: "We improve discoverability with a foundations-first approach — technical health, clear information architecture, on-page quality and content that answers real questions.",
    problems: ["Pages that don't get found", "Technical issues limiting crawl and indexing", "Thin or unfocused content", "Traffic that doesn't convert"],
    capabilities: ["Technical SEO audits", "On-page optimization", "Information architecture", "Local SEO", "eCommerce SEO", "Content strategy", "Internal linking", "Conversion optimization"],
    tech: ["Search Console", "Analytics", "Core Web Vitals", "Structured data"],
    useCases: ["Foundations for a new site", "Recovering from technical issues", "Scaling content and internal linking"],
    faqs: [
      { q: "Do you guarantee rankings?", a: "No — no one credibly can. We strengthen technical foundations and content so search engines and AI systems can understand and surface your pages." },
      { q: "What does an SEO engagement include?", a: "Typically an audit, prioritized fixes, on-page improvements, content guidance and measurement." }
    ],
    related: ["technical-seo", "ai-search-optimization", "web-development", "ui-ux-design"]
  }),
  S({
    slug: "technical-seo", group: "seo", icon: "search",
    title: "Technical SEO Services | OjarisLabs",
    h1: "Technical SEO for Fast, Crawlable, Indexable Websites",
    metaDescription: "Technical SEO by OjarisLabs — crawlability, indexability, Core Web Vitals, structured data, internal linking and site architecture for modern websites.",
    eyebrow: "Technical SEO",
    intro: "We fix the technical foundations that determine whether your content can be found — crawlability, indexability, performance, structured data and architecture.",
    problems: ["Pages not indexed or crawled correctly", "Slow Core Web Vitals", "Missing or invalid structured data", "Confusing site architecture and duplicate URLs"],
    capabilities: ["Technical SEO audits", "Crawlability & indexability", "Core Web Vitals & performance", "Structured data (JSON-LD)", "Information architecture", "Internal linking", "Canonicalization & redirects", "XML sitemaps & robots"],
    tech: ["Search Console", "Lighthouse", "Structured data", "Log analysis"],
    useCases: ["Migrations without losing visibility", "Fixing indexation problems", "Improving Core Web Vitals"],
    faqs: [
      { q: "Can you help with a migration?", a: "Yes — redirect mapping, canonicalization and testing to protect visibility during replatforming." },
      { q: "Do you implement structured data?", a: "Yes — valid JSON-LD for the entities and content types that apply to your site." }
    ],
    related: ["seo-services", "ai-search-optimization", "web-development", "cloud-devops"]
  }),
  S({
    slug: "ai-search-optimization", group: "seo", icon: "compass",
    title: "AI Search Optimization (AEO) | OjarisLabs",
    h1: "AI Search Optimization for Modern Discovery",
    metaDescription: "AI search optimization by OjarisLabs — answer-focused content, entity clarity and structured data to help search engines and AI systems understand your site.",
    eyebrow: "AI Search Optimization",
    intro: "We help search engines and AI systems understand your content — combining clear entities, answer-focused writing and structured data so your business is easier to surface and cite.",
    problems: ["Content that AI systems can't easily parse", "Unclear entity and topic signals", "No answer-focused content for common questions", "Weak structured data"],
    capabilities: ["Answer engine optimization (AEO)", "Entity clarity & topical structure", "Answer-focused content", "Structured data & schema", "Semantic HTML & headings", "Internal linking for context", "FAQ & knowledge content", "Measurement of discoverability"],
    tech: ["Structured data", "Semantic HTML", "Search Console", "Content modeling"],
    useCases: ["Being surfaced in AI answers", "Clarifying topical authority", "Building answer-focused content"],
    faqs: [
      { q: "Can you guarantee AI systems will cite us?", a: "No — but we make your content clearer and more machine-understandable, which improves the odds of being surfaced and summarized accurately." },
      { q: "How is this different from SEO?", a: "It builds on SEO with a stronger focus on entities, answers and structured data for AI-driven discovery." }
    ],
    related: ["technical-seo", "seo-services", "web-development", "ai-automation"]
  }),
  S({
    slug: "cloud-devops", group: "cloud", icon: "cloud",
    title: "Cloud & DevOps Services | OjarisLabs",
    h1: "Cloud, DevOps & Deployment You Can Rely On",
    metaDescription: "Cloud and DevOps by OjarisLabs — AWS setup, deployment pipelines, hosting, migrations, monitoring and security hardening for business-critical systems.",
    eyebrow: "Cloud, DevOps & Support",
    intro: "We set up reliable infrastructure and deployment so releases are safe and systems stay healthy — from AWS and hosting to pipelines, monitoring and security hardening.",
    problems: ["Risky, manual deployments", "Downtime and no monitoring", "Infrastructure that can't scale", "Unclear backups and recovery"],
    capabilities: ["Cloud hosting & AWS setup", "CI/CD deployment pipelines", "Environment configuration", "Monitoring & alerting", "Backups & recovery", "Security hardening", "Website & server migration", "Scaling & cost optimization"],
    tech: ["AWS", "Docker", "CI/CD", "Linux", "Nginx"],
    useCases: ["Moving to reliable, scalable hosting", "Automating deployments", "Hardening and monitoring production"],
    faqs: [
      { q: "Do you work with AWS?", a: "Yes — hosting, deployment and configuration on AWS and comparable providers." },
      { q: "Can you set up CI/CD?", a: "Yes — automated build, test and deploy pipelines suited to your stack." }
    ],
    related: ["server-management", "website-maintenance", "custom-software-development", "saas-development"]
  }),
  S({
    slug: "server-management", group: "cloud", icon: "server",
    title: "Server Management Services | OjarisLabs",
    h1: "Server Management & Hosting Support",
    metaDescription: "Server management by OjarisLabs — server setup, DNS and email configuration, migrations, security hardening, monitoring and ongoing maintenance.",
    eyebrow: "Server Management",
    intro: "We take server operations off your plate — setup, configuration, migrations, security and monitoring — so your sites and apps stay fast, secure and available.",
    problems: ["Servers no one wants to touch", "DNS and email misconfiguration", "Security patches falling behind", "Migrations that feel risky"],
    capabilities: ["Server setup & configuration", "DNS & email configuration", "Website & server migration", "Security hardening & patching", "Monitoring & uptime", "Backups & recovery", "SSL & performance", "Ongoing maintenance"],
    tech: ["Linux", "Nginx/Apache", "cPanel", "AWS", "DNS"],
    useCases: ["Migrations to better hosting", "Locking down and patching servers", "Fixing DNS and email delivery"],
    faqs: [
      { q: "Can you migrate our website to a new server?", a: "Yes — with testing, DNS cutover and minimal downtime." },
      { q: "Do you handle DNS and email setup?", a: "Yes — records, deliverability (SPF/DKIM/DMARC) and troubleshooting." }
    ],
    related: ["cloud-devops", "website-maintenance", "web-development", "wordpress-development"]
  }),
  S({
    slug: "website-maintenance", group: "cloud", icon: "wrench",
    title: "Website Maintenance & Support | OjarisLabs",
    h1: "Website Maintenance That Keeps You Fast and Secure",
    metaDescription: "Website maintenance by OjarisLabs — updates, backups, security monitoring, performance tuning and ongoing improvements for WordPress, WooCommerce and custom sites.",
    eyebrow: "Maintenance & Support",
    intro: "We keep your website healthy after launch — updates, backups, security, performance and steady improvements — so it stays reliable while you focus on the business.",
    problems: ["Updates and backups that get forgotten", "Security risks from outdated software", "Slow pages creeping in over time", "No one to call when something breaks"],
    capabilities: ["Core, theme & plugin updates", "Backups & recovery", "Security monitoring & hardening", "Performance monitoring & tuning", "Uptime monitoring", "Content & small change requests", "Bug fixes", "Iterative improvements"],
    tech: ["WordPress", "WooCommerce", "Custom stacks", "Monitoring tools"],
    useCases: ["Ongoing care for business-critical sites", "Peace-of-mind support plans", "Steady, prioritized improvements"],
    faqs: [
      { q: "What does a maintenance plan include?", a: "Typically updates, backups, security monitoring, performance checks and a set amount of change/support time each month." },
      { q: "Can you maintain a site you didn't build?", a: "Yes — we start with an audit, then take over maintenance and improvements." }
    ],
    related: ["cloud-devops", "server-management", "wordpress-development", "seo-services"]
  })
];

for (const s of SERVICE_PAGES) {
  const extras = SERVICE_EXTRAS[s.slug];
  if (!extras) throw new Error(`Missing SERVICE_EXTRAS for ${s.slug}`);
  Object.assign(s, extras);
}

export const SERVICE_BY_SLUG = Object.fromEntries(SERVICE_PAGES.map((s) => [s.slug, s]));
