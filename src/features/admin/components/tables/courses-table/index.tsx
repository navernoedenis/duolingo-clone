'use client';

import { useCallback, useMemo } from 'react';

import { createCourse, updateCourse, deleteCourse } from '@/db/api';
import { useConfirmation } from '@/features/confirmation';
import { useAction } from '@/hooks';
import { type Course } from '@/types/main';

import { TableModal } from '../../table-modal';
import { TableWrapper } from '../../table-wrapper';
import { useTableModal } from '../../../hooks';
import { createColumns } from '../../../utils/create-columns';

import { CourseForm } from './form';

export const CoursesTable = ({ data }: { data: Course[] }) => {
  const { action, item, onOpen, onClose } = useTableModal();

  const confirmation = useConfirmation();

  const createAction = useAction({
    action: createCourse,
    onSuccess: onClose,
  });

  const updateAction = useAction({
    action: updateCourse,
    onSuccess: onClose,
  });

  const deleteAction = useAction({
    action: deleteCourse,
  });

  const handleDelete = useCallback(
    async (course: Course) => {
      const confirm = await confirmation({
        title: 'Confirmation',
        message: `Remove "${course.language}" course?`,
        confirmText: 'Delete',
      });

      if (confirm) {
        deleteAction.run(course.language);
      }
    },
    [confirmation, deleteAction]
  );

  const handleEdit = useCallback(
    (course: Course) => {
      onOpen('update', course);
    },
    [onOpen]
  );

  const tableColumns = useMemo(
    () =>
      createColumns<Course>({
        actions: {
          handleDelete,
          handleEdit,
        },
        columns: [
          { field: 'id' },
          {
            field: 'language',
            href: (item) => `/admin/${item.language}/units`,
          },
          { field: 'icon', image: (item) => item.icon },
        ],
      }),
    [handleDelete, handleEdit]
  );

  const creationButton = useMemo(
    () => ({
      onClick: () => onOpen('create', 'course'),
      text: 'Create course',
    }),
    [onOpen]
  );

  return (
    <>
      <TableModal
        title='Create course'
        open={action === 'create'}
        onClose={onClose}
      >
        <CourseForm
          buttonText='Create course'
          disabled={createAction.pending}
          onSubmit={createAction.run}
        />
      </TableModal>

      <TableModal
        title='Update course'
        open={action === 'update'}
        onClose={onClose}
      >
        <CourseForm
          buttonText='Update course'
          course={item as Course}
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
