'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';

import { type LinkItem } from '../../types';
import { SidebarLink } from '../sidebar-link';

export const SidebarLinks = () => {
  const pathname = usePathname();
  const t = useTranslations('components.widgets.sidebar');

  const linkItems: LinkItem[] = useMemo(
    () => [
      {
        href: routes.learn,
        icon: '/icons/home.svg',
        title: t('learn'),
      },
      {
        href: routes.leaderboards,
        icon: '/icons/shield.svg',
        title: t('leaderboards'),
      },
      {
        href: routes.shop,
        icon: '/icons/shop.svg',
        title: t('shop'),
      },
    ],
    [t]
  );

  return (
    <nav className='flex flex-col gap-2'>
      {linkItems.map((link) => (
        <SidebarLink
          data={link}
          isActive={pathname === link.href}
          key={link.href}
        />
      ))}
    </nav>
  );
};
