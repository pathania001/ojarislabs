#!/usr/bin/env node
/* =====================================================================
   audit-site.js — full static QA for OjarisLabs.
   Scans every HTML file and reports:
     BROKEN LINK · MISSING IMAGE/CSS/JS · MISSING ANCHOR · EMPTY HREF ·
     PLACEHOLDER # · DUPLICATE TITLE · DUPLICATE META DESCRIPTION ·
     MISSING/MULTIPLE H1 · MISSING CANONICAL · MISSING META DESCRIPTION ·
     MISSING ALT · EMPTY PAGE
   Exits non-zero on hard errors. EMPTY PAGE is a warning.
   ===================================================================== */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const root = process.cwd();
const SITE_URL = "https://ojarislabs.com";
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
  try { for (const m of readFileSync(p, "utf8").matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]); } catch {}
  idCache.set(p, ids); return ids;
};
const IGNORE = /^(mailto:|tel:|https?:|\/\/|javascript:|data:)/i;

const errors = [];
const warnings = [];
const titles = new Map();
const descs = new Map();
let linkCount = 0;

for (const file of htmlFiles) {
  const rel = relative(root, file);
  const html = readFileSync(file, "utf8");
  const noindex = /name="robots" content="noindex/.test(html);

  // links & assets (href, src, and srcset URLs)
  const refs = [];
  for (const m of html.matchAll(/\b(?:href|src)="([^"]*)"/g)) refs.push(m[1]);
  for (const m of html.matchAll(/\bsrcset="([^"]*)"/g)) for (const part of m[1].split(",")) { const u = part.trim().split(/\s+/)[0]; if (u) refs.push(u); }

  for (const raw0 of refs) {
    const raw = raw0.trim();
    if (raw === "" ) { errors.push([rel, "EMPTY HREF/SRC"]); continue; }
    if (raw === "#") { errors.push([rel, "PLACEHOLDER # link"]); continue; }
    if (IGNORE.test(raw)) continue;
    linkCount++;
    if (raw.startsWith("#")) { if (!idsOf(file).has(raw.slice(1))) errors.push([rel, `MISSING ANCHOR ${raw}`]); continue; }
    const [pathAndQuery, frag] = raw.split("#");
    const [p] = pathAndQuery.split("?");
    let target = p.startsWith("/") ? join(root, p) : resolve(dirname(file), p);
    let ok = existsSync(target);
    if (ok && statSync(target).isDirectory()) { target = join(target, "index.html"); ok = existsSync(target); }
    if (!ok) {
      const kind = /\.(png|jpe?g|webp|avif|svg|gif)$/i.test(p) ? "MISSING IMAGE" : /\.css$/i.test(p) ? "MISSING CSS" : /\.js$/i.test(p) ? "MISSING JS" : "BROKEN LINK";
      errors.push([rel, `${kind}: ${raw}`]); continue;
    }
    if (frag && target.endsWith(".html") && !idsOf(target).has(frag)) errors.push([rel, `MISSING ANCHOR ${raw}`]);
  }

  // images missing alt
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\balt=/.test(img)) errors.push([rel, "MISSING ALT: " + img.slice(0, 60) + "…"]);

  if (noindex) continue; // exempt 404 from SEO/dup/empty checks

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1]?.trim();
  if (!title) errors.push([rel, "MISSING TITLE"]); else (titles.get(title) || titles.set(title, []).get(title)).push(rel);
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1]?.trim();
  if (!desc) errors.push([rel, "MISSING META DESCRIPTION"]); else (descs.get(desc) || descs.set(desc, []).get(desc)).push(rel);
  const canonicals = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)].map((m) => m[1]);
  if (canonicals.length !== 1) errors.push([rel, `CANONICAL COUNT ${canonicals.length}`]);
  else if (!canonicals[0].startsWith(SITE_URL + "/")) errors.push([rel, `NON-PRODUCTION CANONICAL ${canonicals[0]}`]);
  else if (/[?#]/.test(canonicals[0])) errors.push([rel, `MALFORMED CANONICAL ${canonicals[0]}`]);
  const requiredMeta = [
    [/property="og:title"/, "MISSING OG TITLE"],
    [/property="og:description"/, "MISSING OG DESCRIPTION"],
    [/property="og:url"/, "MISSING OG URL"],
    [/property="og:type"/, "MISSING OG TYPE"],
    [/property="og:image"/, "MISSING OG IMAGE"],
    [/name="twitter:card"/, "MISSING TWITTER CARD"],
    [/name="twitter:title"/, "MISSING TWITTER TITLE"],
    [/name="twitter:description"/, "MISSING TWITTER DESCRIPTION"],
    [/name="viewport"/, "MISSING VIEWPORT"],
    [/charset=/i, "MISSING CHARSET"],
    [/rel="icon"/, "MISSING FAVICON"]
  ];
  for (const [re, label] of requiredMeta) if (!re.test(html)) errors.push([rel, label]);
  for (const m of html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (err) { errors.push([rel, `INVALID JSON-LD: ${err.message}`]); }
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dupIds.length) errors.push([rel, `DUPLICATE IDS: ${[...new Set(dupIds)].join(", ")}`]);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 === 0) errors.push([rel, "MISSING H1"]); else if (h1 > 1) errors.push([rel, `MULTIPLE H1 (${h1})`]);

  // EMPTY PAGE heuristic
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) warnings.push([rel, "EMPTY PAGE: no <main> element"]);
  else {
    const text = mainMatch[0].replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
    if (text.length < 350) warnings.push([rel, `EMPTY PAGE: only ${text.length} chars of visible text in <main>`]);
  }
}
for (const [t, fs] of titles) if (fs.length > 1) errors.push([fs[0], `DUPLICATE TITLE "${t}" → ${fs.join(", ")}`]);
for (const [d, fs] of descs) if (fs.length > 1) errors.push([fs[0], `DUPLICATE META DESCRIPTION → ${fs.join(", ")}`]);

console.log(`Audited ${htmlFiles.length} HTML files, ${linkCount} internal links.\n`);
if (warnings.length) { console.log(`\u26A0 ${warnings.length} warning(s):`); for (const [f, m] of warnings) console.log(`  [${f}] ${m}`); console.log(""); }
if (errors.length) {
  console.error(`\u2717 ${errors.length} error(s):`);
  for (const [f, m] of errors) console.error(`  [${f}] ${m}`);
  process.exit(1);
}
console.log("\u2713 No errors. Links, assets, anchors, titles, descriptions, H1s, canonicals and alts all pass.");
