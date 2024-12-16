'use server';

import { cache } from 'react';
import { asc, eq } from 'drizzle-orm';
import { db, schema } from '@/db';

import { getCourseByLanguage } from '../course';

export const getUnitById = cache(async (unitId: number) => {
  const unit = await db.query.units.findFirst({
    where: eq(schema.units.id, unitId),
  });
  return unit;
});

export const getUnitsByLanguage = cache(async (language: string) => {
  const course = await getCourseByLanguage(language);
  if (!course) return [];

  const units = await db.query.units.findMany({
    where: eq(schema.units.courseId, course.id),
    orderBy: asc(schema.units.order),
  });
  return units;
});
