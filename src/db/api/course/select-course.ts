'use server';

import { redirect } from 'next/navigation';
import { and, eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { getAuth } from '@/db/api';
import { routes } from '@/constants';

export const selectCourse = async (language: string) => {
  const user = await getAuth();
  if (!user) {
    return { error: 'Unathorized' };
  }

  const userProgress = await db.query.userProgress.findFirst({
    where: eq(schema.userProgress.userId, user.id),
    with: {
      course: true,
    },
  });

  if (userProgress?.course.language === language) {
    return redirect(routes.learn);
  }

  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.language, language),
  });
  if (!course) {
    return {
      error: 'Course is not exists',
    };
  }

  const unit = await db.query.units.findFirst({
    where: and(eq(schema.units.courseId, course.id), eq(schema.units.order, 1)),
  });
  if (!unit) {
    return {
      error: 'Course has not units yet. Try a bit later',
    };
  }

  const lesson = await db.query.lessons.findFirst({
    where: and(eq(schema.lessons.unitId, unit.id), eq(schema.lessons.order, 1)),
  });
  if (!lesson) {
    return {
      error: 'Course has no lessons yet. Try a bit later',
    };
  }

  await Promise.all([
    db
      .delete(schema.userProgress)
      .where(eq(schema.userProgress.userId, user.id)),

    db
      .delete(schema.lessonProgress)
      .where(eq(schema.lessonProgress.userId, user.id)),

    db
      .delete(schema.questionProgress)
      .where(eq(schema.questionProgress.userId, user.id)),
  ]);

  await Promise.all([
    db.insert(schema.userProgress).values({
      courseId: course.id,
      userId: user.id,
    }),

    db.insert(schema.lessonProgress).values({
      available: true,
      lessonId: lesson.id,
      userId: user.id,
    }),
  ]);

  redirect(routes.learn);
};
