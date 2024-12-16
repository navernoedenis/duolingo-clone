'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { updateHeartsByPoints } from '@/db/api';
import { useAction } from '@/hooks';
import { pointsForHearts } from '@/constants';

import { Button } from '@/components/ui/button';
import { CardItem } from '@/components/layouts';

export const RefillHearts = ({ disabled }: { disabled?: boolean }) => {
  const t = useTranslations('pages.shop.cards');

  const updateAction = useAction({
    action: updateHeartsByPoints,
  });

  return (
    <CardItem
      text={t('refill_hearts')}
      left={
        <Image src='/icons/heart.svg' height={48} width={48} alt='heart icon' />
      }
      right={
        <Button
          className='flex p-2 pr-4'
          disabled={updateAction.pending || disabled}
          onClick={updateAction.run}
          variant='outline'
        >
          <Image
            src='/icons/flame.svg'
            height={20}
            width={20}
            alt='flame icon'
          />
          <span>{pointsForHearts}</span>
        </Button>
      }
    />
  );
};
