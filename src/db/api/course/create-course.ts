'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';
import { type CreateCourse } from '@/types/main';

export const createCourse = async (data: CreateCourse) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.language, data.language),
  });

  if (course) {
    return { error: `"${data.language}" course is already exists` };
  }

  await db.insert(schema.courses).values({
    language: data.language,
    icon: data.icon,
  });

  revalidatePath(routes.admin);
  revalidatePath(routes.learn);
};
