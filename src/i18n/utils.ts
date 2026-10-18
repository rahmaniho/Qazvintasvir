import fa from './fa';
import en from './en';

export type Lang = 'fa' | 'en';
export const defaultLang: Lang = 'fa';
export const languages: Lang[] = ['fa', 'en'];

export const ui = { fa, en };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  // url.pathname includes base? Astro.url.pathname includes base prefix.
  // Check both segments for lang
  const parts = url.pathname.split('/').filter(Boolean);
  // e.g. /Qazvintasvir/fa/... => parts = ['Qazvintasvir','fa',...]
  // or /fa/... when base not in pathname? Astro includes base in url.
  for (const p of parts) {
    if (p === 'fa' || p === 'en') return p as Lang;
  }
  return defaultLang;
}

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let val: any = ui[lang];
  for (const k of keys) {
    if (val && typeof val === 'object' && k in val) val = val[k];
    else return key;
  }
  return typeof val === 'string' ? val : key;
}

export function localizePath(path: string, lang: Lang): string {
  // path like /services/import-export/ or /about/
  // ensure leading slash
  if (!path.startsWith('/')) path = '/' + path;
  // remove existing lang prefix
  const clean = path.replace(/^\/(fa|en)(\/|$)/, '/');
  return `/${lang}${clean === '/' ? '/' : clean}`;
}

export function getLocalizedUrl(url: URL, targetLang: Lang): string {
  const pathname = url.pathname;
  // base handling: /Qazvintasvir/fa/xxx => replace
  return pathname.replace(/\/(fa|en)(\/|$)/, `/${targetLang}$2`);
}

export function useTranslations(lang: Lang) {
  return function (key: string) { return t(lang, key); };
}
