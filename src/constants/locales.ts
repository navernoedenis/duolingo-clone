export const locales = ['en', 'ua'] as const;

export const isValidLocale = (locale: string = '') => {
  return locales.includes(locale as any);
};
