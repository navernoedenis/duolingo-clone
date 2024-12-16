import { type Answer } from '@/types/main';
import { AnswersTable } from '../../components';
import { AdminHeader } from '../../components/admin-header';

export const AnswersScreen = ({
  data,
  headerTitle,
}: {
  data: Answer[];
  headerTitle: string | string[];
}) => {
  return (
    <>
      <AdminHeader title={headerTitle} />
      <AnswersTable data={data} />
    </>
  );
};
