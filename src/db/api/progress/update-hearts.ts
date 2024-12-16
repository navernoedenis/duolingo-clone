'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { hearstToRefill, pointsForHearts } from '@/constants';
import { getUserProgress } from './get-user-progress';
import { routes } from '@/constants';

export const updateHeartsByPoints = cache(async () => {
  const userProgress = await getUserProgress();
  if (!userProgress) return { error: 'Unauthorized' };

  if (userProgress.points < pointsForHearts) {
    return {
      error: 'Not enough points to refill hearts',
    };
  }

  await db
    .update(schema.userProgress)
    .set({
      hearts: userProgress.hearts + hearstToRefill,
      points: userProgress.points - pointsForHearts,
    })
    .where(eq(schema.userProgress.userId, userProgress.userId));

  revalidatePath(routes.learn);
  revalidatePath(routes.shop);
  revalidatePath(routes.units);
});
