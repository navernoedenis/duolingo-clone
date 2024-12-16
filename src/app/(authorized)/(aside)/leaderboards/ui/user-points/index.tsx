'use client';

import { useTranslations } from 'next-intl';

export const UserPoints = ({ points }: { points: number }) => {
  const t = useTranslations('pages.leaderboard');

  return (
    <span className='font-semibold uppercase'>
      {points} {t('xp')}
    </span>
  );
};
