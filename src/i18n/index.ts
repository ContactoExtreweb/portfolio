import es from './es';
import en from './en';

export const defaultLang = 'es';

const translations = { es, en };

export type Lang = keyof typeof translations;
export type TranslationKey = keyof typeof es;

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return translations[lang][key] ?? translations[defaultLang][key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first in translations) return first as Lang;
  return defaultLang;
}
