'use client';

import { useParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { createQuestion, updateQuestion, deleteQuestion } from '@/db/api';
import { useConfirmation } from '@/features/confirmation';
import { useAction } from '@/hooks';
import { type Question } from '@/types/main';

import { TableModal } from '../../table-modal';
import { TableWrapper } from '../../table-wrapper';
import { useTableModal } from '../../../hooks';
import { createColumns } from '../../../utils/create-columns';
import { getNextOrder } from '../../../utils/get-next-order';

import { QuestionForm } from './form';

export const QuestionsTable = ({ data }: { data: Question[] }) => {
  const { lesson_id } = useParams<{ lesson_id: string }>();
  const { action, item, onOpen, onClose } = useTableModal();

  const confirmation = useConfirmation();

  const createAction = useAction({
    action: createQuestion,
    onSuccess: onClose,
  });

  const updateAction = useAction({
    action: updateQuestion,
    onSuccess: onClose,
  });

  const deleteAction = useAction({
    action: deleteQuestion,
  });

  const handleDelete = useCallback(
    async (question: Question) => {
      const confirm = await confirmation({
        title: 'Confirmation',
        message: `Remove "${question.title}" question?`,
        confirmText: 'Delete',
      });

      if (confirm) {
        deleteAction.run(question.id);
      }
    },
    [confirmation, deleteAction]
  );

  const handleEdit = useCallback(
    (answer: Question) => {
      onOpen('update', answer);
    },
    [onOpen]
  );

  const tableColumns = useMemo(
    () =>
      createColumns<Question>({
        actions: {
          handleDelete,
          handleEdit,
        },
        columns: [
          { field: 'language' },
          { field: 'order' },
          { field: 'id', href: (item) => `questions/${item.id}/answers` },
          { field: 'type' },
          { field: 'title' },
          { field: 'sentence' },
          { field: 'answer' },
          { field: 'audio' },
          { field: 'character' },
          { field: 'hard' },
        ],
      }),
    [handleDelete, handleEdit]
  );

  const creationButton = useMemo(
    () => ({
      onClick: () => onOpen('create', 'question'),
      text: 'Create question',
    }),
    [onOpen]
  );

  return (
    <>
      <TableModal
        title='Create question'
        open={action === 'create'}
        onClose={onClose}
      >
        <QuestionForm
          buttonText='Create question'
          defaultOrder={getNextOrder(data)}
          disabled={createAction.pending}
          onSubmit={createAction.run}
          question={{ lessonId: +lesson_id }}
        />
      </TableModal>
      <TableModal
        title='Update question'
        open={action === 'update'}
        onClose={onClose}
      >
        <QuestionForm
          buttonText='Update question'
          disabled={updateAction.pending}
          onSubmit={updateAction.run}
          question={item as Question}
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
