import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { getUserProgress } from '@/db/api';
import { Sidebar } from '@/components/widgets/sidebar';
import { routes } from '@/constants';

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const userProgress = await getUserProgress();
  if (!userProgress) {
    redirect(routes.courses);
  }

  return (
    <div className='min-h-screen flex gap-2'>
      <Sidebar />
      {children}
    </div>
  );
}
