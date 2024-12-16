'use client';

import { useTranslations } from 'next-intl';

export const CourseTitle = ({ oneOrMore }: { oneOrMore: boolean }) => {
  const t = useTranslations('pages.learn');

  return oneOrMore ? (
    <h1 className='text-3xl font-bold text-center'>{t('title')}</h1>
  ) : (
    <h1 className='text-3xl font-bold text-center'>
      {t('no_courses_1')}. <br /> {t('no_courses_2')}
    </h1>
  );
};
