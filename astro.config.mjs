import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

const siteUrl = 'https://qazvintasvir.ir';

// Keep the sitemap lastmod in sync with the article dates published on the pages.
const schemaSource = readFileSync(new URL('./src/lib/schema.ts', import.meta.url), 'utf8');
const contentLastUpdated = schemaSource.match(/ARTICLE_UPDATED\s*=\s*'([^']+)'/)?.[1];

function localizedAlternates(pageUrl) {
  const { pathname } = new URL(pageUrl);
  const match = pathname.match(/^\/(fa|en)(\/.*)?$/);
  if (!match) return [];
  const rest = match[2] || '/';
  return [
    { lang: 'fa', url: `${siteUrl}/fa${rest}` },
    { lang: 'en', url: `${siteUrl}/en${rest}` },
    { lang: 'x-default', url: `${siteUrl}/fa${rest}` },
  ];
}

export default defineConfig({
  site: siteUrl,
  base: '/',
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/' && !path.startsWith('/services/') && !/^\/sitemap(-\d+)?\.xml$/.test(path);
      },
      serialize: (item) => {
        const links = localizedAlternates(item.url);
        if (!links.length) return item;
        const isArticle = new URL(item.url).pathname.includes('/articles/');
        return {
          ...item,
          links,
          ...(isArticle && contentLastUpdated ? { lastmod: contentLastUpdated } : {}),
        };
      },
    }),
  ],
  build: {
    format: 'directory'
  },
  vite: {
    server: {
      allowedHosts: ['.e2b.app']
    },
    preview: {
      allowedHosts: ['.e2b.app']
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
