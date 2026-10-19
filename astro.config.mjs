import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://qazvintasvir.ir',
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
