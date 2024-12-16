'use server';

import { eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { type Answer } from '@/types/main';

export const updateAnswer = async (updated: Answer) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const answer = await db.query.answers.findFirst({
    where: eq(schema.answers.id, updated.id),
  });

  if (!answer) {
    return { error: 'Answer not found' };
  }

  await db
    .update(schema.answers)
    .set(updated)
    .where(eq(schema.answers.id, updated.id))
    .returning();
};
