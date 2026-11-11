#!/usr/bin/env node
/**
 * Responsive image pipeline for article photography.
 *
 * For every published photograph it writes narrower WebP variants next to the
 * original and records the real dimensions in `src/data/image-manifest.json`,
 * so templates can emit `srcset`/`sizes` and intrinsic width/height without a
 * layout shift on mobile. Variants are skipped when they are already up to date.
 *
 * Run with: npm run images:variants (also runs before build and check)
 */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(process.cwd(), 'public');
const manifestPath = resolve(process.cwd(), 'src/data/image-manifest.json');
const photoDirs = ['assets/img', 'assets/images', 'assets'];
const excluded = /(?:^|\/)(?:clients|brand|karensoft|logos)\//;
const widths = [480, 800];
const minSourceWidth = 520;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

const seen = new Set();
const files = [];
for (const dir of photoDirs) {
  try {
    for (const file of await walk(join(root, dir))) {
      if (!seen.has(file)) {
        seen.add(file);
        files.push(file);
      }
    }
  } catch {
    /* directory may not exist */
  }
}

const manifest = {};
let written = 0;
let reused = 0;

for (const file of files) {
  const rel = relative(root, file).split('\\').join('/');
  if (excluded.test(rel)) continue;
  const extension = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(extension)) continue;

  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch {
    continue;
  }
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (!width || !height) continue;

  const webpRel = rel.replace(/\.(jpe?g|png)$/i, '.webp');
  const webpFile = join(root, webpRel);
  await sharp(file).rotate().webp({ quality: 78, effort: 5 }).toFile(webpFile);

  const variants = [];
  for (const target of widths) {
    if (width < Math.max(target, minSourceWidth) || width <= target) continue;
    const name = `${basename(rel, extension)}-${target}.webp`;
    const outFile = join(dirname(file), name);
    const outRel = `${dirname(rel)}/${name}`.replace(/^\.\//, '');
    try {
      const sourceStat = await stat(file);
      const existing = await stat(outFile).catch(() => null);
      if (!existing || existing.mtimeMs < sourceStat.mtimeMs) {
        await sharp(file)
          .rotate()
          .resize({ width: target, withoutEnlargement: true })
          .webp({ quality: target <= 480 ? 72 : 74, effort: 5 })
          .toFile(outFile);
        written += 1;
      } else {
        reused += 1;
      }
      variants.push({ width: target, src: `/${outRel}` });
    } catch {
      /* skip variant on failure, the full-size webp still works */
    }
  }

  manifest[`/${rel}`] = {
    width,
    height,
    webp: `/${webpRel}`,
    srcSet: [...variants.map((variant) => `${variant.src} ${variant.width}w`), `/${webpRel} ${width}w`].join(', '),
  };
}

await mkdir(dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  `image variants: ${Object.keys(manifest).length} photos · ${written} variants written · ${reused} reused`,
);
