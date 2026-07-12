/* =====================================================================
   Per-service process + why copy (unique; avoids shared template text).
   Imported by data.mjs and merged onto each SERVICE_PAGES entry.
   ===================================================================== */

export const SERVICE_EXTRAS = {
  "web-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Scope the site job",
        "text": "We clarify who the site is for, what it must do, and which pages or flows matter most."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Structure & design",
        "text": "We map information architecture, wire key pages, and lock a design system before build."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build for performance",
        "text": "We engineer responsive, accessible markup with Core Web Vitals and CMS editability in mind."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Launch & iterate",
        "text": "We ship with analytics, redirects and a short post-launch improvement cycle."
      }
    ],
    "why": [
      "We treat websites as products: clear structure, fast pages and an editing model your team can own.",
      "Stack recommendations stay honest — WordPress, Webflow or custom only when the job fits.",
      "Performance and accessibility are built in during delivery, not bolted on at the end.",
      "You get maintainable front-end work with documentation your team can extend.",
      "Engagements can stay project-based or continue into ongoing iteration after launch."
    ]
  },
  "wordpress-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Audit content & plugins",
        "text": "We review your content model, plugin footprint, hosting and where editors get stuck."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Theme & block plan",
        "text": "We design a theme and block or ACF structure that matches how you publish."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build & harden",
        "text": "We develop the theme, clean up plugins, and tune caching, security and forms."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Train & support",
        "text": "We hand over editor guidance and can continue with updates and improvements."
      }
    ],
    "why": [
      "Custom WordPress work focused on editor experience — not another bloated multipurpose theme.",
      "We reduce plugin sprawl and keep the stack lean enough to stay secure and fast.",
      "ACF, Gutenberg blocks and page builders are chosen based on how your team actually edits.",
      "Migrations preserve content, media and redirects with staged testing.",
      "Ongoing WordPress care plans cover updates, backups and performance — not just firefighting."
    ]
  },
  "woocommerce-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Map the commerce journey",
        "text": "We review catalog, checkout, payments, shipping and the ops work behind every order."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Store experience design",
        "text": "We refine product pages, cart and checkout flows for clarity and conversion."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build & integrate",
        "text": "We customize WooCommerce, wire gateways and shipping, and tune performance under catalog load."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Go-live & operate",
        "text": "We test orders end-to-end, then support updates, subscriptions and store improvements."
      }
    ],
    "why": [
      "WooCommerce builds that respect both shoppers and the people fulfilling orders.",
      "Checkout and catalog customization without turning the store into an unmaintainable tangle.",
      "Subscriptions, memberships and payment integrations implemented with clear failure handling.",
      "Store migrations include products, customers, orders and redirect maps.",
      "We stay available for performance work as catalogs and traffic grow."
    ]
  },
  "shopify-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Define merchandising needs",
        "text": "We learn how you sell, which collections matter, and which apps earn their keep."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Theme architecture",
        "text": "We plan Shopify 2.0 sections and templates your team can rearrange without code."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build & connect",
        "text": "We implement the theme, evaluate apps, and integrate payments, shipping and analytics."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Optimize & maintain",
        "text": "We launch with speed and conversion checks, then iterate on UX and store ops."
      }
    ],
    "why": [
      "Shopify 2.0 themes built for merchandising flexibility — not locked one-off layouts.",
      "App sprawl is audited so you keep what helps and drop what slows the storefront.",
      "Migrations protect SEO with redirects, content mapping and staged cutovers.",
      "Performance work targets theme weight, scripts and conversion friction.",
      "You can continue with us for theme updates and seasonal campaign support."
    ]
  },
  "webflow-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Content & CMS model",
        "text": "We define collections, fields and page templates around how marketing will publish."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Design system in Webflow",
        "text": "We build reusable components and a clean class structure before page volume grows."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build interactions & SEO",
        "text": "We implement layouts, CMS, interactions and SEO-ready structure without fragile hacks."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Handover & train",
        "text": "We train editors and leave a site they can update without breaking the design."
      }
    ],
    "why": [
      "Webflow projects structured so non-technical teams can publish confidently.",
      "Class systems and components stay maintainable as the marketing site grows.",
      "Figma-to-Webflow builds stay responsive and performance-conscious.",
      "Migrations into or out of Webflow include content and redirect planning.",
      "We document the CMS so the site does not depend on one person who “knows Webflow.”"
    ]
  },
  "squarespace-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Fit check",
        "text": "We confirm Squarespace is the right fit and where customization is worth the effort."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Layout & brand polish",
        "text": "We push beyond default templates with custom CSS and carefully scoped code injection."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Configure & optimize",
        "text": "We set up pages, commerce if needed, SEO basics and performance-minded assets."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Launch & guide",
        "text": "We publish with you and leave clear editing guidance for day-to-day updates."
      }
    ],
    "why": [
      "Squarespace work that looks intentional — not a lightly edited stock template.",
      "Custom CSS and code injection used sparingly so future edits stay safe.",
      "Good fit for businesses that want polish with low ongoing maintenance.",
      "Migrations preserve content and key SEO signals where possible.",
      "Honest advice when another platform would serve you better long term."
    ]
  },
  "custom-software-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Workflow discovery",
        "text": "We map the real process, data sources and constraints before proposing architecture."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Architecture & UX",
        "text": "We design data models, APIs, roles and the screens people will use daily."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Iterative build",
        "text": "We ship in vertical slices with review checkpoints, tests and deployment from early on."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Operate & extend",
        "text": "We launch with monitoring and a backlog for the next improvements that matter."
      }
    ],
    "why": [
      "Custom software only when off-the-shelf tools force painful workarounds.",
      "Architecture choices favor clarity, security and long-term change — not demo-day speed alone.",
      "Integrations are designed with error handling and ownership boundaries.",
      "Automated tests and CI where risk warrants them, without ceremony for its own sake.",
      "You keep a maintainable codebase with documentation your team can continue."
    ]
  },
  "php-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Codebase assessment",
        "text": "We inventory frameworks, dependencies, security posture and the highest-risk areas."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Stabilize & plan",
        "text": "We fix critical issues first, then sequence modernization without a big-bang rewrite."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build or modernize",
        "text": "We deliver features or refactors in small, testable increments with clear rollbacks."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Harden & maintain",
        "text": "We leave dependency, backup and monitoring practices that keep PHP apps healthy."
      }
    ],
    "why": [
      "PHP work that respects existing systems — modernization without reckless rewrites.",
      "Security and dependency hygiene treated as delivery work, not optional extras.",
      "APIs and back-ends documented so integrations do not become tribal knowledge.",
      "Laravel when it helps; plain PHP when that is the pragmatic path.",
      "Ongoing maintenance available for apps that must stay reliable in production."
    ]
  },
  "laravel-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Product & domain mapping",
        "text": "We clarify entities, tenancy, roles and the jobs the Laravel app must perform."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Laravel architecture",
        "text": "We design models, queues, auth and module boundaries suited to your scale."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build with queues & APIs",
        "text": "We implement features with background jobs, validation and tests where it counts."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Deploy & upgrade path",
        "text": "We ship with CI/CD and a plan for Laravel version upgrades over time."
      }
    ],
    "why": [
      "Laravel applications structured for SaaS patterns: roles, queues, billing hooks and APIs.",
      "Background processing designed so slow work does not block user requests.",
      "Upgrades planned deliberately so framework debt does not pile up silently.",
      "Admin panels and dashboards built for the people who operate the product daily.",
      "Clear handoff documentation for teams that will own the codebase."
    ]
  },
  "javascript-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Interface & API needs",
        "text": "We define the UI jobs, data contracts and performance expectations for the experience."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Component architecture",
        "text": "We design React components, state boundaries and shared patterns before scaling UI."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build front-end & services",
        "text": "We implement typed front-ends and Node.js APIs with tooling that keeps the codebase sane."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Test & ship",
        "text": "We validate critical paths, then deploy with monitoring for real-user issues."
      }
    ],
    "why": [
      "JavaScript and TypeScript work aimed at maintainable UIs — not throwaway demos.",
      "React and Node.js chosen when they fit; we do not force a SPA where a simpler page wins.",
      "Component libraries and design-system alignment when multiple screens share patterns.",
      "API contracts documented so web and mobile clients can share a back-end cleanly.",
      "Testing and tooling calibrated to risk, so the team can change code confidently."
    ]
  },
  "saas-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "MVP scoping",
        "text": "We define the smallest product that proves value — and the architecture it must not paint you into."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Tenancy & billing design",
        "text": "We choose tenancy, roles, plans and subscription flows before coding corners."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build the product loop",
        "text": "We ship core workflows, dashboards and APIs in iterations with real feedback."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Scale foundations",
        "text": "We harden deployment, monitoring and the next growth features after product-market signal."
      }
    ],
    "why": [
      "SaaS builds that start focused — MVP scope without throwaway architecture.",
      "Multi-tenancy, roles and billing treated as first-class design problems.",
      "Stripe (or similar) billing wired with webhooks and plan changes you can reason about.",
      "APIs and admin tools included so operations do not live only in the database.",
      "Path from MVP to growth planned with deployment and observability from early builds."
    ]
  },
  "mobile-app-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "App jobs & platforms",
        "text": "We clarify user journeys, offline needs and whether cross-platform or native is the better fit."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "App UX & API plan",
        "text": "We design flows, screens and the API contracts the app will depend on."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Build & integrate",
        "text": "We implement with React Native or Flutter, wire push/auth/APIs, and test on real devices."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Store release & care",
        "text": "We support store submission and ongoing updates after launch."
      }
    ],
    "why": [
      "Cross-platform by default when it saves time without hurting the experience.",
      "App UX designed for thumbs and interrupted sessions — not desktop layouts squeezed down.",
      "API and auth design that can serve mobile and web from one back-end where useful.",
      "Store submission support with assets, privacy details and release checklists.",
      "Maintenance plans for OS updates, dependency bumps and iterative feature work."
    ]
  },
  "ai-development": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Find a real AI job",
        "text": "We pick a narrow workflow where AI helps, with clear success criteria and risk limits."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Data & guardrails",
        "text": "We decide what content the model may use, how outputs are checked, and where humans stay in the loop."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Integrate & evaluate",
        "text": "We build the feature via APIs, retrieval and logging, then evaluate quality before wider release."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Monitor & improve",
        "text": "We watch real usage, failure modes and cost, then iterate on prompts, data and UX."
      }
    ],
    "why": [
      "Practical AI features scoped to real workflows — not speculative demos.",
      "Grounding in your data and explicit guardrails before anything reaches customers.",
      "Provider APIs (such as OpenAI) used where appropriate; we are not affiliated with them.",
      "Evaluation and monitoring so quality does not silently degrade after launch.",
      "Clear documentation of what the AI can and cannot do for your operators."
    ]
  },
  "ai-automation": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Map the manual path",
        "text": "We document the repetitive steps, tools involved and where handoffs fail today."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Design the automation",
        "text": "We choose rules, AI assists and human checkpoints that keep outcomes trustworthy."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Connect & automate",
        "text": "We wire APIs, CRM flows or platforms like GoHighLevel, Zapier or Make — or custom code."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Measure & refine",
        "text": "We track time saved and error rates, then tighten the workflow based on evidence."
      }
    ],
    "why": [
      "Automation aimed at specific bottlenecks — lead routing, reporting, data movement, support.",
      "AI used only where judgement-light text work benefits; rules handle the rest.",
      "Integrations respect your existing CRM and tools instead of forcing a rip-and-replace.",
      "Failure handling and alerts so silent breakage does not go unnoticed.",
      "We document ownership so your team knows how to adjust the automation later."
    ]
  },
  "chatgpt-integration": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Define assistant purpose",
        "text": "We clarify audience, allowed topics, escalation paths and success metrics for the assistant."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Ground in your content",
        "text": "We prepare the knowledge sources, retrieval approach and tone constraints."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Integrate via API",
        "text": "We embed the assistant in your site, app or tools with logging and safety checks."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Evaluate conversations",
        "text": "We review real transcripts, fix gaps and improve answers before expanding coverage."
      }
    ],
    "why": [
      "Assistants grounded in your documentation — not generic chatbots that invent answers.",
      "Transparent about API providers: we integrate; we are not affiliated with OpenAI.",
      "Tone, topic limits and escalation to humans designed up front.",
      "Analytics on conversations so you see what people ask and where content is missing.",
      "Iteration loops after launch so the assistant improves with real traffic."
    ]
  },
  "gohighlevel-automation": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Sales process mapping",
        "text": "We document how leads enter, how you follow up, and which stages stall today."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Pipeline & funnel design",
        "text": "We configure pipelines, funnels and messaging that match how you actually sell."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Automate & integrate",
        "text": "We build workflows, calendars, SMS/email sequences and connections to other tools."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Report & optimize",
        "text": "We set reporting so you can see conversion by stage and improve underperforming steps."
      }
    ],
    "why": [
      "GoHighLevel configured around your sales process — not a generic template account.",
      "Workflows that keep follow-up consistent without drowning your team in notifications.",
      "Integrations and webhooks when native features are not enough.",
      "Optional AI-assisted follow-up scoped carefully so messages stay on-brand.",
      "Training so your team can adjust pipelines without breaking the automation."
    ]
  },
  "ui-ux-design": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Understand users & jobs",
        "text": "We clarify who uses the product, what success looks like, and where friction shows up."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Wireframe & prototype",
        "text": "We explore flows in Figma, validate structure early, then refine visual design."
      },
      {
        "icon": "layers",
        "no": "03",
        "title": "Systematize UI",
        "text": "We define components, states and tokens so engineering can build consistently."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Handoff & support build",
        "text": "We deliver developer-ready specs and stay involved through implementation reviews."
      }
    ],
    "why": [
      "Design that clarifies complex products instead of decorating confusing flows.",
      "Figma systems and tokens that keep UI consistent as the product grows.",
      "Handoff that engineers can implement without guessing spacing, states or edge cases.",
      "Landing pages and product UI balanced for clarity, brand and conversion.",
      "Optional Figma/PSD-to-HTML when you need production markup from the design."
    ]
  },
  "graphic-design": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Brand context",
        "text": "We learn how you show up today, where assets are used, and what must stay consistent."
      },
      {
        "icon": "brush",
        "no": "02",
        "title": "Identity exploration",
        "text": "We explore directions for logo, type, color and visual language with clear rationale."
      },
      {
        "icon": "layers",
        "no": "03",
        "title": "System & assets",
        "text": "We produce guidelines plus the campaign, web and social assets you need first."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Apply across channels",
        "text": "We help roll the system into site, product and marketing touchpoints."
      }
    ],
    "why": [
      "Brand systems built for real channels — web, product UI and campaigns — not logo-only deliverables.",
      "Guidelines that explain usage so freelancers and internal teams stay consistent.",
      "Asset packs scoped to what you will actually use in the next launch cycle.",
      "Coordination with UI/UX so brand and product interfaces feel like one company.",
      "Refresh work that respects equity you already have, when a full rebrand is unnecessary."
    ]
  },
  "seo-services": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Technical & content audit",
        "text": "We assess crawlability, indexation, on-page quality and where search demand actually exists."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Prioritized roadmap",
        "text": "We sequence fixes and content work by impact — foundations first, then growth plays."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Implement & improve",
        "text": "We execute technical fixes, on-page changes and content guidance with your team."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Measure & iterate",
        "text": "We track Search Console and analytics signals and adjust the plan with evidence."
      }
    ],
    "why": [
      "Foundations-first SEO: technical health before content volume for its own sake.",
      "No ranking guarantees — we strengthen what search engines and AI systems can understand.",
      "On-page and information architecture work connected to how people actually navigate.",
      "Local and eCommerce SEO when those are genuine growth channels for your business.",
      "Reporting that highlights progress and next decisions, not vanity dashboards."
    ]
  },
  "technical-seo": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Crawl & index review",
        "text": "We inspect crawl paths, index coverage, canonicals, sitemaps and duplicate URL issues."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Performance & structure plan",
        "text": "We prioritize Core Web Vitals, architecture and structured data gaps that block discovery."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Implement fixes",
        "text": "We ship technical changes, redirects and JSON-LD with validation before and after."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Verify in Search Console",
        "text": "We confirm indexation and crawl behavior improved, then document what to watch next."
      }
    ],
    "why": [
      "Technical SEO that engineers and marketers can both act on.",
      "Migration support with redirect maps and canonical strategy to protect visibility.",
      "Valid JSON-LD only for entities and content types that exist on the page.",
      "Core Web Vitals work tied to real templates — not one-off Lighthouse screenshots.",
      "Clear before/after checks in Search Console so fixes are verified, not assumed."
    ]
  },
  "ai-search-optimization": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Entity & answer audit",
        "text": "We review how clearly your pages state who you are, what you offer and which questions you answer."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Structure for machines",
        "text": "We plan headings, FAQs, entities and schema that make content easier to parse and cite."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Rewrite & mark up",
        "text": "We improve answer-focused sections and implement truthful structured data where it applies."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Monitor discoverability",
        "text": "We watch how pages appear in search and AI surfaces and refine weak topics over time."
      }
    ],
    "why": [
      "AEO work built on solid SEO — entities and answers, not gimmicks.",
      "No promises that AI systems will cite you; we make accurate citation more likely.",
      "Content rewritten to answer real questions instead of repeating keyword variants.",
      "Schema only when it matches visible page content and current policies.",
      "Internal linking that strengthens topical context across related service and resource pages."
    ]
  },
  "cloud-devops": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Infrastructure review",
        "text": "We document hosting, environments, deploy steps, backups and the failure modes that worry you."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Target architecture",
        "text": "We design environments, CI/CD and monitoring appropriate to your stack and risk."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Automate & harden",
        "text": "We implement pipelines, secure configuration, backups and alerts — then migrate carefully."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Operate & optimize",
        "text": "We leave runbooks and can continue with cost, reliability and scaling improvements."
      }
    ],
    "why": [
      "DevOps focused on safer releases and clearer ownership — not tooling fashion.",
      "AWS and comparable cloud setups sized to the product, with cost visibility.",
      "CI/CD that runs the checks your stack actually needs before production.",
      "Monitoring and backups designed so incidents are detectable and recoverable.",
      "Migrations planned with rollback paths instead of Friday-night hope."
    ]
  },
  "server-management": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Server & DNS audit",
        "text": "We review OS, web server, SSL, DNS, email auth and patch status."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Hardening plan",
        "text": "We prioritize security patches, access control, backups and monitoring gaps."
      },
      {
        "icon": "code",
        "no": "03",
        "title": "Configure & migrate",
        "text": "We apply changes or move sites with staged DNS cutover and verification."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Ongoing care",
        "text": "We keep patching, backups and uptime checks on a predictable cadence."
      }
    ],
    "why": [
      "Server work for teams that need reliability without hiring a full-time sysadmin.",
      "DNS and email (SPF/DKIM/DMARC) configured so deliverability is not left to chance.",
      "Migrations tested before DNS cutover to reduce downtime risk.",
      "Security patching and least-privilege access as standard practice.",
      "Clear documentation of what runs where after we leave the environment healthier."
    ]
  },
  "website-maintenance": {
    "process": [
      {
        "icon": "search",
        "no": "01",
        "title": "Site health check",
        "text": "We baseline updates, backups, security, speed and the backlog of small fixes."
      },
      {
        "icon": "compass",
        "no": "02",
        "title": "Care plan setup",
        "text": "We agree a maintenance cadence, response expectations and monthly change budget."
      },
      {
        "icon": "wrench",
        "no": "03",
        "title": "Keep it healthy",
        "text": "We apply updates, monitor uptime/security and complete prioritized small improvements."
      },
      {
        "icon": "check",
        "no": "04",
        "title": "Report & plan ahead",
        "text": "You get a clear summary of what changed and what should be next."
      }
    ],
    "why": [
      "Maintenance that prevents drift — updates, backups and security, not only emergency fixes.",
      "Works for sites we built and sites we inherit after an audit.",
      "Performance watched over time so slow pages are caught before campaigns suffer.",
      "A defined monthly change budget so small requests do not stall indefinitely.",
      "Honest escalation when a fix needs a larger project instead of a quiet band-aid."
    ]
  }
};
