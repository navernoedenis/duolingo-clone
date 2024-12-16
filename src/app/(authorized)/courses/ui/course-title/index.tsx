'use client';

import { useTranslations } from 'next-intl';

export const CourseTitle = ({ oneOrMore }: { oneOrMore: boolean }) => {
  const t = useTranslations('pages.learn');

  return oneOrMore ? (
    <h1 className='text-3xl font-bold text-center'>
      I want to learn... {t('title')}
    </h1>
  ) : (
    <h1 className='text-3xl font-bold text-center'>
      Sorry, we have no courses yet. <br /> Try a bit later {t('title')}
    </h1>
  );
};
