#!/usr/bin/env node
/* =====================================================================
   scripts/test-contact-api.mjs — exercise POST /api/contact locally.
   Starts an ephemeral server with CONTACT_DRY_RUN=true.
   ===================================================================== */
import { createServer } from "node:http";
import { handleContact } from "../server/contact.mjs";
import { resetRateLimits } from "../server/rate-limit.mjs";
import { resetMailer } from "../server/mail.mjs";

process.env.CONTACT_DRY_RUN = "true";
process.env.CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "hello@ojarislabs.com";
process.env.CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "hello@ojarislabs.com";

resetRateLimits();
resetMailer();

const server = createServer((req, res) => handleContact(req, res));
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const url = `http://127.0.0.1:${port}/api/contact`;

const post = async (body, headers = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
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

let failed = 0;
const assert = (label, cond, detail) => {
  if (cond) console.log(`✓ ${label}`);
  else {
    failed++;
    console.error(`✗ ${label}`, detail || "");
  }
};

{
  const r = await post(valid);
  assert("valid submission", r.status === 200 && r.data.ok === true, r);
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
  // Force mail failure path by disabling dry-run and clearing SMTP
  resetMailer();
  process.env.CONTACT_DRY_RUN = "false";
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_USER;
  delete process.env.SMTP_PASS;
  const r = await post(valid);
  assert("mail unavailable returns 503", r.status === 503 && r.data.ok === false, r);
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

server.close();
if (failed) {
  console.error(`\n${failed} test(s) failed`);
  process.exit(1);
}
console.log("\nAll contact API tests passed.");
