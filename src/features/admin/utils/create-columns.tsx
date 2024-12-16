import Image from 'next/image';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CreateColumn<T> {
  columns: ColumnType<T>[];
  actions?: {
    handleEdit: (item: T) => void;
    handleDelete: (item: T) => void;
  };
}

type ColumnType<T> = {
  field: keyof T;
  href?: (item: T) => string;
  image?: (item: T) => string;
};

export const createColumns = <T,>(data: CreateColumn<T>): ColumnDef<T>[] => {
  const columns: ColumnDef<T>[] = data.columns.map((column) => {
    const accessorKey = column.field as string;
    const header = accessorKey;

    const basicColumn: ColumnDef<T> = {
      accessorKey,
      header,
    };

    if (column.href) {
      basicColumn.cell = ({ row }) => {
        const item = row.original;
        const link = column.href!(item);
        const name = item[header as keyof T] as string;

        return (
          <Link href={link}>
            <Button variant='outline'>{name}</Button>
          </Link>
        );
      };
    }

    if (column.image) {
      basicColumn.cell = ({ row }) => (
        <Image
          src={column.image!(row.original)}
          height={20}
          width={20}
          alt='image'
        />
      );
    }

    return basicColumn;
  });

  if (!data.actions) return columns;

  columns.push({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className='text-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => data.actions!.handleEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => data.actions!.handleDelete(row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  });

  return columns;
};
