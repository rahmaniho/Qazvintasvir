#!/usr/bin/env node
/**
 * Writes a Cloudflare Bulk Redirects import file for the legacy service URLs.
 *
 * GitHub Pages cannot send server-side redirects, so the old /services/*.html
 * addresses are HTML stubs with a meta refresh. Search Console lists them as
 * "Excluded by 'noindex' tag" and they never pass link equity. Importing this
 * CSV into Cloudflare turns them into real 301s at the edge, before the request
 * ever reaches the origin, so Google follows a single hop to the Persian page.
 *
 * Usage: node scripts/build-cloudflare-redirects.mjs [--out cloudflare-redirects.csv]
 *
 * The apex root is intentionally absent: /index.html carries the Google Search
 * Console verification meta tag, and redirecting it at the edge would hide that
 * tag from the verifier. It stays a client-side redirect.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, option('out', 'cloudflare-redirects.csv'));
const origin = 'https://qazvintasvir.ir';

// The stub list is the source of truth: if a stub exists, it needs a redirect.
const stubFile = readFileSync(resolve(root, 'scripts/generate-legacy-redirects.mjs'), 'utf8');
const block = stubFile.match(/const serviceSlugs = \[([\s\S]*?)\];/)?.[1] ?? '';
const slugs = [...block.matchAll(/'([a-z0-9-]+)'/g)].map((match) => match[1]);

if (slugs.length === 0) {
  console.error('✖ no legacy service slugs found in scripts/generate-legacy-redirects.mjs');
  process.exit(1);
}

const rows = [
  ['source_url', 'target_url', 'status_code', 'preserve_query_string', 'include_subdomains'],
];

for (const slug of slugs) {
  const target = `${origin}/fa/services/${slug}/`;
  rows.push([`${origin}/services/${slug}.html`, target, '301', 'TRUE', 'FALSE']);
  // Old links were shared without the .html suffix as well.
  rows.push([`${origin}/services/${slug}`, target, '301', 'TRUE', 'FALSE']);
}
rows.push([`${origin}/services/index.html`, `${origin}/fa/services/`, '301', 'TRUE', 'FALSE']);
rows.push([`${origin}/services/`, `${origin}/fa/services/`, '301', 'TRUE', 'FALSE']);
rows.push([`${origin}/services`, `${origin}/fa/services/`, '301', 'TRUE', 'FALSE']);

writeFileSync(out, `${rows.map((row) => row.join(',')).join('\n')}\n`, 'utf8');
console.log(`✔ cloudflare redirects: ${rows.length - 1} rules written to ${out.replace(`${root}/`, '')}`);
