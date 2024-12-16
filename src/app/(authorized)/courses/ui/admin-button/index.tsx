'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { routes } from '@/constants';

export const AdminButton = () => {
  const t = useTranslations('common');

  return (
    <div className='fixed top-4 right-4'>
      <Link href={routes.admin}>
        <Button className='capitalize'>{t('admin')}</Button>
      </Link>
    </div>
  );
};
