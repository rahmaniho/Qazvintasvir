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

Astro's dev server starts at `http://localhost:4321/Qazvintasvir/` using the current GitHub Pages project base.

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

The build currently targets the repository's GitHub Pages project path (`/Qazvintasvir`). The `site` value in `astro.config.mjs` is provisional; update it only after the production domain is explicitly confirmed.

## GitHub Pages deployment

The GitHub Pages URL for the current provisional project-path configuration is <https://rahmaniho.github.io/Qazvintasvir/>. `.github/workflows/deploy-pages.yml` builds and deploys the site to GitHub Pages after changes reach `main`; it also supports a manual run from `main`. The workflow runs the same checks, redirect generation, build, and static-output tests before publishing `dist/`.

The workflow configures Pages for GitHub Actions deployment. Once this change is merged to `main`, confirm in **Settings → Pages** that the build and deployment source is **GitHub Actions**, then check the workflow's deployment URL. The site and sitemap use the provisional GitHub Pages host for now; do not configure a custom domain until the production domain is explicitly approved.

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
