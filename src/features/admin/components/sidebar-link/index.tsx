import Link from 'next/link';
import { type ForwardRefExoticComponent, type RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

import { cn } from '@/lib/utils';

export type SidebareLinkProps = {
  href: string;
  title: string;
  isActive?: boolean;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

export const SidebarLink = ({
  href,
  icon: Icon,
  isActive,
  title,
}: SidebareLinkProps) => {
  return (
    <Link
      className={cn(
        'flex items-center gap-2',
        isActive && 'text-green-feather'
      )}
      href={href}
    >
      <Icon size={18} /> <span className='capitalize text-lg'>{title}</span>
    </Link>
  );
};
