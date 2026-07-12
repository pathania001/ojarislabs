/* =====================================================================
   OjarisLabs production Node server (Hostinger-compatible).

   - Serves the built static site from dist/ (falls back to repo root)
   - Exposes POST /api/contact for the contact form
   - Listens on PORT (default 3000) on 0.0.0.0

   Start: npm start  (runs build via prestart, then this file)
   ===================================================================== */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { handleContact } from "./contact.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist");
const PUBLIC = existsSync(join(DIST, "index.html")) ? DIST : ROOT;
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".map": "application/json"
};

function safeJoin(base, reqPath) {
  const decoded = decodeURIComponent(reqPath.split("?")[0].split("#")[0]);
  const cleaned = decoded.replace(/^\/+/, "");
  const full = normalize(join(base, cleaned));
  if (!full.startsWith(base + sep) && full !== base) return null;
  return full;
}

async function trySend(res, filePath, status = 200) {
  const data = await readFile(filePath);
  const ext = extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  const cache =
    ext === ".html"
      ? "no-cache, must-revalidate"
      : /\.(css|js|svg|png|jpe?g|webp|ico|woff2?)$/i.test(ext)
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600";
  res.writeHead(status, {
    "Content-Type": type,
    "Content-Length": data.length,
    "Cache-Control": cache
  });
  res.end(data);
}

async function serveStatic(req, res) {
  let pathname = "/";
  try {
    pathname = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`).pathname;
  } catch {
    pathname = "/";
  }

  if (pathname === "/") {
    try {
      return await trySend(res, join(PUBLIC, "index.html"));
    } catch {
      res.writeHead(500).end("Missing index.html — run npm run build");
      return;
    }
  }

  let target = safeJoin(PUBLIC, pathname);
  if (!target) {
    res.writeHead(400).end("Bad request");
    return;
  }

  try {
    let st = await stat(target);
    if (st.isDirectory()) {
      target = join(target, "index.html");
      st = await stat(target);
    }
    if (st.isFile()) return await trySend(res, target);
  } catch {
    /* continue */
  }

  if (!extname(pathname)) {
    const htmlPath = safeJoin(PUBLIC, pathname + ".html");
    if (htmlPath) {
      try {
        const st = await stat(htmlPath);
        if (st.isFile()) return await trySend(res, htmlPath);
      } catch {
        /* 404 */
      }
    }
  }

  try {
    await trySend(res, join(PUBLIC, "404.html"), 404);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") {
      return await handleContact(req, res);
    }
    if (url.pathname.startsWith("/api/")) {
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      return res.end(JSON.stringify({ ok: false, error: "not_found" }));
    }
    return await serveStatic(req, res);
  } catch (err) {
    console.error("[server] Unhandled error:", err && err.message ? err.message : err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: false, error: "server_error", message: "Something went wrong." }));
    }
  }
});

server.listen(PORT, HOST, () => {
  console.log(`OjarisLabs server listening on http://${HOST}:${PORT}`);
  console.log(`Serving static files from ${PUBLIC}`);
  console.log(`Contact API: POST /api/contact`);
});
