import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export const Category = ({
  children,
  content,
  description,
  reverse,
  title,
}: {
  children?: ReactNode;
  content?: ReactNode;
  description: string;
  reverse?: boolean;
  title: string;
}) => {
  return (
    <section
      className={cn(
        'flex items-center gap-12 px-16 py-10',
        reverse && 'flex-row-reverse'
      )}
    >
      {children}
      <div className='flex flex-col gap-3'>
        <h6 className='text-2xl font-bold text-shisha-coal'>{title}</h6>
        <p className='text-lucky-grey'>{description}</p>
        {content}
      </div>
    </section>
  );
};
