import { redirect } from 'next/navigation';

import { getUserProgress } from '@/db/api';
import { GridCard } from '@/components/layouts';
import { UserProgress } from '@/components/ui';

import { ShopHero } from './ui/shop-hero';
import { RefillHearts } from './ui/refill-hearts';
import { UnlimitedHearts } from './ui/unlimited-hearts';

import { pointsForHearts, routes } from '@/constants';

export default async function ShopPage() {
  const userProgress = await getUserProgress();

  if (!userProgress) {
    redirect(routes.courses);
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
      <ShopHero />
      <UnlimitedHearts disabled />
      <RefillHearts disabled={!canRefillHearts} />
    </GridCard>
  );
}
