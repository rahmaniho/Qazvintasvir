import type { APIRoute } from 'astro';
import { ARTICLE_UPDATED } from '../lib/schema';

// `/sitemap.xml` is the address people and search engines expect first.
// The @astrojs/sitemap integration writes the actual URL set to `/sitemap-0.xml`
// and its own index to `/sitemap-index.xml`; this endpoint makes the short,
// conventional path resolve to the same URL set without duplicating content.
const site = (import.meta.env.SITE || 'https://qazvintasvir.ir').replace(/\/$/, '');
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
<loc>${site}${base}/sitemap-0.xml</loc>
<lastmod>${ARTICLE_UPDATED}</lastmod>
</sitemap>
</sitemapindex>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
