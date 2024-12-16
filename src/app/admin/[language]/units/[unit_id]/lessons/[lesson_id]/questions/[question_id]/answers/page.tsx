import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import {
  getAnswers,
  getCourseByLanguage,
  getLessonById,
  getQuestionById,
  getUnitById,
} from '@/db/api';

import { routes } from '@/constants';

const AnswersScreen = dynamic(() =>
  import('@/features/admin').then((m) => m.AnswersScreen)
);

export default async function AnswersPage({
  params,
}: {
  params: Promise<{
    language: string;
    lesson_id: string;
    question_id: string;
    unit_id: string;
  }>;
}) {
  const { language, lesson_id, question_id, unit_id } = await params;

  const [course, unit, lesson, question, answers] = await Promise.all([
    getCourseByLanguage(language),
    getUnitById(+unit_id),
    getLessonById(+lesson_id),
    getQuestionById(+question_id),
    getAnswers(+question_id),
  ]);

  if (!course) {
    redirect(routes.admin);
  }

  if (!unit) {
    redirect(`${routes.admin}/${course.id}/units`);
  }

  if (!lesson) {
    redirect(`${routes.admin}/${course.id}/units/${unit.id}/lessons`);
  }

  if (!question) {
    redirect(
      `${routes.admin}/${course.id}/units/${unit.id}/lessons/${lesson.id}`
    );
  }

  const headerTitle = [
    course.language,
    unit.title,
    `lesson: ${lesson.order}`,
    `question: ${question.order}`,
    `answer = ${question.answer}`,
  ];

  return <AnswersScreen headerTitle={headerTitle} data={answers} />;
}
