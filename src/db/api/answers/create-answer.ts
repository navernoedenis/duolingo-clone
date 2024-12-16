'use server';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';

import { type CreateaAnswer } from '@/types/main';

export const createAnswer = async (data: CreateaAnswer) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  await db.insert(schema.answers).values({
    audio: data.audio,
    image: data.image,
    questionId: data.questionId,
    value: data.value,
  });
};
