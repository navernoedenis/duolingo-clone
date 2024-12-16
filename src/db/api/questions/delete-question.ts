'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { isAdminRole } from '@/features/admin';
import { getAuth } from '@/db/api';

export const deleteQuestion = async (questionId: number) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const question = await db.query.questions.findFirst({
    where: eq(schema.questions.id, questionId),
  });
  if (!question) return { error: 'Question is not exists' };

  await db.delete(schema.questions).where(eq(schema.questions.id, question.id));

  revalidatePath(
    '/admin/[language]/units/[unit_id]/lesson/[lesson_id]/questions'
  );
};
