#!/usr/bin/env node
/**
 * Static SEO audit for the built site.
 *
 * Reads every HTML file in `dist/`, checks the signals Google actually uses for
 * snippets and indexing, and compares the result with the generated sitemap.
 * Exits with code 1 when an error is found, so CI fails before deployment.
 *
 * Usage: node scripts/seo-audit.mjs [--dist dist] [--json report.json] [--quiet]
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const quiet = args.includes('--quiet');
const dist = resolve(option('dist', 'dist'));
const jsonOut = option('json', '');
const HOST_FALLBACK = 'https://qazvintasvir.ir';

/** Files that are not content pages: error shell and search-console verification. */
const NON_PAGE = /(^\/404\.html$)|(^\/[^/]*googled[0-9a-f]+\.html$)/;

const errors = [];
const warnings = [];
const info = [];
const fail = (page, message) => errors.push({ page, message });
const warn = (page, message) => warnings.push({ page, message });

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() ? [full] : [];
  });

if (!existsSync(dist)) {
  console.error(`✖ Build output not found at ${dist}. Run "npm run build" first.`);
  process.exit(1);
}

const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
const pagePath = (file) => {
  const rel = relative(dist, file).split(sep).join('/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
};

const decode = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const pages = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const route = pagePath(file);
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '';
  const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? '';
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((match) =>
    match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  );
  const isRedirect = /http-equiv="refresh"/i.test(html);
  const isIndexable =
    Boolean(canonical) && !/noindex/i.test(robots) && !isRedirect && !NON_PAGE.test(route);
  const images = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);
  const links = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  pages.push({
    file,
    route,
    html,
    title,
    description,
    canonical,
    robots,
    h1s,
    images,
    links,
    schemas,
    isIndexable,
    isRedirect,
  });
}

const host = (() => {
  const sample = pages.find((page) => page.canonical)?.canonical;
  if (!sample) return HOST_FALLBACK;
  try {
    return new URL(sample).origin;
  } catch {
    return HOST_FALLBACK;
  }
})();

for (const page of pages) {
  if (page.isRedirect || NON_PAGE.test(page.route)) continue;

  if (!page.title) fail(page.route, 'missing <title>');
  else {
    const length = [...page.title].length;
    if (length > 60) fail(page.route, `title is ${length} characters (max 60)`);
    if (length < 15) warn(page.route, `title is only ${length} characters`);
  }

  if (!page.description) fail(page.route, 'missing meta description');
  else {
    const length = [...page.description].length;
    if (length < 70) fail(page.route, `description is ${length} characters (min 70)`);
    if (length > 160) fail(page.route, `description is ${length} characters (max 160)`);
  }

  if (page.h1s.length !== 1) {
    fail(page.route, `${page.h1s.length} <h1> elements (expected exactly 1)`);
  }

  if (!page.canonical && !page.isRedirect) fail(page.route, 'missing canonical link');

  for (const schema of page.schemas) {
    try {
      JSON.parse(schema[1]);
    } catch (error) {
      fail(page.route, `invalid JSON-LD: ${String(error).slice(0, 80)}`);
    }
  }

  for (const image of page.images) {
    if (!/\balt="/.test(image)) fail(page.route, `image without alt: ${image.slice(0, 80)}`);
  }

  for (const href of page.links) {
    let pathname = '';
    if (href.startsWith('/')) pathname = href.split('#')[0].split('?')[0];
    else if (href.startsWith(host)) {
      try {
        pathname = new URL(href).pathname;
      } catch {
        continue;
      }
    } else continue;
    if (!pathname || pathname === '/') continue;
    if (/\.(jpg|jpeg|png|webp|svg|ico|woff2?|css|js|pdf|xml|txt)$/i.test(pathname)) {
      if (!existsSync(join(dist, pathname.slice(1)))) fail(page.route, `missing asset ${pathname}`);
      continue;
    }
    const candidates = [
      join(dist, pathname.slice(1)),
      join(dist, pathname.replace(/\/$/, '').slice(1), 'index.html'),
      join(dist, `${pathname.slice(1)}.html`),
    ];
    if (!candidates.some((candidate) => existsSync(candidate))) {
      fail(page.route, `broken internal link ${pathname}`);
    }
  }
}

const indexable = pages.filter((page) => page.isIndexable);

// duplicate titles / descriptions / canonicals
const group = (key) => {
  const map = new Map();
  for (const page of indexable) {
    const value = key(page);
    if (!value) continue;
    map.set(value, [...(map.get(value) ?? []), page.route]);
  }
  return [...map.entries()].filter(([, routes]) => routes.length > 1);
};
for (const [value, routes] of group((page) => page.title)) {
  warn(routes.join(', '), `duplicate title: ${value.slice(0, 70)}`);
}
for (const [value, routes] of group((page) => page.description)) {
  warn(routes.join(', '), `duplicate description: ${value.slice(0, 70)}`);
}
for (const [value, routes] of group((page) => page.canonical)) {
  fail(routes.join(', '), `duplicate canonical: ${value}`);
}

// sitemap parity
const sitemapFiles = readdirSync(dist).filter((name) => /^sitemap.*\.xml$/.test(name));
const sitemapXml = sitemapFiles
  .map((name) => readFileSync(join(dist, name), 'utf8'))
  .join('\n');
const sitemapLocs = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => {
      try {
        return new URL(match[1]).pathname;
      } catch {
        return '';
      }
    })
    .filter((pathname) => pathname && !/\.(xml|txt)$/i.test(pathname)),
);
const canonicalPaths = new Map(indexable.map((page) => [new URL(page.canonical).pathname, page.route]));
for (const [pathname, route] of canonicalPaths) {
  if (!sitemapLocs.has(pathname)) fail(route, `indexable page missing from sitemap: ${pathname}`);
}
for (const loc of sitemapLocs) {
  if (!canonicalPaths.has(loc) && !existsSync(join(dist, loc.replace(/^\//, ''), 'index.html')) && !existsSync(join(dist, `${loc.replace(/^\//, '')}.html`))) {
    fail('/sitemap.xml', `sitemap lists a URL with no page: ${loc}`);
  }
}

// orphan detection: indexable pages with no inbound internal link
const inbound = new Map(indexable.map((page) => [new URL(page.canonical).pathname, 0]));
for (const page of pages) {
  for (const href of page.links) {
    let pathname = '';
    if (href.startsWith('/')) pathname = href.split('#')[0].split('?')[0];
    else if (href.startsWith(host)) {
      try {
        pathname = new URL(href).pathname;
      } catch {
        continue;
      }
    } else continue;
    if (!pathname || pathname === page.route) continue;
    if (inbound.has(pathname)) inbound.set(pathname, inbound.get(pathname) + 1);
  }
}
for (const [pathname, count] of inbound) {
  if (count === 0) warn(pathname, 'orphan: no inbound internal links');
}

// hreflang pairs must point at existing pages
for (const page of indexable) {
  const alternates = [...page.html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)];
  if (alternates.length === 0) {
    warn(page.route, 'no hreflang alternates');
    continue;
  }
  for (const [, lang, href] of alternates) {
    let pathname = '';
    try {
      pathname = new URL(href).pathname;
    } catch {
      fail(page.route, `invalid hreflang target for ${lang}`);
      continue;
    }
    if (!existsSync(join(dist, pathname.slice(1), 'index.html'))) {
      fail(page.route, `hreflang ${lang} points at a missing page: ${pathname}`);
    }
  }
}

const totalWords = indexable.reduce((sum, page) => {
  const text = page.html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ');
  return sum + text.split(/\s+/).filter(Boolean).length;
}, 0);

info.push(`${pages.length} HTML files · ${indexable.length} indexable · ${sitemapLocs.size} sitemap URLs`);
info.push(`average ${Math.round(totalWords / Math.max(indexable.length, 1))} words per indexable page`);
info.push(`host ${host} · ${errors.length} errors · ${warnings.length} warnings`);

if (!quiet) {
  const list = (title, items, limit = 25) => {
    if (items.length === 0) return;
    console.log(`\n${title}`);
    for (const item of items.slice(0, limit)) {
      console.log(`  ${item.page} — ${item.message}`);
    }
    if (items.length > limit) console.log(`  … and ${items.length - limit} more`);
  };
  for (const line of info) console.log(line);
  list('✖ Errors', errors);
  list('! Warnings', warnings);
  if (errors.length === 0) console.log('\n✔ SEO audit passed');
}

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify({ info, errors, warnings, pages: indexable.map((page) => ({ route: page.route, title: page.title, description: page.description, words: page.html.length })) }, null, 2));
}

process.exit(errors.length > 0 ? 1 : 0);
