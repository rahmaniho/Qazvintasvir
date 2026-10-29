export type SiteLocale = 'fa' | 'en';

export interface AlternateLanguage {
  lang: string;
  href: string;
}

export interface SeoOptions {
  url: URL;
  site: string;
  base: string;
  lang: SiteLocale;
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  hreflang?: AlternateLanguage[];
}

export interface SeoMetadata {
  canonical: string;
  robots: string;
  image: string;
  imageAlt: string;
  hreflang: AlternateLanguage[];
  locale: string;
  alternateLocale: string;
  siteName: string;
}

/**
 * Central SEO metadata resolver used by the shared page layout.
 * Ensures canonical URLs are absolute and never inherit query/hash fragments,
 * while keeping language alternates and robots rules consistent site-wide.
 */
export function createSeoMetadata(options: SeoOptions): SeoMetadata {
  const site = normalizeOrigin(options.site);
  const base = normalizeBase(options.base);
  const fallbackCanonical = `${site}${base}${removeBase(options.url.pathname, base)}`;
  const canonical = absoluteUrl(options.canonical ?? fallbackCanonical, site);
  const canonicalUrl = new URL(canonical);
  canonicalUrl.search = '';
  canonicalUrl.hash = '';

  const pathWithoutBase = removeBase(options.url.pathname, base);
  const pathWithoutLocale = pathWithoutBase.replace(/^\/(?:fa|en)(?=\/|$)/, '') || '/';
  const localePath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
  const faUrl = `${site}${base}/fa${localePath === '/' ? '/' : localePath}`;
  const enUrl = `${site}${base}/en${localePath === '/' ? '/' : localePath}`;
  const hreflang = options.hreflang?.length
    ? options.hreflang
    : [
        { lang: 'fa', href: faUrl },
        { lang: 'en', href: enUrl },
        { lang: 'x-default', href: faUrl },
      ];

  return {
    canonical: canonicalUrl.href,
    robots: options.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    image: absoluteUrl(options.image ?? `${site}${base}/assets/images/og-image.jpg`, site),
    imageAlt: options.imageAlt ?? (options.lang === 'fa'
      ? 'قزوین تصویر — بازرگانی، ترابری و تأمین غذای سازمانی'
      : 'Qazvin Tasvir — trade, transport and corporate catering'),
    hreflang,
    locale: options.lang === 'fa' ? 'fa_IR' : 'en_US',
    alternateLocale: options.lang === 'fa' ? 'en_US' : 'fa_IR',
    siteName: options.lang === 'fa' ? 'قزوین تصویر' : 'Qazvin Tasvir',
  };
}

export function canonicalURL(url: URL): string {
  const canonical = new URL(url.href);
  canonical.search = '';
  canonical.hash = '';
  return canonical.href;
}

export function getHreflangUrls(
  pathname: string,
  site: string,
  base: string,
  availableLangs: string[] = ['fa', 'en'],
): AlternateLanguage[] {
  const siteClean = normalizeOrigin(site);
  const baseClean = normalizeBase(base);
  const withoutBase = removeBase(pathname, baseClean);
  const pathWithoutLang = withoutBase.replace(/^\/(?:fa|en)(?=\/|$)/, '') || '/';
  const suffix = pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`;
  const links = availableLangs.map((lang) => ({
    lang,
    href: `${siteClean}${baseClean}/${lang}${suffix === '/' ? '/' : suffix}`,
  }));
  if (availableLangs.includes('fa') && !links.some((link) => link.lang === 'x-default')) {
    links.push({ lang: 'x-default', href: `${siteClean}${baseClean}/fa${suffix === '/' ? '/' : suffix}` });
  }
  return links;
}

function normalizeOrigin(value: string): string {
  return value.replace(/\/$/, '');
}

function normalizeBase(value: string): string {
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

function removeBase(pathname: string, base: string): string {
  if (base && (pathname === base || pathname.startsWith(`${base}/`))) {
    return pathname.slice(base.length) || '/';
  }
  return pathname || '/';
}

function absoluteUrl(value: string, origin: string): string {
  return new URL(value, `${origin}/`).href;
}
