#!/usr/bin/env node
/* =====================================================================
   scripts/test-contact-api.mjs — exercise POST /api/contact locally.
   Uses CONTACT_DRY_RUN=true. Does not send real SMTP mail.
   ===================================================================== */
import { createServer } from "node:http";
import { handleContact } from "../server/contact.mjs";
import { resetRateLimits } from "../server/rate-limit.mjs";
import {
  resetMailer,
  parseEnvBool,
  getMailConfig,
  formatFromHeader,
  isMailConfigured,
  missingMailEnv
} from "../server/mail.mjs";

let failed = 0;
const assert = (label, cond, detail) => {
  if (cond) console.log(`✓ ${label}`);
  else {
    failed++;
    console.error(`✗ ${label}`, detail || "");
  }
};

const MAIL_KEYS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_SECURE",
  "SMTP_USER",
  "SMTP_PASS",
  "CONTACT_TO_EMAIL",
  "CONTACT_FROM_EMAIL",
  "CONTACT_DRY_RUN",
  "SMTP_FROM"
];

function snapshotEnv() {
  const snap = {};
  for (const k of MAIL_KEYS) snap[k] = process.env[k];
  return snap;
}

function restoreEnv(snap) {
  for (const k of MAIL_KEYS) {
    if (snap[k] === undefined) delete process.env[k];
    else process.env[k] = snap[k];
  }
  resetMailer();
}

function withEnv(overrides, fn) {
  const snap = snapshotEnv();
  for (const [k, v] of Object.entries(overrides)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = String(v);
  }
  resetMailer();
  try {
    return fn();
  } finally {
    // Note: for async fn, caller must await before restore — use withEnvAsync instead.
    if (fn.constructor.name !== "AsyncFunction") restoreEnv(snap);
  }
}

async function withEnvAsync(overrides, fn) {
  const snap = snapshotEnv();
  for (const [k, v] of Object.entries(overrides)) {
    if (v === undefined) delete process.env[k];
    else process.env[k] = String(v);
  }
  resetMailer();
  try {
    return await fn();
  } finally {
    restoreEnv(snap);
  }
}

/* ---------- Unit: SMTP_SECURE / config parsing ---------- */
assert('parseEnvBool("true") === true', parseEnvBool("true") === true);
assert('parseEnvBool("false") === false', parseEnvBool("false") === false);
assert('parseEnvBool("FALSE") === false', parseEnvBool("FALSE") === false);
assert('parseEnvBool("") uses fallback', parseEnvBool("", true) === true);
assert("Boolean(\"false\") trap avoided", parseEnvBool("false") !== Boolean("false"));

withEnv(
  {
    SMTP_HOST: "smtp.hostinger.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "true",
    SMTP_USER: "hello@ojarislabs.com",
    SMTP_PASS: "placeholder-not-sent",
    CONTACT_TO_EMAIL: "hello@ojarislabs.com",
    CONTACT_FROM_EMAIL: "hello@ojarislabs.com",
    CONTACT_DRY_RUN: "false"
  },
  () => {
    const cfg = getMailConfig();
    assert("Hostinger host", cfg.host === "smtp.hostinger.com");
    assert("Hostinger port 465", cfg.port === 465);
    assert("Hostinger secure true", cfg.secure === true);
    assert(
      "From display name",
      cfg.from === "OjarisLabs Website <hello@ojarislabs.com>",
      cfg.from
    );
    assert("To address", cfg.to === "hello@ojarislabs.com");
    assert("configured with pass", isMailConfigured(cfg) === true);
  }
);

withEnv(
  {
    SMTP_HOST: "smtp.example.com",
    SMTP_PORT: "587",
    SMTP_SECURE: "false",
    SMTP_USER: "user@example.com",
    SMTP_PASS: "x",
    CONTACT_TO_EMAIL: "hello@ojarislabs.com",
    CONTACT_FROM_EMAIL: "hello@ojarislabs.com",
    CONTACT_DRY_RUN: "false"
  },
  () => {
    const cfg = getMailConfig();
    assert("port 587 secure false", cfg.port === 587 && cfg.secure === false);
  }
);

withEnv(
  {
    SMTP_HOST: "smtp.hostinger.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "true",
    SMTP_USER: "hello@ojarislabs.com",
    SMTP_PASS: undefined,
    CONTACT_TO_EMAIL: "hello@ojarislabs.com",
    CONTACT_FROM_EMAIL: "hello@ojarislabs.com",
    CONTACT_DRY_RUN: "false"
  },
  () => {
    const cfg = getMailConfig();
    assert("missing SMTP_PASS detected", missingMailEnv(cfg).includes("SMTP_PASS"));
    assert("not configured without pass", isMailConfigured(cfg) === false);
  }
);

withEnv(
  {
    SMTP_HOST: "smtp.hostinger.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "true",
    SMTP_USER: undefined,
    SMTP_PASS: "x",
    CONTACT_TO_EMAIL: "hello@ojarislabs.com",
    CONTACT_FROM_EMAIL: "hello@ojarislabs.com",
    CONTACT_DRY_RUN: "false"
  },
  () => {
    const cfg = getMailConfig();
    assert("missing SMTP_USER detected", missingMailEnv(cfg).includes("SMTP_USER"));
  }
);

assert(
  "formatFromHeader",
  formatFromHeader("hello@ojarislabs.com") === "OjarisLabs Website <hello@ojarislabs.com>"
);

/* ---------- HTTP API tests (dry-run) ---------- */
await withEnvAsync(
  {
    CONTACT_DRY_RUN: "true",
    CONTACT_TO_EMAIL: "hello@ojarislabs.com",
    CONTACT_FROM_EMAIL: "hello@ojarislabs.com",
    SMTP_HOST: "smtp.hostinger.com",
    SMTP_PORT: "465",
    SMTP_SECURE: "true",
    SMTP_USER: "hello@ojarislabs.com",
    SMTP_PASS: undefined
  },
  async () => {
    resetRateLimits();
    resetMailer();

    const server = createServer((req, res) => handleContact(req, res));
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address();
    const url = `http://127.0.0.1:${port}/api/contact`;

    const post = async (body) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      return { status: res.status, data };
    };

    const valid = {
      name: "Jane Doe",
      email: "jane@example.com",
      company: "Acme",
      website: "https://example.com",
      service: "Web Development",
      budget: "$5k – $15k",
      timeline: "1–3 months",
      details: "We need a marketing site redesign with CMS editing.",
      agree: "true",
      "website-hp": "",
      pageUrl: "https://ojarislabs.com/contact.html"
    };

    {
      const r = await post(valid);
      assert("valid dry-run submission", r.status === 200 && r.data.ok === true, r);
    }

    {
      const r = await post({ ...valid, email: "not-an-email" });
      assert("invalid email rejected", r.status === 400 && r.data.error === "validation_failed", r);
    }

    {
      const r = await post({ ...valid, name: "", details: "" });
      assert(
        "missing required fields rejected",
        r.status === 400 && Array.isArray(r.data.fields) && r.data.fields.includes("name"),
        r
      );
    }

    {
      const r = await post({ ...valid, "website-hp": "http://spam.test" });
      assert("honeypot accepted silently", r.status === 200 && r.data.ok === true, r);
    }

    {
      const r = await post({ ...valid, agree: "" });
      assert("missing agree rejected", r.status === 400 && r.data.fields.includes("agree"), r);
    }

    {
      process.env.CONTACT_DRY_RUN = "false";
      delete process.env.SMTP_HOST;
      delete process.env.SMTP_USER;
      delete process.env.SMTP_PASS;
      resetMailer();
      const r = await post(valid);
      assert("incomplete SMTP returns 503", r.status === 503 && r.data.ok === false, r);
      assert("503 has no secrets", !JSON.stringify(r.data).toLowerCase().includes("pass"));
      process.env.CONTACT_DRY_RUN = "true";
      process.env.SMTP_HOST = "smtp.hostinger.com";
      process.env.SMTP_USER = "hello@ojarislabs.com";
      resetMailer();
    }

    {
      process.env.CONTACT_DRY_RUN = "false";
      process.env.SMTP_HOST = "smtp.hostinger.com";
      process.env.SMTP_PORT = "465";
      process.env.SMTP_SECURE = "true";
      process.env.SMTP_USER = "hello@ojarislabs.com";
      delete process.env.SMTP_PASS;
      resetMailer();
      const r = await post(valid);
      assert("missing SMTP password returns 503", r.status === 503 && r.data.ok === false, r);
      process.env.CONTACT_DRY_RUN = "true";
      resetMailer();
    }

    {
      resetRateLimits();
      let limited = false;
      for (let i = 0; i < 12; i++) {
        const r = await post(valid);
        if (r.status === 429) {
          limited = true;
          break;
        }
      }
      assert("rate limiting triggers", limited);
    }

    await new Promise((resolve) => server.close(resolve));
  }
);

if (failed) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log("\nAll contact API tests passed.");
