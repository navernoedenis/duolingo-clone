'use server';

import { and, eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';

import { type CreateQuestion } from '@/types/main';

export const createQuestion = async (data: CreateQuestion) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const question = await db.query.questions.findFirst({
    where: and(
      eq(schema.questions.lessonId, data.lessonId),
      eq(schema.questions.order, data.order)
    ),
  });
  if (question) return { error: 'This order is already taken' };

  await db.insert(schema.questions).values({
    answer: data.answer,
    audio: data.audio,
    character: data.character,
    hard: data.hard,
    language: data.language,
    lessonId: data.lessonId,
    order: data.order,
    sentence: data.sentence,
    title: data.title,
    type: data.type,
  });
};
