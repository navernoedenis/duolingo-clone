'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';

import { type CreateLesson } from '@/types/main';

export const createLesson = async (data: CreateLesson) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const lesson = await db.query.lessons.findFirst({
    where: and(
      eq(schema.lessons.unitId, data.unitId),
      eq(schema.lessons.order, data.order)
    ),
  });

  if (lesson) {
    return { error: `Lesson order: "${data.order}" is already taken` };
  }

  await db.insert(schema.lessons).values({
    order: data.order,
    unitId: data.unitId,
  });

  revalidatePath(`${routes.admin}/[language]/units/[unit_id]/lesson`);
};
