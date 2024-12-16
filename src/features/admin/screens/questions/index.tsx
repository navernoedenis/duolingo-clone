import { type Question } from '@/types/main';
import { QuestionsTable } from '../../components';
import { AdminHeader } from '../../components/admin-header';

export const QuestionsScreen = ({
  data,
  headerTitle,
}: {
  data: Question[];
  headerTitle: string | string[];
}) => {
  return (
    <>
      <AdminHeader title={headerTitle} />
      <QuestionsTable data={data} />
    </>
  );
};
