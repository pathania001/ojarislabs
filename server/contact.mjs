/* =====================================================================
   POST /api/contact — validate, spam-check, email hello@ojarislabs.com
   ===================================================================== */
import { getMailConfig, isMailConfigured, sendContactEmail } from "./mail.mjs";
import { rateLimit } from "./rate-limit.mjs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  website: 300,
  service: 120,
  budget: 80,
  timeline: 80,
  details: 5000,
  pageUrl: 500,
  honeypot: 200
};

const stripCtrl = (s) => String(s ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
const trim = (s) => stripCtrl(s).trim();

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function parseBody(req, limitBytes = 32 * 1024) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        reject(Object.assign(new Error("payload_too_large"), { code: "payload_too_large" }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      const type = String(req.headers["content-type"] || "");
      try {
        if (type.includes("application/json")) {
          resolve(JSON.parse(raw));
        } else if (type.includes("application/x-www-form-urlencoded")) {
          const out = {};
          for (const [k, v] of new URLSearchParams(raw)) out[k] = v;
          resolve(out);
        } else {
          // Try JSON first, then form encoding
          try {
            resolve(JSON.parse(raw));
          } catch {
            const out = {};
            for (const [k, v] of new URLSearchParams(raw)) out[k] = v;
            resolve(out);
          }
        }
      } catch {
        reject(Object.assign(new Error("invalid_json"), { code: "invalid_json" }));
      }
    });
    req.on("error", reject);
  });
}

function validate(payload) {
  const errors = [];
  const honeypot = trim(payload["website-hp"] ?? payload.website_hp ?? payload.honeypot ?? "");
  if (honeypot) {
    return { spam: true, data: null, errors: [] };
  }

  const data = {
    name: trim(payload.name),
    email: trim(payload.email).toLowerCase(),
    company: trim(payload.company),
    website: trim(payload.website),
    service: trim(payload.service),
    budget: trim(payload.budget),
    timeline: trim(payload.timeline),
    details: trim(payload.details),
    pageUrl: trim(payload.pageUrl || payload.page_url || ""),
    agree: payload.agree === true || payload.agree === "true" || payload.agree === "on" || payload.agree === "1"
  };

  if (!data.name) errors.push("name");
  else if (data.name.length > LIMITS.name) errors.push("name");

  if (!data.email) errors.push("email");
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.push("email");

  if (!data.details) errors.push("details");
  else if (data.details.length > LIMITS.details) errors.push("details");

  if (!data.agree) errors.push("agree");

  if (data.company.length > LIMITS.company) errors.push("company");
  if (data.website.length > LIMITS.website) errors.push("website");
  if (data.service.length > LIMITS.service) errors.push("service");
  if (data.budget.length > LIMITS.budget) errors.push("budget");
  if (data.timeline.length > LIMITS.timeline) errors.push("timeline");
  if (data.pageUrl.length > LIMITS.pageUrl) errors.push("pageUrl");

  // Soft URL check — optional field
  if (data.website) {
    try {
      const u = new URL(data.website.includes("://") ? data.website : `https://${data.website}`);
      if (!/^https?:$/i.test(u.protocol)) errors.push("website");
    } catch {
      errors.push("website");
    }
  }

  return { spam: false, data, errors: [...new Set(errors)] };
}

function buildEmail(data) {
  const submittedAt = new Date().toISOString();
  const safeName = data.name.replace(/[\r\n]+/g, " ").slice(0, 80);
  const subject = `New OjarisLabs Website Enquiry — ${safeName}`;

  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company || "—"],
    ["Website", data.website || "—"],
    ["Service", data.service || "—"],
    ["Budget", data.budget || "—"],
    ["Timeline", data.timeline || "—"],
    ["Project details", data.details],
    ["Page URL", data.pageUrl || "—"],
    ["Submitted (UTC)", submittedAt]
  ];

  const text = [
    "New enquiry from the OjarisLabs website contact form.",
    "",
    ...rows.map(([k, v]) => `${k}:\n${v}`),
    "",
    "—",
    "Reply directly to this email to respond to the visitor."
  ].join("\n");

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top;color:#555;white-space:nowrap">${escapeHtml(
          k
        )}</th><td style="padding:8px 12px;border-bottom:1px solid #eee;vertical-align:top;color:#111;white-space:pre-wrap">${escapeHtml(
          v
        )}</td></tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5;color:#111;background:#f7f8fa;padding:24px">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <tr><td style="padding:20px 24px;background:#030817;color:#fff">
      <strong style="font-size:18px">OjarisLabs</strong>
      <div style="opacity:.85;font-size:14px;margin-top:4px">New website enquiry</div>
    </td></tr>
    <tr><td style="padding:8px 12px">
      <table width="100%" cellpadding="0" cellspacing="0">${htmlRows}</table>
    </td></tr>
    <tr><td style="padding:16px 24px;font-size:13px;color:#666">
      Reply directly to this email to respond to the visitor.
    </td></tr>
  </table>
</body></html>`;

  return { subject, text, html };
}

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": Buffer.byteLength(payload)
  });
  res.end(payload);
}

export async function handleContact(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    });
    return res.end();
  }

  if (req.method !== "POST") {
    return json(res, 405, { ok: false, error: "method_not_allowed" });
  }

  const ip = clientIp(req);
  const rl = rateLimit(`contact:${ip}`, { windowMs: 15 * 60 * 1000, max: 8 });
  if (!rl.allowed) {
    res.setHeader("Retry-After", String(rl.retryAfterSec));
    return json(res, 429, {
      ok: false,
      error: "rate_limited",
      message: "Too many submissions. Please try again later."
    });
  }

  let payload;
  try {
    payload = await parseBody(req, 32 * 1024);
  } catch (err) {
    if (err.code === "payload_too_large") {
      return json(res, 413, { ok: false, error: "payload_too_large", message: "Submission is too large." });
    }
    return json(res, 400, { ok: false, error: "invalid_body", message: "Could not read the form submission." });
  }

  const { spam, data, errors } = validate(payload);
  if (spam) {
    // Silent success for bots — do not send email
    return json(res, 200, { ok: true });
  }
  if (errors.length) {
    return json(res, 400, {
      ok: false,
      error: "validation_failed",
      fields: errors,
      message: "Please check the highlighted fields and try again."
    });
  }

  if (!isMailConfigured()) {
    console.error("[contact] Mail is not configured. Set SMTP_* and CONTACT_FROM_EMAIL (or CONTACT_DRY_RUN=true).");
    return json(res, 503, {
      ok: false,
      error: "mail_unavailable",
      message: "Email delivery is temporarily unavailable. Please email hello@ojarislabs.com directly."
    });
  }

  const { subject, text, html } = buildEmail(data);
  const result = await sendContactEmail({
    subject,
    text,
    html,
    replyTo: data.email
  });

  if (!result.ok) {
    return json(res, 502, {
      ok: false,
      error: result.code || "mail_send_failed",
      message: "We could not send your message right now. Please try again or email hello@ojarislabs.com."
    });
  }

  return json(res, 200, {
    ok: true,
    message: "Thanks — your message was sent. We typically reply within one business day."
  });
}

export const __test = { validate, buildEmail, escapeHtml, getMailConfig };
