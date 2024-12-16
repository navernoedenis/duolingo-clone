import Link from 'next/link';
import { memo } from 'react';
import { IoMdHeart } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import { routes } from '@/constants';

interface QuizHeaderProps {
  hearts: number;
  progress: number;
}

export const QuizHeader = memo(({ hearts, progress }: QuizHeaderProps) => {
  return (
    <header className='max-w-screen-wrapper mx-auto flex items-center gap-4 py-6 px-4'>
      <Link className='p-0.5 shrink-0' href={routes.learn}>
        <IoClose size={28} />
      </Link>

      <div className='bg-mercury h-5 w-full rounded-xl flex overflow-hidden'>
        <div
          className='rounded-xl bg-green-feather transition-all'
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className='flex items-center justify-center gap-2 shrink-0'>
        <IoMdHeart className='text-cardinal' size={28} />{' '}
        <span className='font-semibold'>{hearts}</span>
      </div>
    </header>
  );
});

QuizHeader.displayName = 'QuizHeader';
