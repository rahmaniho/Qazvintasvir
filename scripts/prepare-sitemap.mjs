import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const dist = resolve('dist');
const indexPath = resolve(dist, 'sitemap-index.xml');
const sitemapPath = resolve(dist, 'sitemap.xml');
const index = await readFile(indexPath, 'utf8');
const chunkNames = [...index.matchAll(/<loc>[^<]*\/(sitemap-\d+\.xml)<\/loc>/g)]
  .map(([, name]) => name);

if (chunkNames.length === 1) {
  // A conventional sitemap.xml should expose the page URL set directly when
  // it fits in one sitemap. For very large sites retain the valid sitemap index.
  await copyFile(resolve(dist, chunkNames[0]), sitemapPath);
} else if (chunkNames.length > 1) {
  await writeFile(sitemapPath, index);
} else {
  throw new Error('Astro sitemap integration produced no sitemap chunks.');
}
