import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { getAuth } from '@/db/api';
import { routes } from '@/constants';

export default async function AuthorizedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await getAuth();
  if (!auth) {
    redirect(routes.home);
  }

  const messages = await getMessages({
    locale: auth.locale,
  });

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
