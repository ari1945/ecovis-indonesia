export const LANGS = ['en', 'id'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** A bilingual string pair: [English, Bahasa Indonesia]. */
export type Bi = readonly [string, string];

/**
 * Mirrors the prototype's `pick(en, id)` helper so copy stays inline with the
 * markup it belongs to rather than living in a detached key/value dictionary.
 */
export function t<T>(lang: Lang, en: T, id: T): T {
  return lang === 'id' ? id : en;
}

/**
 * Reads a `[en, id]` pair. Prefer this over spreading into `t()` — mapping over
 * an `as const` content array widens each element to a *union* of tuple types,
 * which TypeScript refuses to spread.
 */
export function bi(lang: Lang, pair: Bi): string {
  return lang === 'id' ? pair[1] : pair[0];
}

/** Prefix an app-relative path with the active locale. */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean}`;
}

/** Swap the locale segment of a pathname, preserving the rest of the route. */
export function swapLocale(pathname: string, lang: Lang): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length && isLang(segments[0])) {
    segments[0] = lang;
    return `/${segments.join('/')}`;
  }
  return localePath(lang, pathname);
}

export const HTML_LANG: Record<Lang, string> = {
  en: 'en',
  id: 'id-ID',
};
