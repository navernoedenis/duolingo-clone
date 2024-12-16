import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import {
  getCourseByLanguage,
  getLessonById,
  getQuestions,
  getUnitById,
} from '@/db/api';

import { routes } from '@/constants';

const QuestionsScreen = dynamic(() =>
  import('@/features/admin').then((m) => m.QuestionsScreen)
);

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{
    language: string;
    lesson_id: string;
    unit_id: string;
  }>;
}) {
  const { language, lesson_id, unit_id } = await params;

  const [course, lesson, questions, unit] = await Promise.all([
    getCourseByLanguage(language),
    getLessonById(+lesson_id),
    getQuestions(+lesson_id),
    getUnitById(+unit_id),
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

  const headerTitle = [
    course.language,
    unit.title,
    `lesson: ${lesson.order}`,
    'questions',
  ];

  return <QuestionsScreen headerTitle={headerTitle} data={questions} />;
}
