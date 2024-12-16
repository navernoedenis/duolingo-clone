'use server';

import { cache } from 'react';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '@/db';

import { getUserProgress } from '.';

export const getLessonProgress = cache(async (lessonId: number) => {
  const userProgress = await getUserProgress();
  if (!userProgress) return null;

  const lessonProgress = await db.query.lessonProgress.findFirst({
    where: and(
      eq(schema.lessonProgress.userId, userProgress.userId),
      eq(schema.lessonProgress.lessonId, lessonId)
    ),
  });

  return lessonProgress ?? null;
});
