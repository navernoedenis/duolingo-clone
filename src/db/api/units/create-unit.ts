'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';

import { routes } from '@/constants';
import { type CreateUnit } from '@/types/main';

export const createUnit = async (data: CreateUnit) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.id, data.courseId),
  });

  if (!course) {
    return {
      error: `Course not founded`,
    };
  }

  const unit = await db.query.units.findFirst({
    where: and(
      eq(schema.units.courseId, data.courseId),
      eq(schema.units.order, data.order)
    ),
  });

  if (unit) {
    return { error: 'Unit with this order is already exists' };
  }

  await db.insert(schema.units).values({
    courseId: data.courseId,
    order: data.order,
    title: data.title,
    description: data.description,
  });

  revalidatePath(`${routes.admin}/[language]/units`);
  revalidatePath(routes.learn);
};
