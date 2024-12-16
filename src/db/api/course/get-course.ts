'use server';

import { cache } from 'react';
import { asc, eq, ne } from 'drizzle-orm';
import { db, schema } from '@/db';
import { getAuth } from '@/db/api';

export const getCourses = cache(async () => {
  const auth = await getAuth();

  const courses = await db.query.courses.findMany({
    where: auth ? ne(schema.courses.language, auth.locale) : undefined,
    orderBy: asc(schema.courses.id),
  });
  return courses;
});

export const getCourseById = cache(async (id: number) => {
  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.id, id),
  });
  return course ?? null;
});

export const getCourseByLanguage = cache(async (language: string) => {
  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.language, language),
  });
  return course ?? null;
});
