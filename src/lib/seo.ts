export function canonicalURL(url: URL): string {
  // Astro.url already includes site+base? We just return url.href normalized
  return url.href;
}

export function getHreflangUrls(pathname: string, site: string, base: string, availableLangs: string[] = ['fa','en']): Array<{lang: string, href: string}> {
  // pathname like /fa/services/import-export/ on the configured custom-domain base
  // Produce alternate links for each lang
  const baseClean = base.replace(/\/$/, '');
  const siteClean = site.replace(/\/$/, '');
  // Extract path without base and lang
  let withoutBase = pathname;
  if (baseClean && withoutBase.startsWith(baseClean)) withoutBase = withoutBase.slice(baseClean.length);
  if (!withoutBase.startsWith('/')) withoutBase = '/' + withoutBase;
  // withoutBase now /fa/services/... or /en/... or /
  const pathWithoutLang = withoutBase.replace(/^\/(fa|en)(\/|$)/, '/');
  return availableLangs.map(lang => ({
    lang,
    href: `${siteClean}${baseClean}/${lang}${pathWithoutLang === '/' ? '/' : pathWithoutLang}`
  }));
}
