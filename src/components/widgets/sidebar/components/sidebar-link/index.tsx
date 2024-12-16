import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { type LinkItem } from '../../types';

export const SidebarLink = ({
  data,
  isActive,
}: {
  data: LinkItem;
  isActive: boolean;
}) => {
  return (
    <Link
      className={cn(
        'border-2 border-transparent rounded-xl flex items-center gap-5 p-2 transition',
        isActive && 'border-tranquil-pool bg-winter-day',
        !isActive && 'hover:border-winter-day hover:bg-winter-day'
      )}
      href={data.href}
    >
      <Image height={32} width={32} src={data.icon} alt='icon' />
      <span
        className={cn(
          'uppercase text-sm font-bold text-lucky-grey',
          isActive && 'text-macaw'
        )}
      >
        {data.title}
      </span>
    </Link>
  );
};
