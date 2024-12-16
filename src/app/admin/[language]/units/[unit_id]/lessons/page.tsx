import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import { getCourseByLanguage, getUnitById, getLessonsByUnitId } from '@/db/api';
import { routes } from '@/constants';

const LessonsScreen = dynamic(() =>
  import('@/features/admin').then((m) => m.LessonsScreen)
);

export default async function LessonsPage({
  params,
}: {
  params: Promise<{
    language: string;
    unit_id: string;
  }>;
}) {
  const { language, unit_id } = await params;

  const [course, unit] = await Promise.all([
    getCourseByLanguage(language),
    getUnitById(+unit_id),
  ]);

  if (!course) {
    redirect(routes.admin);
  }

  if (!unit) {
    redirect(`${routes.admin}/${course.id}`);
  }

  const lessons = await getLessonsByUnitId(unit.id);
  const headerTitle = [course.language, unit.title, 'lessons'];
  return <LessonsScreen headerTitle={headerTitle} data={lessons} />;
}
