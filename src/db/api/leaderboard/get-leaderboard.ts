'use server';

import { cache } from 'react';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/db';

export const getLeaderboard = cache(async () => {
  const leaderboard = await db.query.userProgress.findMany({
    orderBy: desc(schema.userProgress.points),
    limit: 10,
    with: {
      user: true,
    },
  });

  return leaderboard.map((leaderboard) => ({
    userId: leaderboard.userId,
    points: leaderboard.points,
    name: leaderboard.user.name,
    image: leaderboard.user.image,
  }));
});
