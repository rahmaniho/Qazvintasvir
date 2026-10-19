# Qazvin Tasvir

Bilingual static website for Qazvin Tasvir, built with Astro and local assets. The current implementation is an incremental rewrite of the archived source site; the source snapshot remains available under `_legacy/source-snapshot/` for content and behavior audits.

## Requirements

- Node.js 22+
- npm (lockfile is committed)

## Local development

```sh
npm ci
npm run legacy:redirects
npm run dev
```

Astro's dev server starts at `http://localhost:4321/`; production URLs use the custom domain root.

## Quality checks and production build

```sh
npm run check
npm run legacy:redirects
npm run build
npm test
```

- `check` runs Astro's TypeScript and template diagnostics.
- `legacy:redirects` regenerates the static old-service URL aliases in `public/services/`.
- `build` emits the static bilingual pages under `dist/` and creates the sitemap.
- `test` checks routes, preserved homepage and catering content, local food assets, redirects, root routing, and sitemap exclusions.

The production build targets the confirmed custom domain <https://qazvintasvir.ir/> at the site root (`base: '/'`); `public/CNAME` preserves the custom domain in GitHub Pages deployments.

## GitHub Pages deployment

`.github/workflows/deploy-pages.yml` builds and deploys the site to GitHub Pages after changes reach `main`; it also supports a manual run from `main`. The workflow runs diagnostics, redirect generation, build, and static-output tests before publishing `dist/`.

In **Settings → Pages**, the deployment source should be **GitHub Actions** and the custom domain should be `qazvintasvir.ir`. GitHub must finish provisioning the TLS certificate before **Enforce HTTPS** can be enabled; verify that HTTPS enforcement is on once the certificate is ready.

## Routes

- `/fa/` and `/en/` — localized home pages
- `/fa/about/`, `/en/about/`
- `/fa/contact/`, `/en/contact/`
- `/fa/services/`, `/en/services/`
- Eight localized service detail routes under each language's `/services/`
- `/fa/fleet/`, `/fa/brands/`, `/fa/why-us/`, `/fa/clients/`, `/fa/trust/`, `/fa/resume/`, `/fa/legal/` and matching `/en/` routes — dedicated pages for homepage sections
- `/services/` and `/services/*.html` — static compatibility redirects for the legacy Persian service URLs

The homepages keep the hero and a concise page directory; full sections are on their own routes. Legacy homepage fragments (`#about`, `#services`, `#fleet`, `#brands`, `#why-us`, `#clients`, `#trust`, `#resume`, `#legal`, `#contact`) now route to the matching pages. The old `#fleet-specs` and catering fragments (`#personnel-food`, `#food-menu`, `#food-gallery`, `#food-request`, `#food-faq`) are mapped to the new service routes. The dedicated Persian staff-catering page preserves the source menu, sixteen dish cards, gallery, request form, four accessible tabs, and FAQ content; its migrated HTML and styles are kept in active source files and scoped to that page.

## Project structure

- `src/pages/` — static localized routes
- `src/content/services/` — bilingual service collection content
- `src/content/food/personnel-food-fa.html` — source-preserving Persian staff-catering section
- `src/components/` — Astro layouts and reusable UI
- `src/styles/` — layered local stylesheets and local font assets
- `public/` — local images, documents, icons, and compatibility redirects
- `_legacy/source-snapshot/` — read-only source archive; not published as site content
- `CONTENT-INVENTORY.md` and `BEHAVIOR-INVENTORY.md` — migration reference documents

Only Astro and `@astrojs/sitemap` are used as runtime framework/integration dependencies. UI behavior is implemented with small native browser scripts.
