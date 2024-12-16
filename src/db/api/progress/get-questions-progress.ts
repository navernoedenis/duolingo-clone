'use server';

import { cache } from 'react';
import { and, eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { getUserProgress } from './get-user-progress';
import { getQuestions } from '../questions';

export const getQuestionsProgress = cache(async (lessonId: number) => {
  const [questions, userProgress] = await Promise.all([
    getQuestions(lessonId),
    getUserProgress(),
  ]);

  if (!userProgress || !questions.length) return [];

  const questionsProgress = await Promise.all(
    questions.map((question) => getQuestionProgress(question.id))
  );

  return questionsProgress.filter((questionProgress) => !!questionProgress);
});

export const getQuestionProgress = cache(async (questionId: number) => {
  const userProgress = await getUserProgress();
  if (!userProgress) return null;

  const question = await db.query.questions.findFirst({
    where: eq(schema.questions.id, questionId),
  });

  if (!question) return null;

  let questionProgress = await db.query.questionProgress.findFirst({
    where: and(
      eq(schema.questionProgress.questionId, questionId),
      eq(schema.questionProgress.userId, userProgress.userId)
    ),
  });

  if (!questionProgress) {
    const [newQuestionProgress] = await db
      .insert(schema.questionProgress)
      .values({
        lessonId: question.lessonId,
        questionId: question.id,
        userId: userProgress.userId,
      })
      .returning();

    questionProgress = newQuestionProgress;
  }

  return questionProgress;
});
