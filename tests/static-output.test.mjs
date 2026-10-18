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
const standaloneSectionSlugs = ['fleet', 'brands', 'why-us', 'clients', 'trust', 'resume', 'legal'];

test('build emits the bilingual public route set', () => {
  for (const lang of ['fa', 'en']) {
    assert.ok(existsSync(resolve(dist, route(lang))), `missing /${lang}/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'about'))), `missing /${lang}/about/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'contact'))), `missing /${lang}/contact/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'services'))), `missing /${lang}/services/`);
    for (const slug of standaloneSectionSlugs) {
      assert.ok(existsSync(resolve(dist, route(lang, slug))), `missing /${lang}/${slug}/`);
    }
    for (const slug of serviceSlugs) {
      assert.ok(existsSync(resolve(dist, route(lang, `services/${slug}`))), `missing /${lang}/services/${slug}/`);
    }
  }
  assert.ok(existsSync(resolve(dist, '404.html')), 'missing localized 404 output');
});

test('footer credit uses the original bilingual KarenSoft artwork and a secure external link', () => {
  const files = [
    ['mark.png', 256, 256],
    ['wordmark-fa.png', 383, 96],
    ['wordmark-en.png', 410, 48],
  ];
  const assetPath = '/assets/images/karensoft/';
  for (const [filename, width, height] of files) {
    const path = resolve(root, 'public', assetPath.slice(1), filename);
    assert.ok(existsSync(path), `missing KarenSoft crop ${filename}`);
    const png = readFileSync(path);
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a', `${filename} must be a PNG`);
    assert.equal(png.readUInt32BE(16), width, `${filename} width mismatch`);
    assert.equal(png.readUInt32BE(20), height, `${filename} height mismatch`);
    assert.equal(png.readUInt8(25), 6, `${filename} must retain RGBA transparency`);
  }

  for (const lang of ['fa', 'en']) {
    const html = read(route(lang));
    const credit = html.match(/<a\b(?=[^>]*class="karensoft-credit")[^>]*>([\s\S]*?)<\/a>/);
    assert.ok(credit, `footer credit missing from ${lang} homepage`);
    assert.match(credit[0], /href="https:\/\/www\.karen-soft\.ir"/);
    assert.match(credit[0], /target="_blank"/);
    assert.match(credit[0], /rel="noopener noreferrer"/);
    for (const filename of files.map(([name]) => name)) {
      assert.ok(credit[1].includes(`${assetPath}${filename}`), `${filename} missing from ${lang} footer credit`);
    }
  }

  const css = readFileSync(resolve(root, 'src/styles/layout.css'), 'utf8');
  assert.match(css, /karensoft-ring-spin/, 'logo ring animation missing');
  assert.match(css, /karensoft-wordmark-glow/, 'wordmark animation missing');
  assert.match(css, /prefers-reduced-motion:\s*reduce/, 'credit must respect reduced-motion preferences');
});

test('English routes have localized visible copy and language-aware document metadata', () => {
  const persianOrArabic = /[\u0600-\u06FF]/;
  const paths = ['', 'about', 'contact', 'services', ...standaloneSectionSlugs, ...serviceSlugs.map((slug) => `services/${slug}`)];
  for (const path of paths) {
    const html = read(route('en', path));
    const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
    const name = path || 'home';
    assert.doesNotMatch(visibleHtml, persianOrArabic, `English page ${name} contains untranslated visible copy`);
    assert.match(html, /<html[^>]*lang="en"[^>]*dir="ltr"|<html[^>]*dir="ltr"[^>]*lang="en"/, `incorrect document language or direction on ${name}`);
    if (path) {
      assert.match(html, new RegExp(`rel="canonical" href="[^"]*/en/${path}/"`), `missing English canonical for ${name}`);
      assert.match(html, new RegExp(`hreflang="fa" href="[^"]*/fa/${path}/"`), `missing Persian alternate for ${name}`);
    }
  }
});

test('English service pages use translated visible copy and structured data', () => {
  const persianOrArabic = /[\u0600-\u06FF]/;
  for (const slug of serviceSlugs) {
    const html = read(route('en', `services/${slug}`));
    const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
    assert.doesNotMatch(visibleHtml, persianOrArabic, `English route ${slug} contains untranslated visible copy`);

    const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const organization = jsonLd.find((item) => Array.isArray(item['@type']) && item['@type'].includes('Organization'));
    const service = jsonLd.find((item) => item['@type'] === 'Service');
    assert.equal(organization?.name, 'Qazvin Tasvir Company', `English organization schema name missing for ${slug}`);
    assert.doesNotMatch(organization?.description ?? '', persianOrArabic, `English organization description not localized for ${slug}`);
    assert.doesNotMatch(service?.description ?? '', persianOrArabic, `English service schema not localized for ${slug}`);
    assert.equal(organization?.knowsAbout?.length, 8, 'all eight source areas of expertise should remain in schema');
    assert.equal(organization?.hasOfferCatalog?.itemListElement?.length, 8, 'all eight source offers should remain in schema');
    assert.equal(organization?.openingHoursSpecification?.closes, '20:00', 'source opening hours should remain in schema');
    assert.ok(organization?.sameAs?.some((url) => url.includes('rasmio.com/company/10861415215')), 'source Rasmio sameAs URL should remain in schema');
  }
});

test('localized service-order numerals use the appropriate digit set', () => {
  const faServices = read(route('fa', 'services'));
  const enServices = read(route('en', 'services'));
  assert.match(faServices, /<bdi class="bidi-ltr" dir="ltr">۰۱<\/bdi>/, 'Persian service order should use Persian digits');
  assert.match(enServices, /<span[^>]*>01<\/span>/, 'English service order should use Western digits');
  assert.doesNotMatch(faServices, /<bdi class="bidi-ltr" dir="ltr">01<\/bdi>/, 'Persian service order should not use Western digits');
});

test('telephone numbers and numeric form controls are explicitly isolated left to right', () => {
  const css = readFileSync(resolve(root, 'src/styles/base.css'), 'utf8');
  assert.match(css, /\.bidi-ltr\s*\{[\s\S]*?unicode-bidi:\s*isolate/, 'shared number style must isolate LTR runs');
  assert.match(css, /input\[type="tel"\],[\s\S]*?text-align:\s*left/, 'telephone and numeric inputs must be LTR and left-aligned');

  for (const [lang, path] of [['fa', 'contact'], ['en', 'contact'], ['fa', 'services/personnel-food'], ['en', 'services/personnel-food']]) {
    const html = read(route(lang, path));
    const inputs = [...html.matchAll(/<input\b[^>]*type="tel"[^>]*>/g)];
    assert.ok(inputs.length, `telephone input missing from ${lang}/${path}`);
    for (const [tag] of inputs) assert.match(tag, /\bdir="ltr"/, `telephone input must declare LTR direction on ${lang}/${path}`);
  }
});

test('urban and VIP service pages use the generated local transport imagery', () => {
  const cityImageUrl = '/Qazvintasvir/assets/img/fleet-specs/urban-vip-city-van.jpg';
  const interiorImageUrl = '/Qazvintasvir/assets/img/fleet-specs/urban-vip-interior.jpg';
  for (const lang of ['fa', 'en']) {
    const index = read(route(lang, 'services'));
    const detail = read(route(lang, 'services/urban-vip'));
    assert.ok(index.includes(cityImageUrl), `/${lang}/services/ should display the generated city van image`);
    assert.ok(detail.includes(cityImageUrl), `/${lang}/services/urban-vip/ should display the generated van image`);
    assert.ok(detail.includes(interiorImageUrl), `/${lang}/services/urban-vip/ should display the generated VIP interior image`);
  }
  for (const asset of ['urban-vip-city-van.jpg', 'urban-vip-interior.jpg']) {
    assert.ok(existsSync(resolve(dist, 'assets/img/fleet-specs', asset)), `missing generated local asset ${asset}`);
  }
});

test('fleet pages show the Hyundai minibus exterior and branded interior', () => {
  const exteriorUrl = '/Qazvintasvir/assets/images/hyundai-minibus-exterior.jpg';
  const interiorUrl = '/Qazvintasvir/assets/images/hyundai-minibus-interior.jpg';
  for (const lang of ['fa', 'en']) {
    const html = read(route(lang, 'fleet'));
    assert.ok(html.includes(exteriorUrl), `missing Hyundai minibus exterior on ${lang} fleet page`);
    assert.ok(html.includes(interiorUrl), `missing branded Hyundai minibus interior on ${lang} fleet page`);
    assert.match(html, lang === 'fa' ? /مینی‌بوس هیوندای/ : /Hyundai Minibus/);
  }
  assert.ok(existsSync(resolve(dist, 'assets/images/hyundai-minibus-exterior.jpg')));
  assert.ok(existsSync(resolve(dist, 'assets/images/hyundai-minibus-interior.jpg')));
});

test('service detail pages render source notes, related services and localized CTAs', () => {
  for (const lang of ['fa', 'en']) {
    for (const slug of serviceSlugs) {
      const html = read(route(lang, `services/${slug}`));
      assert.match(html, /service-detail-card--note/, `missing source note on ${lang}/${slug}`);
      if (slug !== 'personnel-food') {
        assert.match(html, /related-services__grid/, `missing related services on ${lang}/${slug}`);
        assert.equal((html.match(/class="related-service-card"/g) ?? []).length, 3, `expected three related service cards on ${lang}/${slug}`);
        assert.match(html, /cta-title/, `missing source CTA on ${lang}/${slug}`);
        assert.match(html, lang === 'fa' ? /برای بررسی نیاز مجموعه‌تان گفت‌وگو کنیم/ : /Let’s discuss your organization’s needs/);
        assert.match(html, new RegExp(`/Qazvintasvir/${lang}/services/`), `related-service links should remain in the ${lang} locale`);
      }
    }
  }
});

test('homepages act as concise directories while full source sections live on dedicated pages', () => {
  const faHome = read(route('fa'));
  const enHome = read(route('en'));
  for (const [lang, html] of [['fa', faHome], ['en', enHome]]) {
    assert.match(html, /id="hero"/, `/${lang}/ should keep the landing hero`);
    assert.match(html, /id="home-directory-title"/, `/${lang}/ should list its dedicated pages`);
    assert.match(html, lang === 'fa' ? /منوی سریع/ : /Quick Menu/, `/${lang}/ should show the compact quick-menu heading`);
    assert.doesNotMatch(html, /Dedicated pages|صفحه‌های مستقل|Explore each area on its own page|برای دسترسی سریع‌تر، هر بخش اصلی سایت را در صفحه‌ای جداگانه ببینید/, `/${lang}/ should not retain the removed directory intro copy`);
    for (const oldSection of ['about', 'services', 'fleet', 'brands', 'why-us', 'clients', 'trust', 'resume', 'legal', 'contact']) {
      assert.doesNotMatch(html, new RegExp(`\\bid="${oldSection}"`), `full #${oldSection} section should no longer be embedded on /${lang}/`);
    }
    for (const slug of ['about', 'services', ...standaloneSectionSlugs, 'contact']) {
      assert.ok(html.includes(`/Qazvintasvir/${lang}/${slug}/`), `/${lang}/ directory should link to /${lang}/${slug}/`);
    }
  }

  const faHomeSchema = [...faHome.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const organization = faHomeSchema.find((item) => Array.isArray(item['@type']) && item['@type'].includes('Organization'));
  assert.equal(organization?.knowsAbout?.length, 8, 'all eight source areas of expertise should remain in the Persian schema');
  assert.equal(organization?.hasOfferCatalog?.itemListElement?.length, 8, 'all eight source offers should remain in the Persian schema');
  assert.equal(organization?.openingHoursSpecification?.closes, '20:00');
  assert.ok(organization?.sameAs?.some((url) => url.includes('rasmio.com/company/10861415215')));

  const fleet = read(route('fa', 'fleet'));
  assert.equal((fleet.match(/class="fleet-card reveal"/g) ?? []).length, 3, 'all fleet vehicle cards should be on the fleet page');
  const brands = read(route('fa', 'brands'));
  assert.equal((brands.match(/class="brand-partners__item reveal"/g) ?? []).length, 7, 'all seven vehicle-brand cards should be on the brands page');
  const whyUs = read(route('fa', 'why-us'));
  assert.equal((whyUs.match(/class="why-card reveal"/g) ?? []).length, 6, 'all source company-strength cards should be on the why-us page');
  const clients = read(route('fa', 'clients'));
  const clientsText = clients.replace(/<[^>]*>/g, '');
  assert.equal((clients.match(/class="client-card client-card--full reveal"/g) ?? []).length, 12, 'all 12 client brands should be listed');
  for (const updatedRecord of ['نستله ایران', '۱۵ دستگاه', 'گلدایران (ال‌جی)', '۱۹ دستگاه', 'هنکل', '۱۲ دستگاه', 'آسان پک', 'یاتاقان بوش ایران', '۱۴۳ دستگاه خودرو']) {
    assert.ok(clientsText.includes(updatedRecord), `missing updated Persian client record: ${updatedRecord}`);
  }
  const enClients = read(route('en', 'clients'));
  const enClientsText = enClients.replace(/<[^>]*>/g, '');
  for (const updatedRecord of ['Nestlé Iran', '15 vehicles', 'Goldiran (LG)', '19 vehicles', 'Henkel', '12 vehicles', 'Asan Pack', 'Yataqan Bosh Iran', '143 vehicles']) {
    assert.ok(enClientsText.includes(updatedRecord), `missing updated English client record: ${updatedRecord}`);
  }
  assert.equal((clients.match(/class="testimonial-card reveal"/g) ?? []).length, 3, 'all source testimonials should be present');
  assert.equal((clients.match(/class="history-table"/g) ?? []).length, 1, 'the contract history table should be present');
  assert.equal((clients.match(/<tr><th scope="row">/g) ?? []).length, 11, 'all 11 source collaboration rows should be present');
  for (const brand of ['scania', 'volvo', 'mercedes', 'iveco', 'irankhodro', 'toyota', 'hyundai']) {
    assert.ok(brands.includes(`/assets/logos/${brand}.svg`), `missing vehicle brand logo ${brand}`);
  }

  const trust = read(route('fa', 'trust'));
  const resume = read(route('fa', 'resume'));
  const legal = read(route('fa', 'legal'));
  assert.match(trust, /class="section registry-section"/);
  assert.doesNotMatch(trust, /class="section section--alt resume-section"|class="section legal-section"/);
  assert.match(resume, /class="section section--alt resume-section"/);
  assert.doesNotMatch(resume, /class="section registry-section"|class="section legal-section"/);
  assert.match(legal, /class="section legal-section"/);
  assert.doesNotMatch(legal, /class="section registry-section"|class="section section--alt resume-section"/);
});

test('English catering page preserves the complete localized menu, gallery, form and FAQ structure', () => {
  const html = read(route('en', 'services/personnel-food'));
  const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  assert.doesNotMatch(visibleHtml, /[\u0600-\u06FF]/, 'English catering page contains untranslated visible copy');
  for (const id of ['personnel-food', 'food-menu', 'food-gallery', 'food-request', 'food-faq', 'personnel-food-form', 'food-meals-mirror']) {
    assert.match(html, new RegExp(`\\bid="${id}"`), `missing English catering anchor or form hook #${id}`);
  }
  assert.equal((html.match(/class="food-tab(?:\s|"|$)/g) ?? []).length, 4, 'all four English meal tabs should be present');
  assert.equal((html.match(/class="food-panel(?:\s|"|$)/g) ?? []).length, 4, 'all four English meal panels should be present');
  assert.equal((html.match(/class="dish-card"/g) ?? []).length, 16, 'all sixteen English sample dishes should be present');
  assert.equal((html.match(/class="food-gallery__item(?: food-gallery__item--wide)?"/g) ?? []).length, 6, 'all six English gallery entries should be present');
  assert.equal((html.match(/class="food-faq__item reveal"/g) ?? []).length, 4, 'all four English FAQ entries should be present');
  assert.match(html, /Request ready in WhatsApp/, 'the English form has a localized success label');
  const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const faqData = structuredData.find((item) => item['@type'] === 'FAQPage');
  assert.equal(faqData?.mainEntity?.length, 4, 'all four English FAQ entries should be in structured data');
  assert.doesNotMatch(JSON.stringify(faqData), /[\u0600-\u06FF]/, 'English FAQ schema should be localized');

  const assetUrls = [...html.matchAll(/(?:src|srcset)="(\/Qazvintasvir\/assets\/img\/personnel-food\/[^" ]+)/g)].map((match) => match[1]);
  assert.ok(assetUrls.length >= 30, 'expected local images for English meal cards and gallery');
  for (const url of new Set(assetUrls)) {
    const assetPath = url.replace('/Qazvintasvir/', '');
    assert.ok(existsSync(resolve(dist, assetPath)), `missing built English catering asset ${url}`);
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

test('updated office details, phone numbers and icon navigation render in both locales', () => {
  for (const lang of ['fa', 'en']) {
    const pages = [
      '', 'about', 'contact', 'fleet', 'brands', 'clients', 'why-us', 'trust', 'resume', 'legal', 'services',
      ...serviceSlugs.map((slug) => `services/${slug}`),
    ];
    for (const path of pages) {
      const html = read(route(lang, path));
      assert.match(html, /tel:\+989122815189/, `first mobile phone link missing from ${lang}/${path || 'home'}`);
      assert.match(html, /tel:\+989352815189/, `second mobile phone link missing from ${lang}/${path || 'home'}`);
      assert.match(html, lang === 'fa' ? /۰۹۱۲ ۲۸۱ ۵۱۸۹/ : /\+98 912 281 5189/, `localized first phone label missing from ${lang}/${path || 'home'}`);
      assert.match(html, lang === 'fa' ? /۰۹۳۵ ۲۸۱ ۵۱۸۹/ : /\+98 935 281 5189/, `localized second phone label missing from ${lang}/${path || 'home'}`);
      assert.match(html, /tel:\+982832573842/, `head-office number link missing from ${lang}/${path || 'home'}`);
      assert.match(html, lang === 'fa' ? /۰۲۸ ۳۲۵۷ ۳۸۴۲/ : /\+98 28 3257 3842/, `head-office number label missing from ${lang}/${path || 'home'}`);
      assert.match(html, /Pasteur Hospital|بیمارستان پاستور/, `updated office landmark missing from ${lang}/${path || 'home'}`);
      assert.match(html, /Unit 208|واحد.{0,100}۲۰۸/, `updated office unit missing from ${lang}/${path || 'home'}`);
      assert.doesNotMatch(html, /Abadgaran|آبادگران|Ferdowsi Street|خیابان فردوسی|Unit 216|واحد ۲۱۶|Unit 218|واحد ۲۱۸|Khamenei Blvd|آیت‌الله خامنه‌ای/, `old office address remains on ${lang}/${path || 'home'}`);
      const phoneLinks = [...html.matchAll(/<a\b([^>]*href="tel:[^"]*"[^>]*)>([\s\S]*?)<\/a>/g)];
      assert.ok(phoneLinks.length, `no telephone links found on ${lang}/${path || 'home'}`);
      for (const [, tag, content] of phoneLinks) {
        const wholeLinkIsLtr = /\bdir="ltr"/.test(tag) && /\bclass="[^"]*\bbidi-ltr\b/.test(tag);
        const numberIsIsolated = /<bdi\b[^>]*class="[^"]*\bbidi-ltr\b[^\"]*"[^>]*dir="ltr"[^>]*>/.test(content);
        assert.ok(wholeLinkIsLtr || numberIsIsolated, `telephone number must be isolated LTR without changing surrounding copy on ${lang}/${path || 'home'}`);
      }
      assert.match(html, /class="navigation-icon" data-icon="home"/, `navigation icon missing from ${lang}/${path || 'home'}`);
    }
  }

  const notFound = readFileSync(resolve(dist, '404.html'), 'utf8');
  assert.match(notFound, /واحد.{0,100}۲۰۸/, 'localized 404 should use the updated office unit');
  assert.doesNotMatch(notFound, /Unit 218|واحد ۲۱۸/, 'old office unit must not remain on the 404 page');
  for (const [tag] of notFound.matchAll(/<a\b[^>]*href="tel:[^"]*"[^>]*>/g)) {
    assert.match(tag, /\bdir="ltr"/, '404 phone links must explicitly declare LTR direction');
    assert.match(tag, /\bclass="[^"]*\bbidi-ltr\b/, '404 phone links must use the bidi isolation class');
  }

  const faHome = read(route('fa'));
  const structuredData = [...faHome.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const organization = structuredData.find((item) => Array.isArray(item['@type']) && item['@type'].includes('Organization'));
  assert.deepEqual(organization?.telephone, ['+982832573842', '+989122815189', '+989352815189']);
  assert.match(organization?.address?.streetAddress ?? '', /جنب بیمارستان پاستور.*مجتمع تجاری نیایش.*۲۰۸/);
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

test('sitemap and robots.txt use the current GitHub Pages project URL', () => {
  const sitemap = read('sitemap-0.xml');
  assert.match(sitemap, /\/Qazvintasvir\/fa\//);
  assert.match(sitemap, /\/Qazvintasvir\/en\//);
  assert.doesNotMatch(sitemap, /\/services\/personnel-food\.html/);
  assert.doesNotMatch(sitemap, /\/Qazvintasvir\/(?!fa\/|en\/)/);
  const robots = read('robots.txt');
  assert.match(robots, /^Sitemap: https:\/\/rahmaniho\.github\.io\/Qazvintasvir\/sitemap-index\.xml$/m);
  assert.doesNotMatch(robots, /qazvintasvir\.ir/);
});

test('root entry redirects to the localized Persian root with the configured base path', () => {
  const html = read('index.html');
  assert.match(html, /url=\/Qazvintasvir\/fa\//);
  assert.doesNotMatch(html, /Qazvintasvirfa/);
  assert.match(html, /pageByLegacyHash/);
  for (const slug of ['about', 'services', ...standaloneSectionSlugs, 'contact']) {
    assert.ok(html.includes(`${slug}: '${slug}'`) || html.includes(`'${slug}': '${slug}'`), `root redirect should resolve legacy #${slug} links`);
  }
});
