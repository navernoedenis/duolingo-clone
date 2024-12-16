'use client';

import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/ui';

export const LeaderboardHero = () => {
  const t = useTranslations('pages.leaderboard');

  return (
    <PageHero
      icon='/icons/shield.svg'
      subtitle={t('subtitle')}
      title={t('title')}
    />
  );
};
