import Link from 'next/link';

import { getAuth } from '@/db/api';
import { routes } from '@/constants';

import { SidebarLinks } from '../sidebar-links';
import { UserPanel } from '../user-panel';

export const Sidebar = async () => {
  const user = await getAuth();

  return (
    <aside className='max-w-64 w-full shrink-0'>
      <div className='h-screen sticky top-0 flex flex-col px-3'>
        <div className='py-7 px-3'>
          <Link
            className='font-duo text-3xl text-green-feather'
            href={routes.learn}
          >
            duolingo
          </Link>
        </div>
        <SidebarLinks />
        <UserPanel className='mt-auto py-2' user={user!} />
      </div>
    </aside>
  );
};
