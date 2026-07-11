/* =====================================================================
   OjarisLabs — main.js
   Progressive-enhancement interactions. No external dependencies.
   ===================================================================== */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Header scroll state ---------- */
  const header = $(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */
  const navToggle = $(".nav-toggle");
  const nav = $("#primary-nav");
  const backdrop = $(".nav-backdrop");
  const closeMenu = () => {
    document.body.classList.remove("menu-open", "no-scroll");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  };
  const openMenu = () => {
    document.body.classList.add("menu-open", "no-scroll");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  };
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
    if (backdrop) backdrop.addEventListener("click", closeMenu);
    $$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
        closeMenu();
        navToggle.focus();
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Scroll reveal + count-up + process line ---------- */
  const revealEls = $$(".reveal");
  const countEls = $$("[data-count]");
  const processEls = $$(".process");

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = (String(target).split(".")[1] || "").length;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = val.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.classList.contains("reveal")) el.classList.add("is-visible");
          if (el.hasAttribute("data-count")) animateCount(el);
          if (el.classList.contains("process")) {
            const line = $(".line-progress", el);
            if (line) line.style.width = "84%";
          }
          obs.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.15 }
    );
    [...revealEls, ...countEls, ...processEls].forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    countEls.forEach((el) => {
      el.textContent = parseFloat(el.dataset.count).toString() + (el.dataset.suffix || "");
    });
    processEls.forEach((el) => {
      const line = $(".line-progress", el);
      if (line) line.style.width = "84%";
    });
  }

  /* ---------- Testimonial slider ---------- */
  $$("[data-slider]").forEach((slider) => {
    const track = $(".slider-track", slider);
    const slides = $$(".testimonial", track);
    const dotsWrap = $(".slider-dots", slider);
    if (!track || slides.length === 0) return;

    // Only run slider behaviour when slides are stacked (mobile). On desktop
    // all three are visible in a grid, so we skip transforms.
    let index = 0;
    const isStacked = () => window.innerWidth <= 980;

    if (dotsWrap) {
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.setAttribute("aria-label", `Show testimonial ${i + 1}`);
        b.setAttribute("aria-selected", i === 0 ? "true" : "false");
        b.addEventListener("click", () => go(i));
        dotsWrap.appendChild(b);
      });
    }
    const dots = dotsWrap ? $$("button", dotsWrap) : [];

    function render() {
      if (isStacked()) {
        track.style.display = "flex";
        track.style.transition = "transform .5s var(--ease)";
        slides.forEach((s) => (s.style.flex = "0 0 100%"));
        track.style.transform = `translateX(-${index * 100}%)`;
      } else {
        track.style.display = "";
        track.style.transform = "";
        slides.forEach((s) => (s.style.flex = ""));
      }
      dots.forEach((d, i) => d.setAttribute("aria-selected", i === index ? "true" : "false"));
    }
    function go(i) {
      index = (i + slides.length) % slides.length;
      render();
    }
    render();
    window.addEventListener("resize", render);

    if (!prefersReduced) {
      let timer = setInterval(() => { if (isStacked()) go(index + 1); }, 5500);
      slider.addEventListener("mouseenter", () => clearInterval(timer));
    }
  });

  /* ---------- Resources: search + filter ---------- */
  const resGrid = $("#resource-grid");
  if (resGrid) {
    const cards = $$("[data-resource]", resGrid);
    const searchInput = $("#resource-search");
    const tabs = $$(".filter-tab");
    const empty = $("#resource-empty");
    let activeCat = "all";

    const apply = () => {
      const q = (searchInput ? searchInput.value : "").trim().toLowerCase();
      let shown = 0;
      cards.forEach((card) => {
        const cat = card.dataset.category;
        const text = (card.dataset.search || card.textContent).toLowerCase();
        const matchCat = activeCat === "all" || cat === activeCat;
        const matchText = !q || text.includes(q);
        const show = matchCat && matchText;
        card.hidden = !show;
        if (show) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    };

    if (searchInput) searchInput.addEventListener("input", apply);
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
        tab.setAttribute("aria-selected", "true");
        activeCat = tab.dataset.filter;
        apply();
      });
    });
  }

  /* ---------- Forms: validation + submit states ---------- */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function markField(field, valid, msg) {
    field.classList.toggle("invalid", !valid);
    const err = $(".error-msg", field);
    if (err && msg && !valid) err.textContent = msg;
  }

  function validateField(control) {
    const field = control.closest(".field") || control.closest(".checkbox");
    if (!field) return true;
    let valid = true;
    let msg = "";
    if (control.type === "checkbox") {
      valid = control.checked;
      msg = "Please accept to continue.";
    } else if (control.hasAttribute("required") && !control.value.trim()) {
      valid = false;
      msg = "This field is required.";
    } else if (control.type === "email" && control.value && !emailRe.test(control.value)) {
      valid = false;
      msg = "Enter a valid email address.";
    } else if (control.type === "tel" && control.value && control.value.replace(/\D/g, "").length < 7) {
      valid = false;
      msg = "Enter a valid phone number.";
    }
    if (field.classList.contains("field")) markField(field, valid, msg);
    else field.classList.toggle("invalid", !valid);
    return valid;
  }

  $$("form[data-validate]").forEach((form) => {
    const controls = $$("input, textarea, select", form).filter((c) => c.type !== "hidden");
    const status = $(".form-status", form);
    const submitBtn = $("button[type=submit]", form);

    controls.forEach((c) => {
      c.addEventListener("blur", () => validateField(c));
      c.addEventListener("input", () => {
        const field = c.closest(".field");
        if (field && field.classList.contains("invalid")) validateField(c);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      let firstInvalid = null;
      controls.forEach((c) => {
        const v = validateField(c);
        if (!v && !firstInvalid) firstInvalid = c;
        ok = ok && v;
      });
      if (status) status.className = "form-status";

      if (!ok) {
        if (status) {
          status.classList.add("error", "is-visible");
          status.textContent = "Please fix the highlighted fields and try again.";
        }
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulated async submit — swap with real endpoint / anti-spam token later.
      if (submitBtn) submitBtn.classList.add("is-loading");
      setTimeout(() => {
        if (submitBtn) submitBtn.classList.remove("is-loading");
        if (status) {
          status.classList.add("success", "is-visible");
          status.textContent = form.dataset.success || "Thanks! Your message has been received. We'll be in touch shortly.";
        }
        form.reset();
      }, 1100);
    });
  });

  /* ---------- Current year available immediately ---------- */
})();
