/* =====================================================================
   SMTP mailer — credentials only from environment variables.
   Hostinger production: smtp.hostinger.com:465 (implicit TLS, secure=true).
   Never log SMTP_PASS or auth objects.
   ===================================================================== */
import nodemailer from "nodemailer";

/** Parse env boolean strings correctly. Never use Boolean(process.env.X) — Boolean("false") is true. */
export function parseEnvBool(value, fallback = false) {
  if (value === undefined || value === null || String(value).trim() === "") return fallback;
  const v = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(v)) return true;
  if (["0", "false", "no", "off"].includes(v)) return false;
  return fallback;
}

/** Hostinger: SMTP_SECURE=true → secure:true (implicit TLS on 465). */
export function parseSmtpSecure(value, portFallback) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return Number.isFinite(portFallback) && portFallback === 465;
  }
  // Explicit requirement: treat only the string "true" (case-insensitive) as secure.
  return String(value).toLowerCase() === "true";
}

const DEFAULT_TO = "hello@ojarislabs.com";
const DEFAULT_FROM_ADDRESS = "hello@ojarislabs.com";
const DEFAULT_FROM_NAME = "OjarisLabs Website";

/** Build a display From header without using the visitor address. */
export function formatFromHeader(address, name = DEFAULT_FROM_NAME) {
  const addr = String(address || DEFAULT_FROM_ADDRESS).trim();
  // If already in "Name <email>" form, keep it.
  if (/<[^>]+>/.test(addr)) return addr;
  return `${name} <${addr}>`;
}

export function getMailConfig() {
  const host = String(process.env.SMTP_HOST || "").trim();
  const portRaw = String(process.env.SMTP_PORT || "").trim();
  const port = portRaw ? Number(portRaw) : 465;
  const secure = parseSmtpSecure(
    process.env.SMTP_SECURE,
    // Hostinger port 465 uses implicit TLS; STARTTLS ports (e.g. 587) use secure=false
    Number.isFinite(port) ? port : 465
  );
  const user = String(process.env.SMTP_USER || "").trim();
  const pass = String(process.env.SMTP_PASS || "");
  const to = String(process.env.CONTACT_TO_EMAIL || DEFAULT_TO).trim() || DEFAULT_TO;
  const fromAddress =
    String(process.env.CONTACT_FROM_EMAIL || process.env.SMTP_FROM || user || DEFAULT_FROM_ADDRESS).trim() ||
    DEFAULT_FROM_ADDRESS;
  const from = formatFromHeader(fromAddress);
  const dryRun = parseEnvBool(process.env.CONTACT_DRY_RUN, false);

  return {
    host,
    port: Number.isFinite(port) ? port : 465,
    secure,
    user,
    pass,
    to,
    from,
    fromAddress,
    dryRun
  };
}

/** Required production SMTP variables (dry-run bypasses SMTP credential checks). */
export function missingMailEnv(cfg = getMailConfig()) {
  if (cfg.dryRun) return [];
  const missing = [];
  if (!cfg.host) missing.push("SMTP_HOST");
  if (!process.env.SMTP_PORT && !cfg.port) missing.push("SMTP_PORT");
  if (process.env.SMTP_SECURE === undefined || String(process.env.SMTP_SECURE).trim() === "") {
    // Port-based default is allowed, but production Hostinger docs set SMTP_SECURE explicitly.
    // Treat missing SMTP_SECURE as OK when port implies it; still require host/user/pass/from/to.
  }
  if (!Number.isFinite(cfg.port) || cfg.port <= 0) missing.push("SMTP_PORT");
  if (!cfg.user) missing.push("SMTP_USER");
  if (!cfg.pass) missing.push("SMTP_PASS");
  if (!cfg.fromAddress) missing.push("CONTACT_FROM_EMAIL");
  if (!cfg.to) missing.push("CONTACT_TO_EMAIL");
  return missing;
}

export function isMailConfigured(cfg = getMailConfig()) {
  if (cfg.dryRun) return true;
  return missingMailEnv(cfg).length === 0;
}

let transporter;
let transporterKey = "";

function transporterCacheKey(cfg) {
  // Never include the password in logs; key is only for cache invalidation in-process.
  return [cfg.host, cfg.port, cfg.secure ? "1" : "0", cfg.user].join("|");
}

function getTransporter(cfg) {
  const key = transporterCacheKey(cfg);
  if (transporter && transporterKey === key) return transporter;
  transporterKey = key;
  transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure, // true for 465 implicit TLS
    auth: {
      user: cfg.user,
      pass: cfg.pass
    },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
    tls: {
      // Keep certificate validation enabled for smtp.hostinger.com
      minVersion: "TLSv1.2"
    }
  });
  return transporter;
}

/** Reset cached transporter (tests). */
export function resetMailer() {
  transporter = undefined;
  transporterKey = "";
}

/**
 * Send enquiry email. Never throws secrets; never logs SMTP_PASS.
 * @returns {{ ok: true, messageId?: string } | { ok: false, code: string }}
 */
export async function sendContactEmail({ subject, text, html, replyTo }) {
  const cfg = getMailConfig();
  if (!isMailConfigured(cfg)) {
    const missing = missingMailEnv(cfg);
    console.error(
      "CONTACT_API_CONFIG_MISSING",
      missing.length ? missing.join(", ") : "unknown"
    );
    return { ok: false, code: "mail_not_configured" };
  }

  if (cfg.dryRun) {
    console.info("[contact] CONTACT_DRY_RUN — validation OK; no SMTP send", {
      to: cfg.to,
      from: cfg.from,
      replyTo,
      subject,
      host: cfg.host || "(dry-run)",
      port: cfg.port,
      secure: cfg.secure
    });
    return { ok: true, messageId: "dry-run" };
  }

  try {
    const info = await getTransporter(cfg).sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo,
      subject,
      text,
      html
    });
    return { ok: true, messageId: info.messageId };
  } catch (err) {
    // Sanitized operational log only — never dump auth, env, or SMTP_PASS.
    const code = err && err.code ? String(err.code) : "SMTP_ERROR";
    const msg = err && err.message ? String(err.message).slice(0, 200) : "send failed";
    const category =
      code === "EAUTH" || /auth/i.test(msg)
        ? "CONTACT_API_SMTP_AUTH_FAILED"
        : code === "ECONNECTION" || code === "ETIMEDOUT" || code === "ESOCKET" || code === "ECONNREFUSED"
          ? "CONTACT_API_SMTP_CONNECTION_FAILED"
          : "CONTACT_API_SEND_FAILED";
    console.error(`${category} (${code}): ${msg}`);
    return { ok: false, code: "mail_send_failed" };
  }
}
