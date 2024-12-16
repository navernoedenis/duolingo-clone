import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

import { getCourseByLanguage, getUnitsByLanguage } from '@/db/api';
import { routes } from '@/constants';

const UnitsScreen = dynamic(() =>
  import('@/features/admin').then((m) => m.UnitsScreen)
);

export default async function UnitsPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  const course = await getCourseByLanguage(language);
  if (!course) {
    redirect(routes.admin);
  }

  const units = await getUnitsByLanguage(course.language);
  const headerTitle = [course.language, 'units'];

  return <UnitsScreen headerTitle={headerTitle} data={units} />;
}
