import { configureLocalization } from '@lit/localize';

import { sourceLocale, targetLocales } from './generated/locales/locale-codes';

export const LOCALES = ['en', 'pl', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

const { getLocale, setLocale: loadLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale) => {
    switch (locale) {
      case 'pl':
        return import('./generated/locales/pl');
      case 'de':
        return import('./generated/locales/de');
      default:
        throw new Error(`Unsupported locale: ${locale}`);
    }
  },
});

export { getLocale };

export function localeFromUrl() {
  const locale = new URL(window.location.href).searchParams.get('lang');

  return LOCALES.find((supportedLocale) => supportedLocale === locale) ?? 'en';
}

export async function setLocale(locale: Locale) {
  await loadLocale(locale);
}

export function localizedUrl(locale: Locale) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', locale);

  return `${url.search}${url.hash}`;
}

export function localizedViewUrl(view: 'project' | 'about') {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('view', view);
  url.searchParams.set('lang', getLocale() as Locale);
  url.hash = '';

  return url.search;
}

export function localizedHomeUrl() {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('lang', getLocale() as Locale);
  url.hash = '';

  return url.search;
}
