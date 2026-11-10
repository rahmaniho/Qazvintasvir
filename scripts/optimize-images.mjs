/**
 * Image weight budget for photo assets.
 *
 * Generates a WebP sibling for every photograph so templates can serve the
 * lighter file, and re-encodes photo files that exceed the budget. Brand marks,
 * client logos and SVG artwork are intentionally excluded: they need exact
 * pixels and transparency.
 *
 * Run with: npm run images:optimize
 */
import { readdir, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(process.cwd(), 'public');
const photoDirs = ['assets/img', 'assets/images'];
const excluded = /(?:^|\/)(?:clients|brand|karensoft|logos)\//;
const maxWidth = 1600;
const webpQuality = 78;
const jpegQuality = 82;
const reencodeAbove = 120 * 1024;

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

async function run(source, target, format) {
  const image = sharp(source).rotate();
  const meta = await image.metadata();
  const pipeline = image.resize({
    width: Math.min(meta.width ?? maxWidth, maxWidth),
    withoutEnlargement: true,
  });
  const buffer = format === 'webp'
    ? await pipeline.webp({ quality: webpQuality, effort: 5 }).toBuffer()
    : await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toBuffer();
  if (target) await sharp(buffer).toFile(target);
  return buffer;
}

const files = [];
for (const dir of photoDirs) files.push(...(await walk(join(root, dir))));

let webps = 0;
let reencoded = 0;

for (const file of files) {
  const relative = file.slice(root.length + 1);
  if (excluded.test(relative)) continue;
  const extension = extname(file).toLowerCase();

  if (extension === '.jpg' || extension === '.jpeg') {
    const before = (await stat(file)).size;
    if (before > reencodeAbove) {
      const buffer = await run(file, null, 'jpeg');
      if (buffer.length < before) {
        await sharp(buffer).toFile(file);
        reencoded += 1;
      }
    }
    await run(file, file.replace(/\.jpe?g$/i, '.webp'), 'webp');
    webps += 1;
  } else if (extension === '.webp') {
    const before = (await stat(file)).size;
    if (before <= reencodeAbove) continue;
    const jpegSource = file.replace(/\.webp$/i, '.jpg');
    let source = file;
    try {
      await stat(jpegSource);
      source = jpegSource;
    } catch {
      // No JPEG source; re-encode the WebP from itself.
    }
    const buffer = await run(source, null, 'webp');
    if (buffer.length < before) {
      await sharp(buffer).toFile(file);
      reencoded += 1;
    }
  }
}

console.log(`Optimized images: ${webps} WebP siblings written, ${reencoded} files re-encoded.`);
