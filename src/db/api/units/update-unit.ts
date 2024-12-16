'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';

import { isAdminRole } from '@/features/admin';
import { routes } from '@/constants';
import { type Unit } from '@/types/main';

export const updateUnit = async (updated: Unit) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const unit = await db.query.units.findFirst({
    where: eq(schema.units.id, updated.id),
  });

  if (!unit) return { error: 'Unit not found' };

  await db
    .update(schema.units)
    .set({
      order: updated.order,
      courseId: updated.courseId,
      title: updated.title,
      description: updated.description,
    })
    .where(eq(schema.units.id, updated.id))
    .returning();

  revalidatePath(`/${routes.admin}/[language]/units`);
};
