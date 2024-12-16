import { type Lesson } from '@/types/main';
import { LessonsTable } from '../../components';
import { AdminHeader } from '../../components/admin-header';

export const LessonsScreen = async ({
  data,
  headerTitle,
}: {
  data: Lesson[];
  headerTitle: string | string[];
}) => {
  return (
    <>
      <AdminHeader title={headerTitle} />
      <LessonsTable data={data} />
    </>
  );
};
