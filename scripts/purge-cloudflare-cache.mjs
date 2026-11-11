#!/usr/bin/env node
/**
 * Purges the Cloudflare edge cache after a GitHub Pages deploy.
 *
 * Cloudflare sits in front of GitHub Pages so Iranian visitors hit an edge node
 * instead of the 185.199.108-111 GitHub Pages network, which is filtered. Once
 * the edge copies HTML, a fresh deploy is invisible until the cache is cleared.
 *
 * Usage: node scripts/purge-cloudflare-cache.mjs [--dry-run] [--urls https://a,https://b]
 *
 * Environment:
 *   CLOUDFLARE_API_TOKEN  token with "Zone.Cache Purge" permission
 *   CLOUDFLARE_ZONE_ID    zone id of qazvintasvir.ir
 *
 * Without both variables the script exits 0 after printing a skip notice, so
 * local runs and pull requests from forks never fail on missing secrets.
 */
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const urlArg = args.indexOf('--urls');

const token = (process.env.CLOUDFLARE_API_TOKEN || '').trim();
const zoneId = (process.env.CLOUDFLARE_ZONE_ID || '').trim();
const urls = urlArg >= 0 && args[urlArg + 1]
  ? args[urlArg + 1].split(',').map((url) => url.trim()).filter(Boolean)
  : [];

if (!token || !zoneId) {
  console.log('↷ cloudflare purge skipped: CLOUDFLARE_API_TOKEN / CLOUDFLARE_ZONE_ID are not set');
  process.exit(0);
}

const endpoint = `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`;
const body = urls.length > 0 ? { files: urls } : { purge_everything: true };

if (dryRun) {
  console.log(`↷ dry run: would POST ${endpoint} with ${JSON.stringify(body)}`);
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    authorization: `Bearer ${token}`,
    'content-type': 'application/json',
  },
  body: JSON.stringify(body),
});

let payload = {};
try {
  payload = await response.json();
} catch {
  payload = {};
}

if (!response.ok || payload.success === false) {
  const detail = JSON.stringify(payload.errors ?? payload, null, 2);
  console.error(`✖ cloudflare purge failed (HTTP ${response.status})\n${detail}`);
  process.exit(1);
}

const scope = urls.length > 0 ? `${urls.length} URL(s)` : 'everything';
console.log(`✔ cloudflare cache purged: ${scope}`);
