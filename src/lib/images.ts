import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Use the project root rather than import.meta.url: Vite rewrites the module URL
// for the bundled build, while Astro always runs from the project root.
const publicDir = resolve(process.cwd(), 'public');

/**
 * Returns the WebP sibling of a published image when one exists, so pages ship
 * the lighter file while frontmatter can keep pointing at the source artwork.
 * Falls back to the original path (and leaves SVG/WebP paths untouched).
 */
export function preferWebp(src?: string): string | undefined {
  if (!src) return src;
  const match = src.match(/^(.*)\.(?:jpe?g|png)$/i);
  if (!match) return src;
  const candidate = `${match[1]}.webp`;
  return existsSync(`${publicDir}${candidate}`) ? candidate : src;
}

export function imageMime(src: string): string {
  const extension = src.split('.').pop()?.toLowerCase();
  if (extension === 'webp') return 'image/webp';
  if (extension === 'png') return 'image/png';
  if (extension === 'svg') return 'image/svg+xml';
  if (extension === 'avif') return 'image/avif';
  return 'image/jpeg';
}
