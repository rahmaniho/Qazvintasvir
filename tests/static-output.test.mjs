import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');
const read = (path) => readFileSync(resolve(dist, path), 'utf8');
const route = (lang, path = '') => `${lang}/${path ? `${path}/` : ''}index.html`;

const serviceSlugs = [
  'customs-port', 'factory-transport', 'import-export', 'personnel-food',
  'school-office', 'sourcing', 'trade-consulting', 'urban-vip',
];

test('build emits the bilingual public route set', () => {
  for (const lang of ['fa', 'en']) {
    assert.ok(existsSync(resolve(dist, route(lang))), `missing /${lang}/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'about'))), `missing /${lang}/about/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'contact'))), `missing /${lang}/contact/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'services'))), `missing /${lang}/services/`);
    for (const slug of serviceSlugs) {
      assert.ok(existsSync(resolve(dist, route(lang, `services/${slug}`))), `missing /${lang}/services/${slug}/`);
    }
  }
  assert.ok(existsSync(resolve(dist, '404.html')), 'missing localized 404 output');
});

test('homepage preserves the original section anchors and client history', () => {
  const html = read(route('fa'));
  for (const id of ['hero', 'about', 'services', 'fleet', 'brands', 'why-us', 'clients', 'trust', 'resume', 'legal', 'contact']) {
    assert.match(html, new RegExp(`\\bid="${id}"`), `missing homepage anchor #${id}`);
  }
  assert.equal((html.match(/class="client-card client-card--full reveal"/g) ?? []).length, 12, 'all 12 client brands should be listed');
  assert.equal((html.match(/class="testimonial-card reveal"/g) ?? []).length, 3, 'all source testimonials should be present');
  assert.equal((html.match(/class="history-table"/g) ?? []).length, 1, 'contract history table should be present');
  assert.equal((html.match(/<tr><th scope="row">/g) ?? []).length, 11, 'all 11 source collaboration rows should be present');
  for (const brand of ['scania', 'volvo', 'mercedes', 'iveco', 'irankhodro']) {
    assert.ok(html.includes(`/assets/logos/${brand}.svg`), `missing vehicle brand logo ${brand}`);
  }
});

test('Persian catering page retains source content, anchors, media, tabs, and form behavior hooks', () => {
  const html = read(route('fa', 'services/personnel-food'));
  for (const id of ['personnel-food', 'food-menu', 'food-gallery', 'food-request', 'food-faq', 'personnel-food-form', 'food-meals-mirror']) {
    assert.match(html, new RegExp(`\\bid="${id}"`), `missing catering anchor or form hook #${id}`);
  }
  assert.equal((html.match(/class="food-tab(?:\s|"|$)/g) ?? []).length, 4, 'all four meal tabs should be present');
  assert.equal((html.match(/class="food-panel(?:\s|"|$)/g) ?? []).length, 4, 'all four tab panels should be present');
  assert.equal((html.match(/class="dish-card"/g) ?? []).length, 16, 'all sixteen dish cards should be present');
  assert.equal((html.match(/class="food-faq__item reveal"/g) ?? []).length, 4, 'all four FAQ entries should be present');
  assert.match(html, /PersonnelFoodSection\.astro_astro_type_script_index_0_lang|food-service\.js/, 'catering interaction module should be emitted');

  const assetUrls = [...html.matchAll(/(?:src|srcset)="(\/Qazvintasvir\/assets\/[^" ]+)/g)].map((match) => match[1]);
  assert.ok(assetUrls.length >= 20, 'expected local catering image assets');
  for (const url of new Set(assetUrls)) {
    const assetPath = url.replace('/Qazvintasvir/', '');
    assert.ok(existsSync(resolve(dist, assetPath)), `missing built local asset ${url}`);
  }
});

test('legacy URLs emit static redirects and preserve known hash destinations', () => {
  const index = readFileSync(resolve(dist, 'services/index.html'), 'utf8');
  assert.match(index, /\.\.\/fa\/services\//, 'legacy service index should redirect to the new Persian services index');
  for (const slug of serviceSlugs) {
    const html = readFileSync(resolve(dist, `services/${slug}.html`), 'utf8');
    assert.match(html, /noindex,follow/);
    assert.match(html, new RegExp(`\\.\\.\\/fa\\/services\\/${slug}\\/`), `legacy ${slug} target missing`);
    assert.match(html, /location\.replace/);
  }
  const foodRedirect = readFileSync(resolve(dist, 'services/personnel-food.html'), 'utf8');
  for (const fragment of ['food-menu', 'food-gallery', 'food-request', 'food-faq']) {
    assert.ok(foodRedirect.includes(`\"${fragment}\"`), `legacy redirect does not map #${fragment}`);
  }
});

test('sitemap contains canonical language pages, not redirect aliases', () => {
  const sitemap = read('sitemap-0.xml');
  assert.match(sitemap, /\/Qazvintasvir\/fa\//);
  assert.match(sitemap, /\/Qazvintasvir\/en\//);
  assert.doesNotMatch(sitemap, /\/services\/personnel-food\.html/);
  assert.doesNotMatch(sitemap, /\/Qazvintasvir\/(?!fa\/|en\/)/);
});

test('root entry redirects to the localized Persian root with the configured base path', () => {
  const html = read('index.html');
  assert.match(html, /url=\/Qazvintasvir\/fa\//);
  assert.doesNotMatch(html, /Qazvintasvirfa/);
});
