'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db, schema } from '@/db';
import { isAdminRole } from '@/features/admin';
import { getAuth } from '@/db/api';
import { routes } from '@/constants';

export const deleteUnit = async (unitId: number) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  if (!isAdminRole(user.role)) {
    return { error: 'Have no permission' };
  }

  const unit = await db.query.units.findFirst({
    where: eq(schema.units.id, unitId),
  });
  if (!unit) return { error: 'Unit is not exists' };

  await db.delete(schema.units).where(eq(schema.units.id, unit.id));

  revalidatePath(`${routes.admin}/[language]/units`);
  revalidatePath(routes.learn);
};
