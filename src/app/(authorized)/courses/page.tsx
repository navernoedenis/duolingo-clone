import Link from 'next/link';

import { getAuth, getCourses } from '@/db/api';
import { isAdminRole } from '@/features/admin';
import { Button } from '@/components/ui/button';

import { routes } from '@/constants';

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

      {isAdmin && (
        <div className='fixed top-4 right-4'>
          <Link href={routes.admin}>
            <Button>Admin</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
