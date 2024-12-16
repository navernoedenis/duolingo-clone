import { redirect } from 'next/navigation';

import { getUserProgress, getLeaderboard } from '@/db/api';
import { GridCard } from '@/components/layouts';
import { PageHero, UserProgress } from '@/components/ui';
import { routes } from '@/constants';

import { LeaderboardList } from './ui/leaderboard-list';

export default async function LeaderboardsPage() {
  const [userProgress, leaderboard] = await Promise.all([
    getUserProgress(),
    getLeaderboard(),
  ]);

  if (!userProgress) {
    return redirect(routes.courses);
  }

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
        icon='/icons/shield.svg'
        subtitle='See where you stand among other learners in the community.'
        title='Leaderboard'
      />
      <LeaderboardList data={leaderboard} />
    </GridCard>
  );
}
