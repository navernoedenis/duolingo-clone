import { getRequestConfig } from 'next-intl/server';
import { isValidLocale } from '@/constants';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!isValidLocale(locale)) {
    locale = 'en';
  }

  const messages = await import(`./messages/${locale}.json`);

  return {
    locale,
    messages: messages.default,
  };
});
