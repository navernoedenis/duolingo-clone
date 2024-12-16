'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { and, eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { getUserProgress, getQuestionProgress } from './';
import { pointsForCorrectAnswer, routes } from '@/constants';

export const updateQuestionProgress = cache(
  async (questionId: number, isCorrectAnswer: boolean) => {
    const [userProgress, questionProgress] = await Promise.all([
      getUserProgress(),
      getQuestionProgress(questionId),
    ]);

    if (!userProgress || !questionProgress || questionProgress.complete) {
      return null;
    }

    await db
      .update(schema.userProgress)
      .set({
        points: userProgress.points + pointsForCorrectAnswer,
        hearts: userProgress.hearts + (isCorrectAnswer ? 0 : -1),
      })
      .where(eq(schema.userProgress.userId, userProgress.userId));

    await db
      .update(schema.questionProgress)
      .set({ complete: true, isCorrectAnswer })
      .where(
        and(
          eq(schema.questionProgress.questionId, questionId),
          eq(schema.questionProgress.userId, userProgress.userId)
        )
      );

    revalidatePath(routes.learn);
    revalidatePath(routes.shop);
    revalidatePath(routes.units);
  }
);
