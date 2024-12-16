import Link from 'next/link';
import { type ReactNode } from 'react';
import { routes } from '@/constants';

export const AdminHeader = ({
  children,
  title,
}: {
  children?: ReactNode;
  title: string | string[];
}) => {
  const heading = Array.isArray(title) ? title.join(' - ') : title;

  return (
    <header className='mb-2 flex items-center justify-between gap-4'>
      <h1 className='text-xl font-bold font-duo uppercase'>
        <Link className='text-green-feather' href={routes.admin}>
          Admin panel
        </Link>
        {' - '}
        <span>{heading}</span>
      </h1>

      {children && <div className='flex items-center gap-2'>{children}</div>}
    </header>
  );
};
