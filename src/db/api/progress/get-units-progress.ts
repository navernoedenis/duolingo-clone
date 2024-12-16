'use server';

import { cache } from 'react';
import { eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { getUserProgress } from './get-user-progress';

export const getUnitsProgress = cache(async () => {
  const userProgress = await getUserProgress();
  if (!userProgress) return [];

  const units = await db.query.units.findMany({
    where: eq(schema.units.courseId, userProgress.course.id),
    with: {
      lessons: true,
    },
  });

  const lessonsProgress = await db.query.lessonProgress.findMany({
    where: eq(schema.lessonProgress.userId, userProgress.userId),
  });

  const lessonsProgressRecord = lessonsProgress.reduce((acc, item) => {
    acc[item.lessonId] = {
      available: item.available,
      complete: item.complete,
    };
    return acc;
  }, {} as Record<number, Record<'available' | 'complete', boolean>>);

  return units.map((unit) => ({
    ...unit,
    lessons: unit.lessons.map((lesson) => {
      const lessonProgress = lessonsProgressRecord[lesson.id];

      return {
        ...lesson,
        available: lessonProgress ? lessonProgress.available : false,
        complete: lessonProgress ? lessonProgress.complete : false,
      };
    }),
  }));
});
