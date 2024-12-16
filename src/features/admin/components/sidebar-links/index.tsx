'use client';

import { usePathname } from 'next/navigation';
import { BookOpenText } from 'lucide-react';

import { routes } from '@/constants';
import { SidebarLink, type SidebareLinkProps } from '../sidebar-link';

const links: SidebareLinkProps[] = [
  { title: 'courses', icon: BookOpenText, href: routes.admin },
];

export const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <nav className='flex flex-col gap-2'>
      {links.map((link) => (
        <SidebarLink
          href={link.href}
          title={link.title}
          icon={link.icon}
          key={link.href}
          isActive={pathname === link.href}
        />
      ))}
    </nav>
  );
};
