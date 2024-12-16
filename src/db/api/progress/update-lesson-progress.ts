'use server';

import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { asc, and, eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { routes } from '@/constants';
import { getCourseById, getLessonsByUnitId, getUserProgress } from '..';

export const updateLessonProgress = cache(
  async (unitId: number, lessonId: number) => {
    const userProgress = await getUserProgress();
    if (!userProgress) return null;

    const lessonProgress = await db.query.lessonProgress.findFirst({
      where: and(
        eq(schema.lessonProgress.userId, userProgress.userId),
        eq(schema.lessonProgress.lessonId, lessonId)
      ),
    });

    if (!lessonProgress || lessonProgress.complete) return null;

    const questionsProgress = await db.query.questionProgress.findMany({
      where: and(
        eq(schema.questionProgress.lessonId, lessonId),
        eq(schema.questionProgress.userId, userProgress.userId)
      ),
    });

    const isLessonCompleted = questionsProgress.every((item) => item.complete);
    if (!isLessonCompleted) return null;

    await db
      .update(schema.lessonProgress)
      .set({ complete: true })
      .where(
        and(
          eq(schema.lessonProgress.userId, userProgress.userId),
          eq(schema.lessonProgress.lessonId, lessonId)
        )
      );

    // Unlock next lesson
    const [course, lessons] = await Promise.all([
      getCourseById(userProgress.courseId),
      getLessonsByUnitId(unitId),
    ]);

    const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
    if (!course || lessonIndex === -1) return null;

    const nextLesson = lessons[lessonIndex + 1];
    if (nextLesson) {
      await db.insert(schema.lessonProgress).values({
        available: true,
        lessonId: nextLesson.id,
        userId: userProgress.userId,
      });

      revalidatePath(routes.learn);
      return;
    }

    // Unlock next unit
    const units = await db.query.units.findMany({
      where: eq(schema.units.courseId, course.id),
      orderBy: asc(schema.units.order),
      with: {
        lessons: true,
      },
    });

    const unitIndex = units.findIndex((unit) => unit.id === unitId);
    if (unitIndex === -1) return null;

    const nextUnit = units[unitIndex + 1];
    const nextLessonId = nextUnit.lessons[0].id ?? null;
    if (!nextUnit || !nextLessonId) return null;

    await db.insert(schema.lessonProgress).values({
      userId: userProgress.userId,
      lessonId: nextLessonId,
      available: true,
    });

    revalidatePath(routes.learn);
  }
);
