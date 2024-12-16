'use client';

import { IoMdFlash } from 'react-icons/io';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { CardItem } from '@/components/layouts';

export const UnlimitedHearts = ({ disabled }: { disabled?: boolean }) => {
  const t = useTranslations('pages.shop.cards');

  return (
    <CardItem
      text={t('unlimited_hearts')}
      left={<IoMdFlash className='text-bee' size={48} />}
      right={
        <Button className='uppercase' disabled={disabled} variant='outline'>
          {t('upgrade')}
        </Button>
      }
    />
  );
};
