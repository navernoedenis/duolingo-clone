'use server';

import { cache } from 'react';
import { and, asc, eq } from 'drizzle-orm';
import { db, schema } from '@/db';

export const getLessonById = cache(async (id: number) => {
  const lesson = await db.query.lessons.findFirst({
    where: eq(schema.lessons.id, id),
  });
  return lesson;
});

export const getLessonsByUnitId = cache(async (unitId: number) => {
  const lessons = await db.query.lessons.findMany({
    where: eq(schema.lessons.unitId, unitId),
    orderBy: asc(schema.lessons.order),
  });
  return lessons;
});

export const getLessonByUnitAndLessonId = cache(
  async (unitId: number, lessonId: number) => {
    const lesson = await db.query.lessons.findFirst({
      where: and(
        eq(schema.lessons.unitId, unitId),
        eq(schema.lessons.id, lessonId)
      ),
      orderBy: asc(schema.lessons.order),
    });
    return lesson;
  }
);
