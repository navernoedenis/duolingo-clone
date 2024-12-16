import { type ReactNode } from 'react';

export const CardItem = ({
  left,
  right,
  text,
}: {
  left: ReactNode;
  right?: ReactNode;
  text: string;
}) => {
  return (
    <div className='border-b last:border-b-0 p-4 flex items-center gap-3'>
      <div className='shrink-0'>{left}</div>
      <span className='grow text-lg font-semibold text-shisha-coal'>
        {text}
      </span>
      <div className='shrink-0'>{right}</div>
    </div>
  );
};
