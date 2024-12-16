import { type Unit } from '@/types/main';
import { UnitsTable } from '../../components';
import { AdminHeader } from '../../components/admin-header';

export const UnitsScreen = ({
  data,
  headerTitle,
}: {
  data: Unit[];
  headerTitle: string | string[];
}) => {
  return (
    <>
      <AdminHeader title={headerTitle} />
      <UnitsTable data={data} />
    </>
  );
};
