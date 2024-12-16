'use server';

import { cache } from 'react';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export const getAnswers = cache(async (questionId: number) => {
  const answers = await db.query.answers.findMany({
    where: eq(schema.answers.questionId, questionId),
    orderBy: asc(schema.answers.value),
  });
  return answers;
});
