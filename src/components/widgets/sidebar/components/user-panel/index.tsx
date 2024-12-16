'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { signOut } from 'next-auth/react';
import { ChevronsUpDown } from 'lucide-react';

import { isAdminRole } from '@/features/admin';

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
  const t = useTranslations('common');
  const hasAccessToAdminPanel = isAdminRole(user.role);
  const [isDropdownOpened, setDropdownOpened] = useState(false);

  return (
    <DropdownMenu onOpenChange={setDropdownOpened}>
      <div className={cn(className)}>
        <DropdownMenuTrigger
          className={cn(
            'w-full flex items-center gap-1.5 transition',
            'p-1.5 rounded-md hover:bg-winter-dayn',
            isDropdownOpened && 'bg-winter-day'
          )}
        >
          <UserAvatar image={user.image} username={user.name} />
          <div className='text-sm leading-4 overflow-hidden'>
            <p className='text-start font-bold leading-4 truncate'>
              {user.name}
            </p>
            <p className='text-start truncate'>{user.email}</p>
          </div>
          <ChevronsUpDown className='ml-auto' size={16} />
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent className='w-60' align='end' side='right'>
        {hasAccessToAdminPanel && (
          <DropdownMenuItem
            className='text-md cursor-pointer capitalize'
            onClick={() => router.push(routes.admin)}
          >
            {t('admin')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className='text-md cursor-pointer capitalize'
          onClick={() => signOut()}
        >
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
