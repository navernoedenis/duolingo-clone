'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';
import { type Lesson } from '@/types/main';

export const updateLesson = async (updated: Lesson) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const [lesson, lessonByOrder] = await Promise.all([
    db.query.lessons.findFirst({
      where: eq(schema.lessons.id, updated.id),
    }),
    db.query.lessons.findFirst({
      where: and(
        eq(schema.lessons.unitId, updated.unitId),
        eq(schema.lessons.order, updated.order)
      ),
    }),
  ]);

  if (!lesson) return { error: 'Lesson not found' };
  if (lessonByOrder?.id === lesson.id) {
    return { error: 'This order is alredy taken' };
  }

  await db
    .update(schema.lessons)
    .set({ order: updated.order })
    .where(eq(schema.lessons.id, updated.id));

  revalidatePath(`/${routes.admin}/[language]/units/[unit_id]/lesson`);
};
