'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';

import { type Course } from '@/types/main';

export const updateCourse = async (updated: Course) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.id, updated.id),
  });

  if (!course) return { error: 'Course not found' };

  await db
    .update(schema.courses)
    .set({
      icon: updated.icon,
      language: updated.language,
    })
    .where(eq(schema.courses.id, updated.id))
    .returning();

  revalidatePath(routes.admin);
  revalidatePath(routes.learn);
};
