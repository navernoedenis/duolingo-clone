'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';
import { type Question } from '@/types/main';

export const updateQuestion = async (updated: Question) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const { id: questionId, lessonId, order, ...otherProps } = updated;

  const [question, questionByOrder] = await Promise.all([
    db.query.questions.findFirst({
      where: eq(schema.questions.id, questionId),
    }),
    db.query.questions.findFirst({
      where: and(
        eq(schema.questions.lessonId, lessonId),
        eq(schema.questions.order, order)
      ),
    }),
  ]);

  if (!question) return { error: 'Course not found' };
  if (questionByOrder?.id !== question.id) {
    return { error: 'This order is alredy taken' };
  }

  await db
    .update(schema.questions)
    .set(otherProps)
    .where(eq(schema.questions.id, questionId))
    .returning();

  revalidatePath(
    `${routes.admin}/[language]/units/[unit_id]/lesson/[lesson_id]/questions`
  );
};
