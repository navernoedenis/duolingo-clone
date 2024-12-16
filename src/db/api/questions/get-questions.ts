'use server';

import { cache } from 'react';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export const getQuestionById = cache(async (questionId: number) => {
  const question = await db.query.questions.findFirst({
    where: eq(schema.questions.id, questionId),
  });
  return question;
});

export const getQuestions = cache(async (lessonId: number) => {
  const questions = await db.query.questions.findMany({
    where: eq(schema.questions.lessonId, lessonId),
    orderBy: [asc(schema.questions.language), asc(schema.questions.order)],
  });
  return questions;
});

export const getQuestionsWithAnswers = cache(async (lessonId: number) => {
  const questions = await db.query.questions.findMany({
    where: eq(schema.questions.lessonId, lessonId),
    orderBy: asc(schema.questions.order),
    with: {
      answers: true,
    },
  });
  return questions;
});
