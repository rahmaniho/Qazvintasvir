import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');
const read = (path) => readFileSync(resolve(dist, path), 'utf8');
const route = (lang, path = '') => `${lang}/${path ? `${path}/` : ''}index.html`;
const walkFiles = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = resolve(directory, entry.name);
  return entry.isDirectory() ? walkFiles(path) : [path];
});

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
    assert.ok(existsSync(resolve(dist, route(lang, 'articles'))), `missing /${lang}/articles/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'articles/services-guide'))), `missing /${lang}/articles/services-guide/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'articles/permitted-goods-trade'))), `missing /${lang}/articles/permitted-goods-trade/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'articles/factory-staff-transport-qazvin'))), `missing /${lang}/articles/factory-staff-transport-qazvin/`);
    assert.ok(existsSync(resolve(dist, route(lang, 'articles/corporate-catering-qazvin'))), `missing /${lang}/articles/corporate-catering-qazvin/`);
    for (const slug of standaloneSectionSlugs) {
      assert.ok(existsSync(resolve(dist, route(lang, slug))), `missing /${lang}/${slug}/`);
    }
    for (const slug of serviceSlugs) {
      assert.ok(existsSync(resolve(dist, route(lang, `services/${slug}`))), `missing /${lang}/services/${slug}/`);
    }
  }
  assert.ok(existsSync(resolve(dist, '404.html')), 'missing localized 404 output');
});

test('Persian font assets and editorial typography are wired across all article detail pages', () => {
  for (const font of ['BNazanin.woff', 'BTitrBold.woff']) {
    const path = resolve(dist, 'fonts/fonts', font);
    assert.ok(existsSync(path), `missing generated font asset ${font}`);
    assert.equal(readFileSync(path).toString('ascii', 0, 4), 'wOFF', `${font} must be a valid WOFF file`);
  }

  const baseCss = readFileSync(resolve(root, 'src/styles/base.css'), 'utf8');
  const tokensCss = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
  const articlesCss = readFileSync(resolve(root, 'src/styles/articles.css'), 'utf8');
  assert.match(baseCss, /font-family:\s*["']BNazanin["']/);
  assert.match(baseCss, /font-family:\s*["']BTitrBold["']/);
  assert.match(baseCss, /size-adjust:\s*110%/);
  assert.match(baseCss, /size-adjust:\s*88%/);
  assert.match(baseCss, /html\[lang="fa"\]\s+h1/);
  assert.match(baseCss, /html\[lang="fa"\]\s*\{[^}]*--font-numbers:\s*var\(--font-persian\)/);
  assert.match(tokensCss, /--font-persian:\s*'BNazanin'/);
  assert.match(tokensCss, /--font-heading-persian:\s*'BTitrBold'/);
  assert.match(articlesCss, /\.guide-overview__number\s*\{[^}]*font-family:\s*var\(--font-numbers\)/);
  assert.match(articlesCss, /\.guide-step__number\s*\{[^}]*font-family:\s*var\(--font-numbers\)/);
  assert.match(articlesCss, /\.guide-hero\s*\{[^}]*background:\s*var\(--surface-bg\)/);

  const persianHome = read(route('fa'));
  const englishHome = read(route('en'));
  assert.match(persianHome, /rel="preload" href="\/fonts\/fonts\/BNazanin\.woff"/);
  assert.match(persianHome, /rel="preload" href="\/fonts\/fonts\/BTitrBold\.woff"/);
  assert.doesNotMatch(englishHome, /rel="preload" href="\/fonts\/fonts\/(?:BNazanin|BTitrBold)\.woff"/);

  const articlePaths = [
    'services-guide', 'permitted-goods-trade',
    'factory-staff-transport-qazvin', 'corporate-catering-qazvin',
  ];
  for (const lang of ['fa', 'en']) {
    for (const slug of articlePaths) {
      const html = read(route(lang, `articles/${slug}`));
      assert.match(html, /class="editorial-eyebrow editorial-eyebrow--article"/);
      assert.match(html, /class="guide-hero"/);
    }
  }
});

test('Persian ezafe after final heh uses the font-safe spelling throughout the site', () => {
  const pages = walkFiles(resolve(dist, 'fa')).filter((path) => path.endsWith('.html'));
  assert.ok(pages.length > 0, 'Persian static pages should be generated');
  for (const path of pages) {
    const html = readFileSync(path, 'utf8');
    assert.doesNotMatch(html, /\u0647\u0654/u, `${path} should not contain the problematic combining hamza form`);
  }
  const articles = read(route('fa', 'articles'));
  assert.ok(articles.includes('مطالعه‌ی راهنما'));
  assert.ok(articles.includes('همه‌ی مقاله‌ها'));
});

test('the bilingual articles index is discoverable in desktop and mobile navigation', () => {
  for (const [lang, label] of [['fa', 'مقاله‌ها'], ['en', 'Articles']]) {
    const home = read(route(lang));
    const href = `/${lang}/articles/`;
    assert.ok(home.includes(`<a href="${href}" class="nav-menu__link"`), `desktop article link missing for ${lang}`);
    assert.ok(home.includes(`<a href="${href}" class="mobile-drawer__link"`), `mobile article link missing for ${lang}`);
    assert.ok(home.includes(label), `localized article label missing for ${lang}`);

    const index = read(route(lang, 'articles'));
    assert.ok(index.includes(`<a href="${href}" class="nav-menu__link" aria-current="page"`), `desktop article link should be marked current on ${lang} index`);
    assert.ok(index.includes(`<a href="${href}" class="mobile-drawer__link" aria-current="page"`), `mobile article link should be marked current on ${lang} index`);
  }
});

test('Persian about page uses refined copy and stable RTL typography hooks', () => {
  const html = read(route('fa', 'about'));
  assert.match(html, /درباره‌ی قزوین تصویر \| همراه صنایع قزوین از ۱۳۷۴/);
  assert.match(html, /بیش از <bdi class="bidi-ltr" dir="ltr">۳۱<\/bdi> سال، همراه صنایع قزوین/);
  assert.match(html, /class="about-facts"/);
  assert.match(html, /class="about-address-unit"/);
  assert.match(html, /class="[^"]*\babout-activities-header\b[^"]*"/);
  assert.match(html, /رئیس هیئت‌مدیره/);
  assert.doesNotMatch(html, /شناسه مالیاتی/);

  const css = readFileSync(resolve(root, 'src/styles/components.css'), 'utf8');
  assert.match(css, /\.about-page \.about-facts dd[^{]*\{[^}]*overflow-wrap:\s*anywhere/);
  assert.match(css, /\.about-page \.about-address-unit[^{]*\{[^}]*white-space:\s*nowrap/);
  assert.match(css, /\.about-page \.about-hero \.hero__lead[^{]*\{[^}]*text-wrap:\s*pretty/);
});

test('fleet-brand pages render local graphic marks with a subtle neon orbit', () => {
  const assets = [
    'scania.png', 'volvo.png', 'mercedes.png', 'iveco.png',
    'iran-khodro-diesel.png', 'toyota.png', 'hyundai.png',
  ];
  for (const lang of ['fa', 'en']) {
    const html = read(route(lang, 'brands'));
    assert.equal((html.match(/<li class="brand-partners__item[^\"]*"/g) ?? []).length, assets.length, `all fleet marks should render on ${lang}/brands/`);
    for (const asset of assets) {
      assert.ok(html.includes(`/assets/logos/${asset}`), `${asset} missing from ${lang}/brands/`);
      const path = resolve(root, 'public/assets/logos', asset);
      assert.ok(existsSync(path), `missing local brand asset ${asset}`);
      const png = readFileSync(path);
      assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a', `${asset} must be a PNG`);
      assert.equal(png.readUInt8(25), 6, `${asset} must retain transparency`);
      assert.ok(png.readUInt32BE(16) > 0 && png.readUInt32BE(20) > 0, `${asset} must have valid dimensions`);
    }
    assert.match(html, /aria-label="(?:نشان برندهای خودرو|Vehicle brand logos)"/);
    const logoTags = [...html.matchAll(/<img\b(?=[^>]*class="brand-partners__logo")[^>]*>/g)].map(([tag]) => tag);
    assert.equal(logoTags.length, assets.length, `all logo images should render on ${lang}/brands/`);
    for (const tag of logoTags) assert.match(tag, /loading="eager"/, `brand logos should load immediately on ${lang}/brands/`);
  }

  const css = readFileSync(resolve(root, 'src/styles/components.css'), 'utf8');
  assert.match(css, /\.brand-partners__logo-frame::before[^{]*\{[^}]*animation:\s*brand-neon-orbit/);
  assert.match(css, /\.brand-partners__logo-frame::after[^{]*\{[^}]*inset:\s*2px/, 'neon orbit should be a visible but still thin 2px ring');
  assert.match(css, /@keyframes brand-neon-orbit/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.brand-partners__logo-frame::before[^}]*animation:\s*none/);
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
  const paths = ['', 'about', 'contact', 'services', 'articles', 'articles/services-guide', 'articles/permitted-goods-trade', 'articles/factory-staff-transport-qazvin', 'articles/corporate-catering-qazvin', ...standaloneSectionSlugs, ...serviceSlugs.map((slug) => `services/${slug}`)];
  for (const path of paths) {
    const html = read(route('en', path));
    const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
    const name = path || 'home';
    assert.doesNotMatch(visibleHtml, persianOrArabic, `English page ${name} contains untranslated visible copy`);
    assert.match(html, /<html[^>]*lang="en"[^>]*dir="ltr"|<html[^>]*dir="ltr"[^>]*lang="en"/, `incorrect document language or direction on ${name}`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical?.startsWith('https://qazvintasvir.ir/'), `canonical must use the confirmed domain on ${name}`);
    assert.doesNotMatch(html, /\/Qazvintasvir\//, `old project base should not appear on ${name}`);
    if (path) {
      assert.match(html, new RegExp(`rel="canonical" href="[^"]*/en/${path}/"`), `missing English canonical for ${name}`);
      assert.match(html, new RegExp(`hreflang="fa" href="[^"]*/fa/${path}/"`), `missing Persian alternate for ${name}`);
    }
  }
});

test('bilingual service-guide articles publish localized Article, FAQ and service-list structured data', () => {
  for (const lang of ['fa', 'en']) {
    const html = read(route(lang, 'articles/services-guide'));
    assert.match(html, /property="og:type" content="article"/);
    assert.match(html, /class="guide-answer"/, `missing concise answer block on ${lang} article`);
    assert.match(html, /class="guide-faq__list"/, `missing visible FAQ on ${lang} article`);
    assert.match(html, /class="guide-service-card"/, `missing internal service cards on ${lang} article`);
    for (const slug of serviceSlugs) assert.ok(html.includes(`/${lang}/services/${slug}/`), `${slug} missing from ${lang} article`);

    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const graph = scripts.find((schema) => Array.isArray(schema['@graph']))?.['@graph'] ?? [];
    assert.ok(graph.some((schema) => schema['@type'] === 'Article' && schema.inLanguage === lang), `localized Article schema missing for ${lang}`);
    const faq = graph.find((schema) => schema['@type'] === 'FAQPage');
    const items = graph.find((schema) => schema['@type'] === 'ItemList');
    assert.equal(faq?.mainEntity?.length, 5, `FAQ schema should match visible questions on ${lang} article`);
    assert.equal(items?.itemListElement?.length, 8, `article should reference all eight source services in ${lang}`);
  }

  for (const asset of ['services-guide-hero.jpg', 'services-guide-trade.jpg', 'services-guide-mobility.jpg', 'services-guide-catering.jpg']) {
    assert.ok(existsSync(resolve(dist, 'assets/img/articles', asset)), `missing service-guide image ${asset}`);
  }
});

test('permitted-goods article explains classification, cites references and avoids an unverified whitelist', () => {
  const persianOrArabic = /[\u0600-\u06FF]/;
  for (const lang of ['fa', 'en']) {
    const html = read(route(lang, 'articles/permitted-goods-trade'));
    assert.match(html, /class="guide-status-table"/, `missing the three-status comparison table on ${lang}`);
    assert.match(html, /class="guide-steps"/, `missing the practical review checklist on ${lang}`);
    assert.match(html, /class="guide-risk-panel"/, `missing common-risk guidance on ${lang}`);
    assert.match(html, /class="guide-sources[^\"]*"/, `missing source references on ${lang}`);
    assert.match(html, /nezamat\.ir\/post-28025/);
    assert.match(html, /tpo\.ir\//);
    assert.match(html, /irica\.ir/);
    assert.match(html, /guide-caution/, 'examples should be labeled as illustrative, not a permitted-goods list');

    const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
    if (lang === 'en') assert.doesNotMatch(visibleHtml, persianOrArabic, 'English trade article should be fully localized');
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const graph = scripts.find((schema) => Array.isArray(schema['@graph']))?.['@graph'] ?? [];
    assert.ok(graph.some((schema) => schema['@type'] === 'Article' && schema.inLanguage === lang), `Article schema missing for ${lang}`);
    assert.equal(graph.find((schema) => schema['@type'] === 'FAQPage')?.mainEntity?.length, 5, `FAQ structured data should cover all visible questions in ${lang}`);
  }

  for (const lang of ['fa', 'en']) {
    const index = read(route(lang, 'articles'));
    assert.equal((index.match(/class="editorial-feature"/g) ?? []).length, 1, `exactly one featured article should render for ${lang}`);
    assert.equal((index.match(/class="editorial-card"/g) ?? []).length, 3, `the remaining three articles should render as cards for ${lang}`);
    assert.match(index, /INSIGHTS &amp; GUIDES/, `editorial eyebrow missing for ${lang}`);
    assert.match(index, /<h1 id="articles-heading">/, `page should retain one prominent H1 for ${lang}`);
    assert.match(index, /rel="canonical" href="https:\/\/qazvintasvir\.ir\//, `canonical missing for ${lang}`);
    const collectionSchema = [...index.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]))
      .find((schema) => schema['@type'] === 'CollectionPage');
    assert.equal(collectionSchema?.mainEntity?.itemListElement?.length, 4, `collection schema should retain all four guides for ${lang}`);
    for (const slug of ['services-guide', 'permitted-goods-trade', 'factory-staff-transport-qazvin', 'corporate-catering-qazvin']) {
      assert.ok(index.includes(`/${lang}/articles/${slug}/`), `${slug} missing from ${lang} article index`);
    }
  }
  for (const asset of ['permitted-goods-hero.jpg', 'permitted-goods-industrial.jpg', 'permitted-goods-agri.jpg']) {
    assert.ok(existsSync(resolve(dist, 'assets/img/articles', asset)), `missing permitted-goods illustration ${asset}`);
  }
});

test('industrial transport and corporate catering articles render bilingual guidance, structured data and image sets', () => {
  const entries = [
    { slug: 'factory-staff-transport-qazvin', service: 'factory-transport', images: ['industrial-shuttle-hero.jpg', 'industrial-shuttle-minibus.jpg', 'industrial-shuttle-planning.jpg'] },
    { slug: 'corporate-catering-qazvin', service: 'personnel-food', images: ['corporate-catering-hero.jpg', 'corporate-catering-meal-delivery.jpg', 'corporate-catering-hospitality.jpg'] },
  ];
  const persianOrArabic = /[\u0600-\u06FF]/;
  for (const { slug, service, images } of entries) {
    for (const lang of ['fa', 'en']) {
      const html = read(route(lang, `articles/${slug}`));
      assert.match(html, /class="guide-answer"/, `missing concise answer on ${lang}/${slug}`);
      assert.match(html, /class="guide-example-grid guide-example-grid--three"/, `missing varied image gallery on ${lang}/${slug}`);
      assert.ok(html.includes(`/${lang}/services/${service}/`), `missing service detail link on ${lang}/${slug}`);
      const visibleHtml = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
      if (lang === 'en') assert.doesNotMatch(visibleHtml, persianOrArabic, `English article ${slug} contains untranslated copy`);
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
      const graph = schemas.find((schema) => Array.isArray(schema['@graph']))?.['@graph'] ?? [];
      assert.ok(graph.some((schema) => schema['@type'] === 'Article' && schema.inLanguage === lang), `Article schema missing for ${lang}/${slug}`);
      assert.ok((graph.find((schema) => schema['@type'] === 'FAQPage')?.mainEntity?.length ?? 0) >= 5, `FAQ schema missing for ${lang}/${slug}`);
      for (const image of images) {
        assert.ok(html.includes(image), `${image} is not used by ${lang}/${slug}`);
        assert.ok(existsSync(resolve(dist, 'assets/img/articles', image)), `missing article image ${image}`);
      }
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

test('company email is reachable from contact and catering pages in both locales', () => {
  const email = 'qazvin.tasvir@gmail.com';
  for (const lang of ['fa', 'en']) {
    const contact = read(route(lang, 'contact'));
    const food = read(route(lang, 'services/personnel-food'));
    assert.ok(contact.includes(`href="mailto:${email}"`), `missing company email link on ${lang} contact page`);
    assert.ok(food.includes(`href="mailto:${email}"`), `missing company email link on ${lang} catering page`);
    assert.ok(contact.includes(`>${email}</a>`), `email address should be visible on ${lang} contact page`);
    const schemas = [...food.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const organization = schemas.find((item) => Array.isArray(item['@type']) && item['@type'].includes('Organization'));
    assert.equal(organization?.email, email, `organization schema should include the email on ${lang} catering page`);
  }
});

test('urban and VIP service pages use the generated local transport imagery', () => {
  const cityImageUrl = '/assets/img/fleet-specs/urban-vip-city-van.jpg';
  const interiorImageUrl = '/assets/img/fleet-specs/urban-vip-interior.jpg';
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
  const exteriorUrl = '/assets/images/hyundai-minibus-exterior.jpg';
  const interiorUrl = '/assets/images/hyundai-minibus-interior.jpg';
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
        assert.match(html, new RegExp(`/${lang}/services/`), `related-service links should remain in the ${lang} locale`);
      }
    }
  }
});

test('homepages place an accessible bilingual client-logo ticker immediately after the hero', () => {
  const assets = [
    'yataqan-bosh.png', 'sahar.png', 'agt.png', 'asanpack.png', 'henkel.png', 'unilever.png',
    'bat.png', 'goldiran.png', 'lg.webp', 'alborz-cable.png', 'alkaplastik.png', 'nestle.png',
  ];
  for (const lang of ['fa', 'en']) {
    const html = read(route(lang));
    const heroIndex = html.indexOf('id="hero"');
    const tickerIndex = html.indexOf('class="client-marquee"');
    const directoryIndex = html.indexOf('id="home-directory-title"');
    assert.ok(heroIndex >= 0 && heroIndex < tickerIndex && tickerIndex < directoryIndex, `client ticker should sit between the hero and directory on ${lang}/`);
    assert.match(html, lang === 'fa' ? /برندهایی که به ما اعتماد کرده‌اند/ : /Brands that trust Qazvin Tasvir/);
    assert.match(html, /aria-label="(?:نوار لوگوهای مشتریان|Client brand logo ticker)"/);
    assert.match(html, /class="client-marquee__viewport"[^>]*tabindex="0"/, 'the logo viewport should be keyboard-scrollable');
    for (const asset of assets) {
      const url = `/assets/images/clients/${asset}`;
      assert.equal(html.split(url).length - 1, 2, `${asset} should be included in both ticker cycles on ${lang}/`);
      assert.ok(existsSync(resolve(root, 'public/assets/images/clients', asset)), `missing local client logo ${asset}`);
    }
    const clientsPage = read(route(lang, 'clients'));
    assert.ok(clientsPage.includes('/assets/images/clients/lg.webp'), `the supplied LG logo should be used on ${lang}/clients/`);
  }
  const suppliedLg = readFileSync(resolve(root, 'public/assets/images/clients/lg.webp'));
  assert.equal(suppliedLg.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(suppliedLg.subarray(8, 12).toString('ascii'), 'WEBP');

  const faBrands = read(route('fa', 'brands'));
  assert.doesNotMatch(faBrands, /نشان‌های گرافیکی سازندگان خودروهای به‌کاررفته در ناوگان قزوین تصویر را ببینید/);

  const css = readFileSync(resolve(root, 'src/styles/components.css'), 'utf8');
  assert.match(css, /\.client-marquee__panel[^{]*\{[^}]*backdrop-filter:\s*blur/);
  assert.match(css, /\.client-marquee__logo-card\s*\{[^}]*flex:\s*0 0 168px/, 'logo frames should be large enough to display the full marks');
  assert.match(css, /\.client-marquee__logo-card img\s*\{[^}]*inline-size:\s*55%;[^}]*block-size:\s*55%/, 'logos should reflect the requested 25% size increase');
  assert.match(css, /\.client-marquee__logo-card\s*\{[^}]*backdrop-filter:\s*blur/, 'each logo should sit on a frosted-glass card');
  assert.match(css, /\.client-marquee__logo-card--lg\s*\{[^}]*background:\s*rgb\(255 255 255 \/ 62%\)/, 'the supplied dark LG wordmark should sit on a light glass card');
  assert.match(css, /@keyframes client-marquee-scroll/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.client-marquee__track\s*\{\s*animation:\s*none/);
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
      assert.ok(html.includes(`/${lang}/${slug}/`), `/${lang}/ directory should link to /${lang}/${slug}/`);
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
  assert.equal((brands.match(/class="brand-partners__item[^\"]*\breveal\b[^\"]*"/g) ?? []).length, 7, 'all seven vehicle-brand cards should be on the brands page');
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
  for (const asset of ['scania.png', 'volvo.png', 'mercedes.png', 'iveco.png', 'iran-khodro-diesel.png', 'toyota.png', 'hyundai.png']) {
    assert.ok(brands.includes(`/assets/logos/${asset}`), `missing vehicle brand logo ${asset}`);
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
  assert.match(html, /Sample options for four meal periods/, 'the English page presents the dishes as menu examples');
  assert.match(html, /food-headcount-hint/, 'the English form clarifies the difference between staff count and meal minimum');
  for (const id of ['food-company', 'food-person', 'food-phone', 'food-headcount', 'food-address', 'food-notes']) {
    const inputAt = html.indexOf(`id="${id}"`);
    const labelAt = html.lastIndexOf(`for="${id}"`, inputAt);
    assert.ok(labelAt >= 0 && labelAt < inputAt, `English form label for #${id} should precede its control`);
  }
  assert.doesNotMatch(html, /Seven days, 28 menu items|HACCP standards/, 'the English page avoids unsupported menu-count and certification claims');
  const structuredData = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const faqData = structuredData.find((item) => item['@type'] === 'FAQPage');
  assert.equal(faqData?.mainEntity?.length, 4, 'all four English FAQ entries should be in structured data');
  assert.doesNotMatch(JSON.stringify(faqData), /[\u0600-\u06FF]/, 'English FAQ schema should be localized');

  const assetUrls = [...html.matchAll(/(?:src|srcset)="(\/assets\/img\/personnel-food\/[^" ]+)/g)].map((match) => match[1]);
  assert.ok(assetUrls.length >= 30, 'expected local images for English meal cards and gallery');
  for (const url of new Set(assetUrls)) {
    const assetPath = url.slice(1);
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
  assert.match(html, /food-headcount-hint/, 'the Persian form explains the initial staff-count estimate and usual per-meal minimum');
  for (const id of ['food-company', 'food-person', 'food-phone', 'food-headcount', 'food-address', 'food-notes']) {
    const inputAt = html.indexOf(`id="${id}"`);
    const labelAt = html.lastIndexOf(`for="${id}"`, inputAt);
    assert.ok(labelAt >= 0 && labelAt < inputAt, `Persian form label for #${id} should precede its control`);
  }
  assert.match(html, /نمونه‌هایی برای برنامه‌ریزی چهار وعده/, 'the menu is presented as a sample rather than a fixed 28-item plan');
  assert.doesNotMatch(html, /قیمت‌های پایه فوق|استاندارد HACCP|۷<\/bdi> روز، <bdi[^>]*>۲۸/, 'the Persian page does not refer to absent prices or unsupported certification/menu-count claims');

  const assetUrls = [...html.matchAll(/(?:src|srcset)="(\/assets\/[^" ]+)/g)].map((match) => match[1]);
  assert.ok(assetUrls.length >= 20, 'expected local catering image assets');
  for (const url of new Set(assetUrls)) {
    const assetPath = url.slice(1);
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

test('sitemap and robots.txt use the confirmed custom domain', () => {
  const sitemap = read('sitemap-0.xml');
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/fa\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/en\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/fa\/articles\/services-guide\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/en\/articles\/services-guide\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/fa\/articles\/permitted-goods-trade\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/en\/articles\/permitted-goods-trade\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/fa\/articles\/factory-staff-transport-qazvin\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/en\/articles\/factory-staff-transport-qazvin\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/fa\/articles\/corporate-catering-qazvin\//);
  assert.match(sitemap, /https:\/\/qazvintasvir\.ir\/en\/articles\/corporate-catering-qazvin\//);
  assert.doesNotMatch(sitemap, /\/services\/personnel-food\.html/);
  assert.doesNotMatch(sitemap, /\/Qazvintasvir\//);
  const robots = read('robots.txt');
  assert.match(robots, /^Allow: \*$/m, 'robots.txt should allow all paths');
  assert.match(robots, /^Sitemap: https:\/\/qazvintasvir\.ir\/sitemap\.xml$/m);
  assert.equal((robots.match(/^Sitemap:/gm) ?? []).length, 1, 'robots.txt should advertise one canonical sitemap entry point');
  assert.doesNotMatch(robots, /rahmaniho\.github\.io|\/Qazvintasvir\//);
  assert.doesNotMatch(sitemap, /rahmaniho\.github\.io/);
  assert.equal(readFileSync(resolve(dist, 'CNAME'), 'utf8').trim(), 'qazvintasvir.ir', 'Pages artifact should retain the custom domain');
});

test('root entry redirects to the localized Persian root at the custom-domain root', () => {
  const html = read('index.html');
  assert.match(html, /url=\/fa\//);
  assert.doesNotMatch(html, /\/Qazvintasvir\//);
  assert.match(html, /pageByLegacyHash/);
  for (const slug of ['about', 'services', ...standaloneSectionSlugs, 'contact']) {
    assert.ok(html.includes(`${slug}: '${slug}'`) || html.includes(`'${slug}': '${slug}'`), `root redirect should resolve legacy #${slug} links`);
  }
});

test('Google Search Console verification file, meta tag and crawl directives are published', () => {
  const token = 'MBflR_hp5tDbD_VXkspc-6f1pcbB59wfEr45Ye3VnRw';
  const verificationFile = resolve(dist, 'googled6648bb785ab023d.html');
  assert.ok(existsSync(verificationFile), 'missing Google Search Console verification file');
  assert.equal(
    readFileSync(verificationFile, 'utf8').trim(),
    'google-site-verification: googled6648bb785ab023d.html',
    'verification file must keep the exact Google token',
  );

  for (const path of ['index.html', route('fa'), route('en'), route('fa', 'about'), route('fa', 'services/customs-port'), route('en', 'contact')]) {
    const html = read(path);
    assert.match(
      html,
      new RegExp(`<meta name="google-site-verification" content="${token}"\\s*/?>`),
      `missing Google verification meta on ${path}`,
    );
  }

  const home = read(route('fa'));
  assert.match(home, /<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"\s*\/?>/);
  assert.match(home, /<meta property="og:image" content="https:\/\/qazvintasvir\.ir\/assets\/images\/og-image\.jpg"/);
  assert.match(home, /<meta property="og:locale:alternate" content="en_US"/);
  assert.match(home, /<meta name="twitter:image:alt"/);
  assert.match(read('404.html'), /<meta name="robots" content="noindex, nofollow"/);
});

test('sitemap exposes hreflang alternates for every indexable page', () => {
  const sitemap = read('sitemap-0.xml');
  const blocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  assert.equal(blocks.length, 48, 'sitemap should list the 48 localized indexable pages');
  for (const block of blocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    assert.ok(loc, 'every sitemap entry needs a loc');
    const path = new URL(loc).pathname;
    const rest = path.replace(/^\/(fa|en)/, '');
    assert.ok(block.includes(`hreflang="fa" href="https://qazvintasvir.ir/fa${rest}"`), `missing fa alternate for ${loc}`);
    assert.ok(block.includes(`hreflang="en" href="https://qazvintasvir.ir/en${rest}"`), `missing en alternate for ${loc}`);
    assert.ok(block.includes(`hreflang="x-default" href="https://qazvintasvir.ir/fa${rest}"`), `missing x-default alternate for ${loc}`);
  }
  assert.doesNotMatch(sitemap, /<loc>https:\/\/qazvintasvir\.ir\/services\//, 'legacy redirect pages must stay out of the sitemap');
});

test('homepages publish linked WebSite, Organization and WebPage entities', () => {
  for (const lang of ['fa', 'en']) {
    const html = read(route(lang));
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
    const org = schemas.find((schema) => Array.isArray(schema['@type']) && schema['@type'].includes('Organization'));
    const website = schemas.find((schema) => schema['@type'] === 'WebSite');
    const webpage = schemas.find((schema) => schema['@type'] === 'WebPage');
    assert.equal(org?.['@id'], 'https://qazvintasvir.ir/#organization', `missing organization id on ${lang} home`);
    assert.equal(org?.logo?.width, 512, `organization logo width on ${lang} home`);
    assert.equal(org?.logo?.height, 512, `organization logo height on ${lang} home`);
    assert.equal(org?.image, 'https://qazvintasvir.ir/assets/images/og-image.jpg', `organization image on ${lang} home`);
    assert.equal(website?.['@id'], 'https://qazvintasvir.ir/#website', `missing website id on ${lang} home`);
    assert.equal(website?.publisher?.['@id'], 'https://qazvintasvir.ir/#organization', `website publisher on ${lang} home`);
    assert.equal(webpage?.['@id'], `https://qazvintasvir.ir/${lang}/`, `missing webpage id on ${lang} home`);
    assert.equal(webpage?.isPartOf?.['@id'], 'https://qazvintasvir.ir/#website', `webpage parent on ${lang} home`);
  }
});

test('article pages expose visible and structured publication dates', () => {
  const articleSlugs = ['services-guide', 'permitted-goods-trade', 'factory-staff-transport-qazvin', 'corporate-catering-qazvin'];
  for (const lang of ['fa', 'en']) {
    for (const slug of articleSlugs) {
      const html = read(route(lang, `articles/${slug}`));
      assert.match(html, /class="guide-dates"/, `missing visible dates on ${lang}/${slug}`);
      assert.match(html, /<time datetime="2026-10-19">/, `missing published time on ${lang}/${slug}`);
      assert.match(html, /"datePublished":"2026-10-19"/, `missing datePublished on ${lang}/${slug}`);
      assert.match(html, /"dateModified":"2026-10-20"/, `missing dateModified on ${lang}/${slug}`);
    }
  }
});

test('standalone section pages expose BreadcrumbList structured data', () => {
  for (const lang of ['fa', 'en']) {
    for (const slug of standaloneSectionSlugs) {
      const html = read(route(lang, slug));
      assert.match(html, /"@type":"BreadcrumbList"/, `missing breadcrumb schema on ${lang}/${slug}`);
      assert.ok(
        html.includes(`"item":"https://qazvintasvir.ir/${lang}/${slug}/"`),
        `breadcrumb should link the page on ${lang}/${slug}`,
      );
    }
  }
});

test('every internal route and asset link resolves in the built site', () => {
  const htmlFiles = walkFiles(dist).filter((path) => path.endsWith('.html'));
  const links = new Set();
  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
      if (!match[1].startsWith('//')) links.add(match[1]);
    }
  }
  assert.ok(links.size > 0, 'the built pages should contain internal links');
  for (const link of links) {
    if (link === '/') continue;
    const candidates = [
      resolve(dist, link.slice(1)),
      resolve(dist, link.replace(/\/$/, ''), 'index.html'),
      resolve(dist, `${link.slice(1)}.html`),
    ];
    assert.ok(candidates.some((candidate) => existsSync(candidate)), `broken internal link: ${link}`);
  }
});

const indexableArticleSlugs = ['services-guide', 'permitted-goods-trade', 'factory-staff-transport-qazvin', 'corporate-catering-qazvin'];
const indexableRoutes = [
  ...['fa', 'en'].flatMap((lang) => [
    route(lang),
    ...standaloneSectionSlugs.map((slug) => route(lang, slug)),
    route(lang, 'about'),
    route(lang, 'contact'),
    route(lang, 'services'),
    route(lang, 'articles'),
    ...indexableArticleSlugs.map((slug) => route(lang, `articles/${slug}`)),
    ...serviceSlugs.map((slug) => route(lang, `services/${slug}`)),
  ]),
];

test('every indexable page ships complete snippet metadata and linked entities', () => {
  for (const path of indexableRoutes) {
    const html = read(path);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
    const description = html.match(/<meta name="description" content="([^"]*)"\s*\/?>/)?.[1] ?? '';
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(title.length > 0 && title.length <= 60, `title length ${title.length} outside 1-60 for ${path}`);
    assert.ok(description.length >= 70 && description.length <= 160, `description length ${description.length} outside 70-160 for ${path}`);
    assert.match(canonical ?? '', /^https:\/\/qazvintasvir\.ir\//, `canonical must be absolute for ${path}`);
    assert.ok(html.includes('href="/favicon.ico"'), `favicon.ico link missing on ${path}`);
    assert.match(html, /<meta property="og:image:alt" content="[^"]+"/, `og:image:alt missing on ${path}`);
    assert.match(html, /<meta name="robots" content="index, follow, max-image-preview:large/, `robots directives missing on ${path}`);

    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((match) => JSON.parse(match[1]));
    const organizations = schemas.filter((schema) => Array.isArray(schema['@type']) && schema['@type'].includes('Organization'));
    const websites = schemas.filter((schema) => schema['@type'] === 'WebSite');
    const webpages = schemas.filter((schema) => schema['@type'] === 'WebPage');
    assert.equal(organizations.length, 1, `exactly one Organization entity expected on ${path}`);
    assert.equal(websites.length, 1, `exactly one WebSite entity expected on ${path}`);
    assert.equal(webpages.length, 1, `exactly one WebPage entity expected on ${path}`);
    assert.equal(webpages[0]['@id'], canonical, `WebPage @id should match the canonical on ${path}`);
    assert.equal(webpages[0].isPartOf?.['@id'], 'https://qazvintasvir.ir/#website', `WebPage parent missing on ${path}`);
    assert.equal(websites[0].publisher?.['@id'], 'https://qazvintasvir.ir/#organization', `WebSite publisher missing on ${path}`);
  }
});

test('article structured data points back to the page WebPage entity', () => {
  for (const lang of ['fa', 'en']) {
    for (const slug of indexableArticleSlugs) {
      const html = read(route(lang, `articles/${slug}`));
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
      const article = schemas.find((schema) => Array.isArray(schema['@graph']))
        ?.['@graph'].find((node) => node['@type'] === 'Article');
      const webpage = schemas.find((schema) => schema['@type'] === 'WebPage');
      assert.ok(article, `Article schema missing on ${lang}/${slug}`);
      assert.equal(article.mainEntityOfPage?.['@id'], webpage?.['@id'], `Article should reference the page WebPage node on ${lang}/${slug}`);
      assert.equal(article.publisher?.['@id'], 'https://qazvintasvir.ir/#organization', `Article publisher reference missing on ${lang}/${slug}`);
      assert.match(article.author?.['@id'] ?? '', /^https:\/\/qazvintasvir\.ir\/#organization$/, `Article author reference missing on ${lang}/${slug}`);
      assert.match(html, /<meta property="article:published_time" content="2026-10-19"/, `article:published_time missing on ${lang}/${slug}`);
      assert.match(html, /<meta property="article:modified_time" content="2026-10-20"/, `article:modified_time missing on ${lang}/${slug}`);
    }
  }
});

test('multi-resolution favicons are published for search and browser surfaces', () => {
  const icons = [
    ['favicon.ico', 512],
    ['assets/images/brand/qazvin-tasvir-icon-32.png', 32],
    ['assets/images/brand/qazvin-tasvir-icon-48.png', 48],
    ['assets/images/brand/qazvin-tasvir-icon-96.png', 96],
    ['assets/images/brand/qazvin-tasvir-icon-144.png', 144],
    ['assets/images/brand/qazvin-tasvir-apple-touch.png', 180],
  ];
  for (const [asset, size] of icons) {
    const path = resolve(dist, asset);
    assert.ok(existsSync(path), `missing icon ${asset}`);
    const png = readFileSync(path);
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a', `${asset} must be a PNG payload`);
    assert.equal(png.readUInt32BE(16), size, `${asset} width mismatch`);
    assert.equal(png.readUInt32BE(20), size, `${asset} height mismatch`);
  }
});

test('sitemap marks article URLs with the content update date', () => {
  const sitemap = read('sitemap-0.xml');
  for (const lang of ['fa', 'en']) {
    for (const slug of ['services-guide', 'permitted-goods-trade', 'factory-staff-transport-qazvin', 'corporate-catering-qazvin']) {
      assert.match(
        sitemap,
        new RegExp(`<loc>https://qazvintasvir\\.ir/${lang}/articles/${slug}/</loc><lastmod>2026-10-20`),
        `missing lastmod for ${lang}/${slug}`,
      );
    }
  }
  for (const lang of ['fa', 'en']) {
    assert.match(
      sitemap,
      new RegExp(`<loc>https://qazvintasvir\\.ir/${lang}/articles/</loc><lastmod>2026-10-20`),
      `missing lastmod for the ${lang} article index`,
    );
  }
  assert.equal((sitemap.match(/<lastmod>/g) ?? []).length, 10, 'only the article index and article detail URLs should declare lastmod');
});

test('root sitemap.xml directly exposes the generated URL set for search engines', () => {
  const sitemap = read('sitemap.xml');
  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  assert.doesNotMatch(sitemap, /<sitemapindex/, 'a single sitemap should expose URLs directly, not point to another sitemap');
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 48, 'URL set should keep all 48 indexable pages');
  assert.doesNotMatch(sitemap, /<loc>https:\/\/qazvintasvir\.ir\/sitemap[^<]*<\/loc>/, 'sitemaps must not list themselves');

  const robots = read('robots.txt');
  assert.match(robots, /^Sitemap: https:\/\/qazvintasvir\.ir\/sitemap\.xml$/m, 'robots.txt should advertise /sitemap.xml');
  assert.equal((robots.match(/^Sitemap:/gm) ?? []).length, 1, 'robots.txt should advertise one canonical sitemap entry point');
});

test('every sitemap URL is built, self-canonical and indexable', () => {
  const chunk = read('sitemap-0.xml');
  const locs = [...chunk.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(locs.length, 48, 'sitemap URL set size');
  for (const loc of locs) {
    const htmlPath = resolve(dist, new URL(loc).pathname.replace(/^\//, ''), 'index.html');
    assert.ok(existsSync(htmlPath), `sitemap URL is not built: ${loc}`);
    const html = readFileSync(htmlPath, 'utf8');
    assert.ok(html.includes(`<link rel="canonical" href="${loc}"`), `canonical mismatch for ${loc}`);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex/, `sitemap URL is noindex: ${loc}`);
    assert.match(html, /<h1[\s>]/, `sitemap URL has no H1: ${loc}`);
  }
});

test('company Instagram social network (@Qazvintasvir.co) is published in UI and structured data', () => {
  const instagramUrl = 'https://www.instagram.com/qazvintasvir.co/';
  for (const lang of ['fa', 'en']) {
    const home = read(route(lang));
    const contact = read(route(lang, 'contact'));

    assert.match(home, /class="footer-social"/, `missing footer social section on ${lang} homepage`);
    assert.match(home, /class="mobile-drawer__social"/, `missing mobile drawer social section on ${lang} homepage`);
    assert.ok(home.includes(`href="${instagramUrl}"`), `missing Instagram URL on ${lang} homepage`);
    assert.ok(contact.includes(`href="${instagramUrl}"`), `missing Instagram URL on ${lang} contact page`);
    assert.match(contact, /class="[^"]*\bbtn--instagram\b[^"]*"/, `missing Instagram button on ${lang} contact page`);
    assert.match(contact, lang === 'fa' ? /شبکه‌های اجتماعی/ : /Social media/, `missing localized social heading on ${lang} contact page`);

    for (const [label, html] of [[`${lang}/home`, home], [`${lang}/contact`, contact]]) {
      const igLinks = [...html.matchAll(/<a\b([^>]*href="https:\/\/www\.instagram\.com\/qazvintasvir\.co\/"[^>]*)>([\s\S]*?)<\/a>/g)];
      assert.ok(igLinks.length >= 3, `expected Instagram links in footer, contact list and drawer on ${label}`);
      for (const [, attrs, inner] of igLinks) {
        assert.match(attrs, /\btarget="_blank"/, `Instagram link must open in a new tab on ${label}`);
        assert.match(attrs, /\brel="noopener noreferrer"/, `Instagram link must include rel="noopener noreferrer" on ${label}`);
        const linkIsLtr = /\bdir="ltr"/.test(attrs) && /\bclass="[^"]*\bbidi-ltr\b/.test(attrs);
        const handleIsIsolated = /<bdi\b[^>]*class="[^"]*\bbidi-ltr\b[^"]*"[^>]*dir="ltr"[^>]*>@Qazvintasvir\.co<\/bdi>/.test(inner);
        assert.ok(linkIsLtr || handleIsIsolated, `Instagram handle @Qazvintasvir.co must be LTR-isolated on ${label}`);
      }

      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
      const organization = schemas.find((item) => Array.isArray(item['@type']) && item['@type'].includes('Organization'));
      assert.ok(organization?.sameAs?.includes(instagramUrl), `Organization sameAs should include Instagram URL on ${label}`);
    }
  }
});
