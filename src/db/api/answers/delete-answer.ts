'use server';

import { eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { isAdminRole } from '@/features/admin';
import { getAuth } from '@/db/api';

export const deleteAnswer = async (answerId: number) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const answer = await db.query.answers.findFirst({
    where: eq(schema.answers.id, answerId),
  });

  if (!answer) {
    return { error: 'Answer is not exists' };
  }

  await db.delete(schema.answers).where(eq(schema.answers.id, answer.id));
};
