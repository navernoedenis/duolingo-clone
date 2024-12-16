import { memo } from 'react';
import { LiaDumbbellSolid } from 'react-icons/lia';

export const HardExercise = memo(() => {
  return (
    <div className='flex items-center gap-2'>
      <div className='p-1 bg-cardinal rounded-full flex items-center justify-center'>
        <LiaDumbbellSolid className='text-snow' size={16} />
      </div>
      <span className='uppercase text-cardinal font-bold font-duo text-sm'>
        hard exercise
      </span>
    </div>
  );
});

HardExercise.displayName = 'HardExercise';
