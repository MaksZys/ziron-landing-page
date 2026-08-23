import { configureLocalization } from '@lit/localize';

import { sourceLocale, targetLocales } from './generated/locales/locale-codes';

export const LOCALES = ['en', 'pl', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

const { setLocale: loadLocale } = configureLocalization({
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

function localeFromBrowser(): Locale {
  for (const language of navigator.languages) {
    const locale = language.split('-')[0].toLowerCase();

    if (LOCALES.some((supportedLocale) => supportedLocale === locale)) {
      return locale as Locale;
    }
  }

  return 'en';
}

export function localeFromUrl(): Locale {
  const locale = new URL(window.location.href).searchParams.get('lang');

  if (locale === null) {
    return localeFromBrowser();
  }

  return LOCALES.find((supportedLocale) => supportedLocale === locale) ?? 'en';
}

export function canonicalizeLocaleInUrl() {
  const locale = localeFromUrl();
  const url = new URL(window.location.href);

  if (url.searchParams.get('lang') !== locale) {
    url.searchParams.set('lang', locale);
    window.history.replaceState(null, '', `${url.search}${url.hash}`);
  }

  return locale;
}

export async function applyLocaleFromUrl() {
  await loadLocale(localeFromUrl());
}

export function localizedUrl(locale: Locale) {
  const url = new URL(window.location.href);
  url.searchParams.set('lang', locale);

  return `${url.search}${url.hash}`;
}

export function localizedViewUrl(view: 'project' | 'about' | 'contact' | 'privacy') {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('view', view);
  url.searchParams.set('lang', localeFromUrl());
  url.hash = '';

  return url.search;
}

export function localizedHomeUrl() {
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set('lang', localeFromUrl());
  url.hash = '';

  return url.search;
}
