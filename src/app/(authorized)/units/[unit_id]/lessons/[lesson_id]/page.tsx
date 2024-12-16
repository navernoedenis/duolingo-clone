import { redirect } from 'next/navigation';

import {
  getLessonByUnitAndLessonId,
  getLessonProgress,
  getQuestionsProgress,
  getLessonStepProgress,
  getQuestionsWithAnswers,
  getUnitById,
  getUserProgress,
} from '@/db/api';

import { Quiz } from '@/features/quiz';
import { routes } from '@/constants';

import { NoQuestionsScreen } from './screens';

export default async function LessonPage({
  params,
}: {
  params: Promise<{
    lesson_id: string;
    unit_id: string;
  }>;
}) {
  const { lesson_id, unit_id } = await params;

  const [
    lesson,
    lessonProgress,
    lessonStepProgress,
    questionsProgress,
    questionsWithAnswers,
    unit,
    userProgress,
  ] = await Promise.all([
    getLessonByUnitAndLessonId(+unit_id, +lesson_id),
    getLessonProgress(+lesson_id),
    getLessonStepProgress(+lesson_id),
    getQuestionsProgress(+lesson_id),
    getQuestionsWithAnswers(+lesson_id),
    getUnitById(+unit_id),
    getUserProgress(),
  ]);

  if (!userProgress || !lessonStepProgress) {
    redirect(routes.courses);
  }

  if (!lesson || !lessonProgress || !unit) {
    redirect(routes.learn);
  }

  if (!questionsWithAnswers.length) {
    return <NoQuestionsScreen />;
  }

  return (
    <Quiz
      hearts={userProgress.hearts}
      lessonProgress={lessonProgress}
      lessonStep={lessonStepProgress.step}
      questions={questionsWithAnswers}
      questionsProgress={questionsProgress}
      unitId={unit.id}
    />
  );
}
