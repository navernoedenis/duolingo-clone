import dynamic from 'next/dynamic';
import { getCourses } from '@/db/api';

const CoursesScreen = dynamic(() =>
  import('@/features/admin').then((m) => m.CoursesScreen)
);

export default async function CoursesPage() {
  const courses = await getCourses();
  return <CoursesScreen headerTitle='courses' data={courses} />;
}
