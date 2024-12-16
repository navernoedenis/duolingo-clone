'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { isAdminRole } from '@/features/admin';
import { getAuth } from '@/db/api';
import { routes } from '@/constants';

export const deleteLesson = async (lessonId: number) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const lesson = await db.query.lessons.findFirst({
    where: eq(schema.lessons.id, lessonId),
  });
  if (!lesson) return { error: 'Lesson is not exists' };

  await db.delete(schema.lessons).where(eq(schema.lessons.id, lesson.id));

  revalidatePath(`/${routes.admin}/[language]/units/[unit_id]/lesson`);
};
