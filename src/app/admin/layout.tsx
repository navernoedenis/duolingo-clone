import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';

export default async function PageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await getAuth();

  if (!auth || !isAdminRole(auth.role)) {
    redirect(routes.learn);
  }

  return (
    <div className='h-screen flex'>
      <main className='grow p-4'>{children}</main>
    </div>
  );
}
