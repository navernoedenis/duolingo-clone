'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';

export const deleteCourse = async (language: string) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.language, language),
  });
  if (!course) return { error: 'Course is not exists' };

  await db.delete(schema.courses).where(eq(schema.courses.id, course.id));

  revalidatePath(routes.admin);
  revalidatePath(routes.learn);
};
