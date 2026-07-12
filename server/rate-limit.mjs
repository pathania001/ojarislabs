/* =====================================================================
   Simple in-memory rate limiter (per-process). Sufficient for a single
   Hostinger Node instance. Survives neither restarts nor multi-instance
   clustering — upgrade to Redis if that becomes a requirement.
   ===================================================================== */

const buckets = new Map();

/**
 * @param {string} key
 * @param {{ windowMs: number, max: number }} opts
 * @returns {{ allowed: boolean, remaining: number, retryAfterSec: number }}
 */
export function rateLimit(key, { windowMs = 15 * 60 * 1000, max = 8 } = {}) {
  const now = Date.now();
  let entry = buckets.get(key);
  if (!entry || now - entry.start >= windowMs) {
    entry = { start: now, count: 0 };
    buckets.set(key, entry);
  }
  entry.count += 1;
  const allowed = entry.count <= max;
  const retryAfterSec = Math.max(1, Math.ceil((entry.start + windowMs - now) / 1000));
  return {
    allowed,
    remaining: Math.max(0, max - entry.count),
    retryAfterSec: allowed ? 0 : retryAfterSec
  };
}

/** Test helper */
export function resetRateLimits() {
  buckets.clear();
}
