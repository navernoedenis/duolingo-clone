import { redirect } from 'next/navigation';

import { getUserProgress, getLeaderboard } from '@/db/api';
import { GridCard } from '@/components/layouts';
import { UserProgress } from '@/components/ui';
import { routes } from '@/constants';

import { LeaderboardList } from './ui/leaderboard-list';
import { LeaderboardHero } from './ui/leaderboard-hero';

export default async function LeaderboardsPage() {
  const [userProgress, leaderboard] = await Promise.all([
    getUserProgress(),
    getLeaderboard(),
  ]);

  if (!userProgress) {
    redirect(routes.courses);
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
      <LeaderboardHero />
      <LeaderboardList data={leaderboard} />
    </GridCard>
  );
}
