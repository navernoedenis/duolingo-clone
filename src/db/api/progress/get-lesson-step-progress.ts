'use server';

import { cache } from 'react';
import { asc, desc, and, eq } from 'drizzle-orm';
import { db, schema } from '@/db';
import { getUserProgress } from '.';
import { type QuestionProgress } from '@/types/main';

export const getLessonStepProgress = cache(async (lessonId: number) => {
  const userProgress = await getUserProgress();
  if (!userProgress) return null;

  const [questions, questionsProgress] = await Promise.all([
    db.query.questions.findMany({
      where: eq(schema.questions.lessonId, lessonId),
      orderBy: asc(schema.questions.order),
    }),
    db.query.questionProgress.findMany({
      where: and(
        eq(schema.questionProgress.lessonId, lessonId),
        eq(schema.questionProgress.userId, userProgress.userId)
      ),
      orderBy: desc(schema.questionProgress.complete),
    }),
  ]);

  const sortedQuestionProgress: QuestionProgress[] = [];

  questions.forEach((question) => {
    const progress = questionsProgress.find(
      (progress) => question.id === progress.questionId
    );
    if (progress) {
      sortedQuestionProgress.push(progress);
    }
  });

  const questionStepIndex = sortedQuestionProgress.findIndex(
    (item) => item.complete === false
  );

  return {
    lessonId,
    step: questionStepIndex === -1 ? 0 : questionStepIndex,
    stepsCount: questions.length,
  };
});

export const getLastLessonStepProgress = cache(async () => {
  const userProgress = await getUserProgress();
  if (!userProgress) return null;

  const lessonsProgress = await db.query.lessonProgress.findFirst({
    where: and(
      eq(schema.lessonProgress.available, true),
      eq(schema.lessonProgress.complete, false),
      eq(schema.lessonProgress.userId, userProgress.userId)
    ),
  });

  return lessonsProgress
    ? getLessonStepProgress(lessonsProgress.lessonId)
    : null;
});
