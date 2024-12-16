'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { signOut } from 'next-auth/react';
import { ChevronsUpDown } from 'lucide-react';

import { adminRoles, isAdminRole } from '@/features/admin';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UserAvatar } from '@/components/ui';

import { routes } from '@/constants';
import { cn } from '@/lib/utils';
import { type User } from '@/types/main';

export const UserPanel = ({
  className,
  user,
}: {
  className?: string;
  user: User;
}) => {
  const router = useRouter();
  const hasAccessToAdminPanel = isAdminRole(user.role);
  const [isDropdownOpened, setDropdownOpened] = useState(false);

  return (
    <DropdownMenu onOpenChange={setDropdownOpened}>
      <div className={cn(className)}>
        <DropdownMenuTrigger
          className={cn(
            'w-full flex items-center gap-1.5 transition',
            'p-1.5 rounded-md hover:bg-winter-day',
            isDropdownOpened && 'bg-winter-day'
          )}
        >
          <UserAvatar image={user.image} username={user.name} />
          <div className='text-sm leading-4'>
            <p className='text-start font-bold leading-4'>{user.name}</p>
            <span>{user.email}</span>
          </div>
          <ChevronsUpDown className='ml-auto' size={16} />
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className='w-60' align='end' side='right'>
        {hasAccessToAdminPanel && (
          <DropdownMenuItem
            className='text-md cursor-pointer'
            onClick={() => router.push(routes.admin)}
          >
            Admin
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className='text-md cursor-pointer'
          onClick={() => signOut()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
