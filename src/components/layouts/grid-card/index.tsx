import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const GridCard = ({
  children,
  aside,
  className,
}: {
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main
      className={cn('max-w-screen-wrapper mx-auto flex grow gap-2', className)}
    >
      <div className='grow py-4'>{children}</div>
      {aside && (
        <div className='w-full max-w-96'>
          <div className='sticky top-0 right-0 bottom-0 left-0'>
            <div className='h-screen py-4'>{aside}</div>
          </div>
        </div>
      )}
    </main>
  );
};
