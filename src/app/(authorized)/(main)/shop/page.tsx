import { redirect } from 'next/navigation';

import { getUserProgress } from '@/db/api';
import { GridCard } from '@/components/layouts';
import { PageHero, UserProgress } from '@/components/ui';

import { RefillHearts } from './ui/refill-hearts';
import { UnlimitedHearts } from './ui/unlimited-hearts';

import { pointsForHearts, routes } from '@/constants';

export default async function ShopPage() {
  const userProgress = await getUserProgress();
  if (!userProgress) {
    return redirect(routes.courses);
  }

  const canRefillHearts = userProgress.points >= pointsForHearts;

  return (
    <GridCard
      aside={
        <UserProgress
          hearts={userProgress.hearts}
          languageImage={userProgress.course.icon}
          points={userProgress.points}
        />
      }
    >
      <PageHero
        icon='/icons/shop.svg'
        subtitle='Spend your points on cool stuff.'
        title='Shop'
      />
      <UnlimitedHearts disabled />
      <RefillHearts disabled={!canRefillHearts} />
    </GridCard>
  );
}
