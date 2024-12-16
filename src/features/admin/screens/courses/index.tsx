import { type Course } from '@/types/main';

import { CoursesTable } from '../../components';
import { AdminHeader } from '../../components/admin-header';

export const CoursesScreen = async ({
  data,
  headerTitle,
}: {
  data: Course[];
  headerTitle: string;
}) => {
  return (
    <>
      <AdminHeader title={headerTitle} />
      <CoursesTable data={data} />
    </>
  );
};
