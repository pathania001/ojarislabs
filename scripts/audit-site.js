#!/usr/bin/env node
/* =====================================================================
   audit-site.js — full static QA for OjarisLabs.
   Scans every HTML file and reports:
     BROKEN LINK · MISSING IMAGE/CSS/JS · MISSING ANCHOR · EMPTY HREF ·
     PLACEHOLDER # · DUPLICATE TITLE · DUPLICATE META DESCRIPTION ·
     DUPLICATE H1 (indexable) · MISSING/MULTIPLE H1 · MISSING CANONICAL ·
     INCORRECT CANONICAL HOST · MISSING META DESCRIPTION · MISSING ALT ·
     MISSING LANG · LOCALHOST / HOSTINGER PREVIEW URLS · MALFORMED JSON-LD ·
     MISSING SITE SCHEMA · CONFLICTING ORGANIZATION · SITEMAP MISMATCH ·
     ORPHAN INDEXABLE PAGE · ACCIDENTAL NOINDEX ON SITEMAP URL · EMPTY PAGE
   Exits non-zero on hard errors. EMPTY PAGE is a warning.
   Does NOT enforce arbitrary title character-count myths.
   ===================================================================== */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const root = process.cwd();
const SITE_URL = "https://ojarislabs.com";
const ORG_ID = SITE_URL + "/#organization";
const WEBSITE_ID = SITE_URL + "/#website";
const BAD_HOST_RE = /localhost|127\.0\.0\.1|hostingersite\.com|preview\.|staging\.|ojarislabs\.hostinger/i;

const htmlFiles = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === "dist" || e.name.startsWith(".git")) continue;
    const f = join(dir, e.name);
    if (e.isDirectory()) walk(f);
    else if (e.name.endsWith(".html")) htmlFiles.push(f);
  }
})(root);

const idCache = new Map();
const idsOf = (p) => {
  if (idCache.has(p)) return idCache.get(p);
  const ids = new Set();
  try {
    for (const m of readFileSync(p, "utf8").matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]);
  } catch { /* ignore */ }
  idCache.set(p, ids);
  return ids;
};
const IGNORE = /^(mailto:|tel:|https?:|\/\/|javascript:|data:)/i;

const errors = [];
const warnings = [];
const titles = new Map();
const descs = new Map();
const h1s = new Map();
let linkCount = 0;

/** Parse sitemap.xml locs */
const sitemapPath = join(root, "sitemap.xml");
const sitemapUrls = new Set();
if (existsSync(sitemapPath)) {
  for (const m of readFileSync(sitemapPath, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
    sitemapUrls.add(m[1].trim());
  }
} else {
  errors.push(["sitemap.xml", "MISSING SITEMAP.XML"]);
}

/** Collect inbound internal links for orphan detection (path relative to root). */
const inbound = new Map(); // rel html path -> Set of referrers
const ensureInbound = (targetRel) => {
  if (!inbound.has(targetRel)) inbound.set(targetRel, new Set());
  return inbound.get(targetRel);
};

const fileToCanonical = (rel) => {
  if (rel === "index.html") return SITE_URL + "/";
  return SITE_URL + "/" + rel.replace(/\\/g, "/");
};

const parseJsonLdBlocks = (html, rel) => {
  const blocks = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)) {
    try {
      blocks.push(JSON.parse(m[1]));
    } catch (err) {
      errors.push([rel, `MALFORMED JSON-LD: ${err.message}`]);
    }
  }
  return blocks;
};

const collectTypes = (node, out = []) => {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    for (const n of node) collectTypes(n, out);
    return out;
  }
  if (node["@type"]) {
    const t = node["@type"];
    out.push(...(Array.isArray(t) ? t : [t]));
  }
  if (node["@graph"]) collectTypes(node["@graph"], out);
  return out;
};

const findByType = (blocks, type) => {
  const found = [];
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    const t = node["@type"];
    const types = Array.isArray(t) ? t : t ? [t] : [];
    if (types.includes(type)) found.push(node);
    if (node["@graph"]) walk(node["@graph"]);
  };
  for (const b of blocks) walk(b);
  return found;
};

for (const file of htmlFiles) {
  const rel = relative(root, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const noindex = /name="robots"\s+content="[^"]*noindex/i.test(html);

  if (!/<html[^>]*\blang=/i.test(html)) errors.push([rel, "MISSING LANG"]);

  if (BAD_HOST_RE.test(html)) {
    const hits = [...html.matchAll(/(https?:\/\/[^\s"'<>]+)/gi)]
      .map((m) => m[1])
      .filter((u) => BAD_HOST_RE.test(u));
    if (hits.length) errors.push([rel, `NON-PRODUCTION URL: ${[...new Set(hits)].slice(0, 3).join(", ")}`]);
  }

  // links & assets
  const refs = [];
  for (const m of html.matchAll(/\b(?:href|src)="([^"]*)"/g)) refs.push(m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]*)"/g)) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u) refs.push(u);
    }
  }

  for (const raw0 of refs) {
    const raw = raw0.trim();
    if (raw === "") {
      errors.push([rel, "EMPTY HREF/SRC"]);
      continue;
    }
    if (raw === "#") {
      errors.push([rel, "PLACEHOLDER # link"]);
      continue;
    }
    if (IGNORE.test(raw)) continue;
    linkCount++;
    if (raw.startsWith("#")) {
      if (!idsOf(file).has(raw.slice(1))) errors.push([rel, `MISSING ANCHOR ${raw}`]);
      continue;
    }
    const [pathAndQuery, frag] = raw.split("#");
    const [p] = pathAndQuery.split("?");
    let target = p.startsWith("/") ? join(root, p) : resolve(dirname(file), p);
    let ok = existsSync(target);
    if (ok && statSync(target).isDirectory()) {
      target = join(target, "index.html");
      ok = existsSync(target);
    }
    if (!ok) {
      const kind = /\.(png|jpe?g|webp|avif|svg|gif|ico)$/i.test(p)
        ? "MISSING IMAGE"
        : /\.css$/i.test(p)
          ? "MISSING CSS"
          : /\.js$/i.test(p)
            ? "MISSING JS"
            : "BROKEN LINK";
      errors.push([rel, `${kind}: ${raw}`]);
      continue;
    }
    if (frag && target.endsWith(".html") && !idsOf(target).has(frag)) {
      errors.push([rel, `MISSING ANCHOR ${raw}`]);
    }
    // inbound graph for html targets
    if (target.endsWith(".html")) {
      const tRel = relative(root, target).replace(/\\/g, "/");
      ensureInbound(tRel).add(rel);
    }
  }

  // images missing alt
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\balt=/.test(img)) errors.push([rel, "MISSING ALT: " + img.slice(0, 60) + "…"]);
  }

  // JSON-LD (all pages including 404)
  const ldBlocks = parseJsonLdBlocks(html, rel);
  if (!noindex) {
    const orgs = findByType(ldBlocks, "Organization");
    const sites = findByType(ldBlocks, "WebSite");
    const pages = [
      ...findByType(ldBlocks, "WebPage"),
      ...findByType(ldBlocks, "AboutPage"),
      ...findByType(ldBlocks, "ContactPage"),
      ...findByType(ldBlocks, "CollectionPage")
    ];
    if (!orgs.length) errors.push([rel, "MISSING ORGANIZATION SCHEMA"]);
    else {
      const ids = [...new Set(orgs.map((o) => o["@id"]).filter(Boolean))];
      if (ids.length > 1) errors.push([rel, `CONFLICTING ORGANIZATION @id: ${ids.join(", ")}`]);
      for (const o of orgs) {
        if (o["@id"] && o["@id"] !== ORG_ID) {
          errors.push([rel, `UNEXPECTED ORGANIZATION @id ${o["@id"]} (expected ${ORG_ID})`]);
        }
        if (o.name && o.name !== "OjarisLabs") {
          errors.push([rel, `ORGANIZATION NAME MISMATCH: ${o.name}`]);
        }
        if (o.sameAs) {
          const list = Array.isArray(o.sameAs) ? o.sameAs : [o.sameAs];
          for (const u of list) {
            if (!u || typeof u !== "string") errors.push([rel, "EMPTY sameAs ENTRY"]);
          }
        }
      }
    }
    if (!sites.length) errors.push([rel, "MISSING WEBSITE SCHEMA"]);
    else {
      for (const s of sites) {
        if (s["@id"] && s["@id"] !== WEBSITE_ID) {
          errors.push([rel, `UNEXPECTED WEBSITE @id ${s["@id"]} (expected ${WEBSITE_ID})`]);
        }
      }
    }
    if (!pages.length) errors.push([rel, "MISSING WEBPAGE SCHEMA"]);

    // FAQPage must have visible FAQ markup when present
    const faqs = findByType(ldBlocks, "FAQPage");
    if (faqs.length && !/class="faq-item"|class="faq-list"|class="faq-accordion"/.test(html)) {
      errors.push([rel, "FAQPAGE SCHEMA WITHOUT VISIBLE FAQ MARKUP"]);
    }

    // Forbidden claim-heavy schema types
    const banned = ["AggregateRating", "Review", "LocalBusiness"];
    const allTypes = collectTypes(ldBlocks);
    for (const b of banned) {
      if (allTypes.includes(b)) errors.push([rel, `UNSUPPORTED SCHEMA TYPE: ${b}`]);
    }
  }

  if (noindex) {
    const canon = fileToCanonical(rel);
    if (sitemapUrls.has(canon)) errors.push([rel, `NOINDEX URL PRESENT IN SITEMAP: ${canon}`]);
    continue; // exempt 404 from SEO/dup/empty checks
  }

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim();
  if (!title) errors.push([rel, "MISSING TITLE"]);
  else (titles.get(title) || titles.set(title, []).get(title)).push(rel);

  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1]?.trim();
  if (!desc) errors.push([rel, "MISSING META DESCRIPTION"]);
  else (descs.get(desc) || descs.set(desc, []).get(desc)).push(rel);

  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)].map((m) => m[1]);
  if (canonicals.length !== 1) errors.push([rel, `CANONICAL COUNT ${canonicals.length}`]);
  else {
    const c = canonicals[0];
    if (!c.startsWith(SITE_URL + "/")) errors.push([rel, `INCORRECT CANONICAL HOST ${c}`]);
    else if (/[?#]/.test(c)) errors.push([rel, `MALFORMED CANONICAL ${c}`]);
    else if (c !== fileToCanonical(rel)) {
      // allow only exact self-ref based on file path
      errors.push([rel, `CANONICAL MISMATCH expected ${fileToCanonical(rel)} got ${c}`]);
    }
  }

  const requiredMeta = [
    [/property="og:title"/, "MISSING OG TITLE"],
    [/property="og:description"/, "MISSING OG DESCRIPTION"],
    [/property="og:url"/, "MISSING OG URL"],
    [/property="og:type"/, "MISSING OG TYPE"],
    [/property="og:image"/, "MISSING OG IMAGE"],
    [/name="twitter:card"/, "MISSING TWITTER CARD"],
    [/name="twitter:title"/, "MISSING TWITTER TITLE"],
    [/name="twitter:description"/, "MISSING TWITTER DESCRIPTION"],
    [/name="twitter:image"/, "MISSING TWITTER IMAGE"],
    [/name="viewport"/, "MISSING VIEWPORT"],
    [/charset=/i, "MISSING CHARSET"],
    [/rel="icon"/, "MISSING FAVICON"]
  ];
  for (const [re, label] of requiredMeta) if (!re.test(html)) errors.push([rel, label]);

  // og:image / twitter:image must be production absolute and file must exist locally
  for (const prop of ["og:image", "twitter:image"]) {
    const re = prop.startsWith("og:")
      ? /property="og:image"\s+content="([^"]+)"/
      : /name="twitter:image"\s+content="([^"]+)"/;
    const m = html.match(re);
    if (m) {
      const url = m[1];
      if (!url.startsWith(SITE_URL + "/")) errors.push([rel, `NON-PRODUCTION ${prop.toUpperCase()} ${url}`]);
      else {
        const local = join(root, url.slice(SITE_URL.length + 1).split("?")[0]);
        if (!existsSync(local)) errors.push([rel, `MISSING SOCIAL IMAGE FILE for ${prop}: ${url}`]);
      }
    }
  }

  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupIds.length) errors.push([rel, `DUPLICATE IDS: ${[...new Set(dupIds)].join(", ")}`]);

  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];
  if (h1Matches.length === 0) errors.push([rel, "MISSING H1"]);
  else if (h1Matches.length > 1) errors.push([rel, `MULTIPLE H1 (${h1Matches.length})`]);
  else {
    const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    (h1s.get(h1Text) || h1s.set(h1Text, []).get(h1Text)).push(rel);
  }

  // Placeholder / lorem content
  if (/\blorem ipsum\b/i.test(html)) errors.push([rel, "LOREM IPSUM CONTENT"]);
  if (/\bTODO:\s*(?!simulate|wire|replace)/i.test(html) && /<(?:p|h[1-6]|li|span)[^>]*>[^<]*TODO/i.test(html)) {
    warnings.push([rel, "TODO TEXT MAY BE VISIBLE"]);
  }

  // EMPTY PAGE heuristic
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) warnings.push([rel, "EMPTY PAGE: no <main> element"]);
  else {
    const text = mainMatch[0]
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text.length < 350) warnings.push([rel, `EMPTY PAGE: only ${text.length} chars of visible text in <main>`]);
  }

  // Sitemap inclusion for indexable pages
  const expectedCanon = fileToCanonical(rel);
  if (!sitemapUrls.has(expectedCanon)) {
    errors.push([rel, `INDEXABLE PAGE MISSING FROM SITEMAP: ${expectedCanon}`]);
  }
}

for (const [t, fs] of titles) if (fs.length > 1) errors.push([fs[0], `DUPLICATE TITLE "${t}" → ${fs.join(", ")}`]);
for (const [d, fs] of descs) if (fs.length > 1) errors.push([fs[0], `DUPLICATE META DESCRIPTION → ${fs.join(", ")}`]);
for (const [h, fs] of h1s) if (fs.length > 1) errors.push([fs[0], `DUPLICATE H1 "${h}" → ${fs.join(", ")}`]);

// Sitemap URLs must map to existing indexable files
for (const loc of sitemapUrls) {
  if (!loc.startsWith(SITE_URL + "/")) {
    errors.push(["sitemap.xml", `NON-PRODUCTION SITEMAP URL ${loc}`]);
    continue;
  }
  const pathPart = loc === SITE_URL + "/" ? "index.html" : loc.slice((SITE_URL + "/").length);
  const full = join(root, pathPart);
  if (!existsSync(full)) errors.push(["sitemap.xml", `SITEMAP URL FILE MISSING: ${loc}`]);
  else {
    const html = readFileSync(full, "utf8");
    if (/name="robots"\s+content="[^"]*noindex/i.test(html)) {
      errors.push(["sitemap.xml", `SITEMAP INCLUDES NOINDEX PAGE: ${loc}`]);
    }
  }
}

// Orphan detection: indexable pages with no inbound links from other pages (nav/footer usually covers most)
const navSafe = new Set(["404.html"]);
for (const file of htmlFiles) {
  const rel = relative(root, file).replace(/\\/g, "/");
  if (navSafe.has(rel)) continue;
  const html = readFileSync(file, "utf8");
  if (/name="robots"\s+content="[^"]*noindex/i.test(html)) continue;
  const refs = inbound.get(rel) || new Set();
  const externalRefs = [...refs].filter((r) => r !== rel);
  if (externalRefs.length === 0) {
    errors.push([rel, "ORPHAN INDEXABLE PAGE (no inbound internal links detected)"]);
  }
}

// robots.txt sanity
const robotsPath = join(root, "robots.txt");
if (!existsSync(robotsPath)) errors.push(["robots.txt", "MISSING ROBOTS.TXT"]);
else {
  const robots = readFileSync(robotsPath, "utf8");
  if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
    errors.push(["robots.txt", "MISSING OR INCORRECT SITEMAP DIRECTIVE"]);
  }
  if (BAD_HOST_RE.test(robots)) errors.push(["robots.txt", "NON-PRODUCTION URL IN ROBOTS.TXT"]);
}

console.log(`Audited ${htmlFiles.length} HTML files, ${linkCount} internal links, ${sitemapUrls.size} sitemap URLs.\n`);
if (warnings.length) {
  console.log(`\u26A0 ${warnings.length} warning(s):`);
  for (const [f, m] of warnings) console.log(`  [${f}] ${m}`);
  console.log("");
}
if (errors.length) {
  console.error(`\u2717 ${errors.length} error(s):`);
  for (const [f, m] of errors) console.error(`  [${f}] ${m}`);
  process.exit(1);
}
console.log(
  "\u2713 No errors. Links, assets, anchors, titles, descriptions, H1s, canonicals, alts, lang, schema, sitemap and orphans all pass."
);
