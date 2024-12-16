'use client';

import { useTranslations } from 'next-intl';

export const NoLessons = () => {
  const t = useTranslations('pages.learn');
  return <p className='text-center my-3'>{t('no_lessons')}.</p>;
};
