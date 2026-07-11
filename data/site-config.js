/* =====================================================================
   OjarisLabs — Editable site content configuration
   ---------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH for company statistics, contact details and
   social links. Update values here.

   NOTE ON STATISTICS: The final values are ALSO written directly into the
   HTML (e.g. <span class="counter" data-stat="projects" ...>250+</span>) so
   they render correctly for SEO, accessibility and when JavaScript is
   disabled. `js/main.js` reads this config (by the element's `data-stat`
   key) to drive the count-up animation. If you change a value here, mirror
   it in the matching HTML fallback so the no-JS value stays accurate.

   ⚠️ All numbers below are UNVERIFIED placeholders pending business
   confirmation — see CONTENT-TODO.md before publishing.
   ===================================================================== */
window.OJARIS_SITE = {
  // Company performance statistics
  stats: {
    projects:     { value: 250, suffix: "+", label: "Projects Delivered" },
    clients:      { value: 120, suffix: "+", label: "Happy Clients" },
    countries:    { value: 25,  suffix: "+", label: "Countries Served" },
    retention:    { value: 98,  suffix: "%", label: "Client Retention" },
    experience:   { value: 10,  suffix: "+", label: "Years of Innovation" },
    team:         { value: 50,  suffix: "+", label: "Experts & Developers" }
  },

  // Resource library counts (Resources page)
  library: {
    blogArticles: { value: 250, suffix: "+", label: "Blog Articles" },
    guides:       { value: 40,  suffix: "+", label: "Guides & Ebooks" },
    caseStudies:  { value: 30,  suffix: "+", label: "Case Studies" },
    webinars:     { value: 25,  suffix: "+", label: "Webinars" },
    tools:        { value: 20,  suffix: "+", label: "Free Tools" }
  },

  // Contact details — CONFIRM before publishing (see CONTENT-TODO.md)
  contact: {
    email: "hello@ojarislabs.com",
    securityEmail: "security@ojarislabs.com",
    phone: "",                       // intentionally blank until a real number is confirmed
    delivery: "Serving clients worldwide"
  },

  // Social profiles — CONFIRM these URLs exist before publishing
  social: {
    linkedin: "https://www.linkedin.com/company/ojarislabs",
    x: "https://x.com/ojarislabs",
    facebook: "https://facebook.com/ojarislabs",
    youtube: "https://youtube.com/@ojarislabs",
    instagram: "https://instagram.com/ojarislabs"
  }
};
