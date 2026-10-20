import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = 'https://qazvintasvir.ir';

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
        return path !== '/' && !path.startsWith('/services/');
      },
      serialize: (item) => {
        const links = localizedAlternates(item.url);
        return links.length ? { ...item, links } : item;
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
