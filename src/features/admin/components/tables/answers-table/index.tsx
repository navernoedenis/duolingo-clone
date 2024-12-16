'use client';

import { useParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { createAnswer, updateAnswer, deleteAnswer } from '@/db/api';
import { useConfirmation } from '@/features/confirmation';
import { useAction } from '@/hooks';
import { type Answer } from '@/types/main';

import { TableModal } from '../../table-modal';
import { TableWrapper } from '../../table-wrapper';
import { useTableModal } from '../../../hooks';
import { createColumns } from '../../../utils/create-columns';

import { AnswerForm } from './form';

export const AnswersTable = ({ data }: { data: Answer[] }) => {
  const { question_id } = useParams<{ question_id: string }>();
  const { action, item, onOpen, onClose } = useTableModal();

  const confirmation = useConfirmation();

  const createAction = useAction({
    action: createAnswer,
    onSuccess: onClose,
  });

  const updateAction = useAction({
    action: updateAnswer,
    onSuccess: onClose,
  });

  const deleteAction = useAction({
    action: deleteAnswer,
  });

  const handleDelete = useCallback(
    async (answer: Answer) => {
      const confirm = await confirmation({
        title: 'Confirmation',
        message: `Remove "${answer.value}" answer?`,
        confirmText: 'Delete',
      });

      if (confirm) {
        deleteAction.run(answer.id);
      }
    },
    [confirmation, deleteAction]
  );

  const handleEdit = useCallback(
    (answer: Answer) => {
      onOpen('update', answer);
    },
    [onOpen]
  );

  const tableColumns = useMemo(
    () =>
      createColumns<Answer>({
        actions: {
          handleDelete,
          handleEdit,
        },
        columns: [
          { field: 'id' },
          { field: 'value' },
          { field: 'image' },
          { field: 'audio' },
        ],
      }),
    [handleDelete, handleEdit]
  );

  const creationButton = useMemo(
    () => ({
      onClick: () => onOpen('create', 'answer'),
      text: 'Create answer',
    }),
    [onOpen]
  );

  return (
    <>
      <TableModal
        title='Create answer'
        open={action === 'create'}
        onClose={onClose}
      >
        <AnswerForm
          answer={{ questionId: +question_id }}
          buttonText='Create answer'
          disabled={createAction.pending}
          onSubmit={createAction.run}
        />
      </TableModal>

      <TableModal
        title='Update answer'
        open={action === 'update'}
        onClose={onClose}
      >
        <AnswerForm
          buttonText='Update answer'
          answer={item as Answer}
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
