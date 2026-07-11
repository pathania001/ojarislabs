#!/usr/bin/env node
/* =====================================================================
   check-links.js — static internal link/asset checker for OjarisLabs
   ---------------------------------------------------------------------
   - Scans every .html file in the project (skips node_modules / .git).
   - Collects href/src values.
   - Ignores mailto:, tel:, http:, https:, //, #-only external schemes,
     javascript: and data: URIs.
   - Resolves each relative (or root-absolute) internal link against the
     document root / the file's directory.
   - Verifies the target file exists; for "#fragment" links verifies the
     matching id exists in the target document.
   - Prints a report and exits non-zero if any broken link is found.
   ===================================================================== */
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const root = process.cwd();

const htmlFiles = [];
(function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".git")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
})(root);

const idCache = new Map();
const fileIds = (p) => {
  if (idCache.has(p)) return idCache.get(p);
  const ids = new Set();
  try {
    const html = readFileSync(p, "utf8");
    const re = /\bid="([^"]+)"/g;
    let m;
    while ((m = re.exec(html))) ids.add(m[1]);
  } catch { /* ignore */ }
  idCache.set(p, ids);
  return ids;
};

const IGNORE = /^(mailto:|tel:|https?:|\/\/|javascript:|data:)/i;
const broken = [];
let linkCount = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const re = /\b(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    if (!raw || IGNORE.test(raw)) continue;
    linkCount++;

    // Fragment-only link → check id in the same page
    if (raw.startsWith("#")) {
      const id = raw.slice(1);
      if (id && !fileIds(file).has(id)) {
        broken.push({ file, link: raw, reason: "fragment id not found in page" });
      }
      continue;
    }

    const [pathPart, frag] = raw.split("#");
    let target = pathPart.startsWith("/")
      ? join(root, pathPart)
      : resolve(dirname(file), pathPart);

    let exists = existsSync(target);
    if (exists && statSync(target).isDirectory()) {
      target = join(target, "index.html");
      exists = existsSync(target);
    }
    if (!exists) {
      broken.push({ file, link: raw, reason: "target file not found" });
      continue;
    }
    if (frag && target.endsWith(".html") && !fileIds(target).has(frag)) {
      broken.push({ file, link: raw, reason: `#${frag} not found in ${relative(root, target)}` });
    }
  }
}

if (broken.length) {
  console.error(`\n\u2717 ${broken.length} broken internal link(s) found (checked ${linkCount} across ${htmlFiles.length} files):\n`);
  for (const b of broken) console.error(`  [${relative(root, b.file)}]  ${b.link}  \u2192  ${b.reason}`);
  console.error("");
  process.exit(1);
}
console.log(`\u2713 No broken internal links. Checked ${linkCount} links across ${htmlFiles.length} HTML files.`);
