'use client';

import { useParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { createLesson, updateLesson, deleteLesson } from '@/db/api';
import { useConfirmation } from '@/features/confirmation';
import { useAction } from '@/hooks';
import { type Lesson } from '@/types/main';

import { TableModal } from '../../table-modal';
import { useTableModal } from '../../../hooks';
import { TableWrapper } from '../../table-wrapper';
import { createColumns } from '../../../utils/create-columns';
import { getNextOrder } from '../../../utils/get-next-order';

import { LessonForm } from './form';

export const LessonsTable = ({ data }: { data: Lesson[] }) => {
  const { unit_id } = useParams<{ unit_id: string }>();
  const { action, item, onOpen, onClose } = useTableModal();

  const confirmation = useConfirmation();

  const createAction = useAction({
    action: createLesson,
    onSuccess: onClose,
  });

  const updateAction = useAction({
    action: updateLesson,
    onSuccess: onClose,
  });

  const deleteAction = useAction({
    action: deleteLesson,
  });

  const handleDelete = useCallback(
    async (lesson: Lesson) => {
      const confirm = await confirmation({
        title: 'Confirmation',
        message: `Remove "${lesson.id}" lesson?`,
        confirmText: 'Delete',
      });

      if (confirm) {
        deleteAction.run(lesson.id);
      }
    },
    [deleteAction, confirmation]
  );

  const handleEdit = useCallback(
    (lesson: Lesson) => {
      onOpen('update', lesson);
    },
    [onOpen]
  );

  const tableColumns = useMemo(
    () =>
      createColumns<Lesson>({
        actions: {
          handleDelete,
          handleEdit,
        },
        columns: [
          { field: 'order' },
          { field: 'id', href: (item) => `lessons/${item.id}/questions` },
        ],
      }),
    [handleDelete, handleEdit]
  );

  const creationButton = useMemo(
    () => ({
      onClick: () => onOpen('create', 'lesson'),
      text: 'Create lesson',
    }),
    [onOpen]
  );

  return (
    <>
      <TableModal
        title='Create lesson'
        open={action === 'create'}
        onClose={onClose}
      >
        <LessonForm
          buttonText='Create lesson'
          defaultOrder={getNextOrder(data)}
          disabled={createAction.pending}
          lesson={{ unitId: +unit_id }}
          onSubmit={createAction.run}
        />
      </TableModal>

      <TableModal
        title='Update lesson'
        open={action === 'update'}
        onClose={onClose}
      >
        <LessonForm
          buttonText='Update lesson'
          lesson={item as Lesson}
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
