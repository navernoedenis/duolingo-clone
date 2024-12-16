import { getAuth, getCourses } from '@/db/api';
import { isAdminRole } from '@/features/admin';

import { AdminButton } from './ui/admin-button';
import { CourseTitle } from './ui/course-title';
import { SelectCourse } from './ui/select-course';

export default async function CoursesPage() {
  const [auth, courses] = await Promise.all([getAuth(), getCourses()]);
  const isAdmin = auth ? isAdminRole(auth.role) : false;

  return (
    <div className='h-screen p-4 flex items-center justify-center relative'>
      <div className='max-w-[852px] w-full flex flex-col items-center gap-6'>
        <CourseTitle oneOrMore={!!courses.length} />
        <SelectCourse courses={courses} />
      </div>

      {isAdmin && <AdminButton />}
    </div>
  );
}
