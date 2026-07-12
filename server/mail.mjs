/* =====================================================================
   SMTP mailer — credentials only from environment variables.
   ===================================================================== */
import nodemailer from "nodemailer";

const truthy = (v) => /^(1|true|yes|on)$/i.test(String(v || "").trim());

export function getMailConfig() {
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE !== undefined && process.env.SMTP_SECURE !== ""
      ? truthy(process.env.SMTP_SECURE)
      : port === 465;
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const to = process.env.CONTACT_TO_EMAIL || "hello@ojarislabs.com";
  const from = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_FROM || user;
  const dryRun = truthy(process.env.CONTACT_DRY_RUN);

  return { host, port, secure, user, pass, to, from, dryRun };
}

export function isMailConfigured(cfg = getMailConfig()) {
  if (cfg.dryRun) return true;
  return Boolean(cfg.host && cfg.user && cfg.pass && cfg.from && cfg.to);
}

let transporter;

function getTransporter(cfg) {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass }
  });
  return transporter;
}

/** Reset cached transporter (tests). */
export function resetMailer() {
  transporter = undefined;
}

/**
 * Send enquiry email. Never throws secrets.
 * @returns {{ ok: true, messageId?: string } | { ok: false, code: string }}
 */
export async function sendContactEmail({ subject, text, html, replyTo }) {
  const cfg = getMailConfig();
  if (!isMailConfigured(cfg)) {
    return { ok: false, code: "mail_not_configured" };
  }

  if (cfg.dryRun) {
    console.info("[contact] CONTACT_DRY_RUN — email accepted without SMTP send", {
      to: cfg.to,
      from: cfg.from,
      replyTo,
      subject
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
    console.error("[contact] SMTP send failed:", err && err.message ? err.message : err);
    return { ok: false, code: "mail_send_failed" };
  }
}
