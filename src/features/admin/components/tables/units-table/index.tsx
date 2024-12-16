'use client';

import { useCallback, useMemo } from 'react';

import { createUnit, updateUnit, deleteUnit } from '@/db/api';
import { useConfirmation } from '@/features/confirmation';
import { useAction } from '@/hooks';
import { type Unit } from '@/types/main';

import { TableModal } from '../../table-modal';
import { TableWrapper } from '../../table-wrapper';
import { useTableModal } from '../../../hooks';
import { createColumns } from '../../../utils/create-columns';
import { getNextOrder } from '../../../utils/get-next-order';

import { UnitForm } from './form';

export const UnitsTable = ({ data }: { data: Unit[] }) => {
  const { action, item, onOpen, onClose } = useTableModal();

  const confirmation = useConfirmation();

  const createAction = useAction({
    action: createUnit,
    onSuccess: onClose,
  });

  const updateAction = useAction({
    action: updateUnit,
    onSuccess: onClose,
  });

  const deleteAction = useAction({
    action: deleteUnit,
  });

  const handleDelete = useCallback(
    async (unit: Unit) => {
      const confirm = await confirmation({
        title: 'Confirmation',
        message: `Remove "${unit.title}" unit?`,
        confirmText: 'Delete',
      });

      if (confirm) {
        deleteAction.run(unit.id);
      }
    },
    [confirmation, deleteAction]
  );

  const handleEdit = useCallback(
    (unit: Unit) => {
      onOpen('update', unit);
    },
    [onOpen]
  );

  const tableColumns = useMemo(
    () =>
      createColumns<Unit>({
        actions: {
          handleEdit,
          handleDelete,
        },
        columns: [
          { field: 'order' },
          { field: 'title', href: (item) => `units/${item.id}/lessons` },
        ],
      }),
    [handleEdit, handleDelete]
  );

  const creationButton = useMemo(
    () => ({
      onClick: () => onOpen('create'),
      text: 'Create unit',
    }),
    [onOpen]
  );

  return (
    <>
      <TableModal
        title='Create unit'
        open={action === 'create'}
        onClose={onClose}
      >
        <UnitForm
          buttonText='Create unit'
          defaultOrder={getNextOrder(data)}
          disabled={createAction.pending}
          onSubmit={createAction.run}
          unit={{ courseId: data[0]?.courseId }}
        />
      </TableModal>

      <TableModal
        title='Update course'
        open={action === 'update'}
        onClose={onClose}
      >
        <UnitForm
          buttonText='Update unit'
          unit={item as Unit}
          disabled={updateAction.pending}
          onSubmit={updateAction.run}
        />
      </TableModal>

      <TableWrapper
        columns={tableColumns}
        creationButton={creationButton}
        data={data}
      />
    </>
  );
};
