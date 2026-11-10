#!/usr/bin/env node
/**
 * Writes a truthful <lastmod> for every URL in the generated sitemap.
 *
 * Google only trusts lastmod when it matches reality, so the date is derived
 * from git history: for each URL we resolve the source files that render that
 * page and take the newest commit date among them. If git is unavailable (for
 * example a shallow CI clone without history) the existing value is kept.
 *
 * Usage: node scripts/sitemap-lastmod.mjs [--dist dist] [--check] [--json out.json]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const dist = resolve(option('dist', 'dist'));
const jsonOut = option('json', '');
const checkOnly = args.includes('--check');

const sitemapPath = join(dist, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  console.error(`✖ ${sitemapPath} not found. Run "npm run build" first.`);
  process.exit(1);
}

let gitAvailable = true;
const dateCache = new Map();

const toIsoDate = (value) => {
  const trimmed = value.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(trimmed) ? trimmed : '';
};

const gitDate = (paths) => {
  if (!gitAvailable || paths.length === 0) return '';
  const key = paths.join('|');
  if (dateCache.has(key)) return dateCache.get(key);
  let date = '';
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    date = toIsoDate(output);
  } catch {
    gitAvailable = false;
  }
  dateCache.set(key, date);
  return date;
};

const latestRepoDate = () => {
  if (!gitAvailable) return '';
  try {
    return toIsoDate(
      execFileSync('git', ['log', '-1', '--format=%cs'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }),
    );
  } catch {
    gitAvailable = false;
    return '';
  }
};

/** Source files that generate a route, most specific first. */
const sourcesFor = (pathname) => {
  const parts = pathname.split('/').filter(Boolean);
  const files = [];
  if (parts.length === 0) {
    return ['src/pages/fa/index.astro', 'src/layouts/HomeLayout.astro', 'src/pages/index.astro'];
  }
  const [lang, section, slug] = parts;
  const isLocale = lang === 'fa' || lang === 'en';
  const shell = ['BaseLayout', 'Header', 'Footer'].map((name) => `src/layouts/${name}.astro`).concat('src/layouts/BaseLayout.astro');

  if (isLocale && section === 'articles') {
    if (!slug) {
      files.push(`src/pages/${lang}/articles/index.astro`, 'src/components/articles/ArticlesIndex.astro');
    } else {
      files.push(`src/pages/${lang}/articles/${slug}.astro`);
      for (const candidate of [
        `src/data/articles/${slug}.ts`,
        'src/components/articles/PromoArticle.astro',
        `src/components/articles/${slug}Article.astro`,
      ]) {
        files.push(candidate);
      }
    }
  } else if (isLocale && section === 'services') {
    if (!slug) {
      files.push(`src/pages/${lang}/services/index.astro`, 'src/components/services/ServicesGrid.astro');
    } else {
      files.push(
        `src/content/services/${lang}/${slug}.md`,
        'src/pages/[lang]/services/[slug].astro'.replace('[lang]', lang),
        'src/layouts/ServiceLayout.astro',
      );
    }
  } else if (isLocale) {
    files.push(
      `src/pages/${lang}/${section}.astro`,
      `src/pages/${lang}/${section}/index.astro`,
      `src/content/pages/${lang}/${section}.md`,
    );
  } else {
    files.push(`src/pages/${section}.astro`, `src/content/pages/${section}.md`);
  }

  files.push(...shell);
  return [...new Set(files)].filter((file) => existsSync(resolve(file)));
};

const sitemap = readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)];
const fallbackDate = latestRepoDate();
const results = [];

let updated = 0;
let kept = 0;
let missing = 0;

const rebuilt = sitemap.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? '';
  let pathname = '';
  try {
    pathname = new URL(loc).pathname;
  } catch {
    pathname = '';
  }
  const sources = pathname ? sourcesFor(pathname) : [];
  const date = gitDate(sources) || fallbackDate;
  const previous = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '';

  if (!date) {
    missing += previous ? 0 : 1;
    results.push({ loc, lastmod: previous, sources: sources.length });
    return block;
  }
  if (date !== previous) updated += 1;
  else kept += 1;
  results.push({ loc, lastmod: date, previous, sources: sources.length });

  const cleaned = block.replace(/\s*<lastmod>[^<]+<\/lastmod>/, '');
  return cleaned.replace(/(<loc>[^<]+<\/loc>)/, `$1<lastmod>${date}</lastmod>`);
});

if (!checkOnly) {
  writeFileSync(sitemapPath, rebuilt);
  // keep the chunk referenced by sitemap.xml in sync when present
  for (const name of ['sitemap-0.xml']) {
    const chunk = join(dist, name);
    if (existsSync(chunk) && readFileSync(chunk, 'utf8') !== rebuilt) {
      writeFileSync(chunk, rebuilt);
    }
  }
}

const dates = results.map((entry) => entry.lastmod).filter(Boolean).sort();
const summary = {
  urls: urls.length,
  updated,
  kept,
  missing,
  oldest: dates[0] ?? '',
  newest: dates[dates.length - 1] ?? '',
  gitAvailable,
};

if (jsonOut) {
  writeFileSync(jsonOut, JSON.stringify({ ...summary, entries: results }, null, 2));
}

console.log(
  `sitemap lastmod: ${summary.urls} URLs · ${summary.updated} changed · ${summary.kept} unchanged · ` +
    `${summary.oldest || '—'} → ${summary.newest || '—'}${gitAvailable ? '' : ' (git history unavailable)'}`,
);

if (checkOnly && (updated > 0 || missing > 0)) {
  console.error('✖ lastmod values are stale; run without --check to rewrite them.');
  process.exit(1);
}
if (missing > 0) {
  console.error(`✖ ${missing} URL(s) have no lastmod value.`);
  process.exit(1);
}
