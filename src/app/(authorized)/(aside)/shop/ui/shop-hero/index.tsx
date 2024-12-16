'use client';

import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/ui';

export const ShopHero = () => {
  const t = useTranslations('pages.shop');

  return (
    <PageHero
      icon='/icons/shop.svg'
      subtitle={t('subtitle')}
      title={t('title')}
    />
  );
};
