#!/usr/bin/env node
/**
 * Compares the sitemap that is live on the deployed site with the sitemap that
 * the current checkout builds. Drift means crawlers are still reading an older
 * <lastmod> set, so the deploy job should run again.
 *
 * Usage: node scripts/verify-live-sitemap.mjs [--dist dist] [--url https://…/sitemap.xml]
 *        [--json report.json] [--fail-on-drift]
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const dist = resolve(option('dist', 'dist'));
const siteUrl = (process.env.SITE_URL || 'https://qazvintasvir.ir').replace(/\/$/, '');
const sitemapUrl = option('url', `${siteUrl}/sitemap.xml`);
const jsonOut = option('json', '');
const failOnDrift = args.includes('--fail-on-drift');

const localPath = join(dist, 'sitemap.xml');
if (!existsSync(localPath)) {
  console.error(`✖ ${localPath} not found. Run "npm run build" first.`);
  process.exit(2);
}

const parse = (xml) => {
  const entries = new Map();
  for (const block of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc) continue;
    const lastmod = block[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '';
    entries.set(loc, lastmod);
  }
  return entries;
};

const local = parse(readFileSync(localPath, 'utf8'));

let live = new Map();
let status = 0;
let error = '';
try {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  const response = await fetch(sitemapUrl, {
    signal: controller.signal,
    headers: { 'cache-control': 'no-cache' },
  });
  clearTimeout(timer);
  status = response.status;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  live = parse(await response.text());
} catch (thrown) {
  error = String(thrown).slice(0, 160);
}

const missing = [...local.keys()].filter((loc) => !live.has(loc));
const extra = [...live.keys()].filter((loc) => !local.has(loc));
const stale = [...local.entries()]
  .filter(([loc, lastmod]) => live.has(loc) && live.get(loc) !== lastmod)
  .map(([loc, lastmod]) => ({ loc, local: lastmod, live: live.get(loc) }));

const report = {
  sitemapUrl,
  status,
  error,
  localUrls: local.size,
  liveUrls: live.size,
  missing,
  extra,
  stale,
  drift: Boolean(error) || missing.length > 0 || extra.length > 0 || stale.length > 0,
};

if (jsonOut) writeFileSync(jsonOut, JSON.stringify(report, null, 2));

const summary = [
  `live ${sitemapUrl} → ${error ? error : `HTTP ${status}`}`,
  `local ${local.size} URLs · live ${live.size} URLs`,
  `${missing.length} missing live · ${extra.length} extra live · ${stale.length} stale lastmod`,
].join('\n');
console.log(summary);

for (const item of stale.slice(0, 10)) {
  console.log(`  stale ${item.loc}: live ${item.live || '—'} → build ${item.local}`);
}
for (const loc of missing.slice(0, 10)) console.log(`  not live yet: ${loc}`);

if (report.drift && failOnDrift) {
  console.error('✖ deployed sitemap is behind the current build.');
  process.exit(1);
}
