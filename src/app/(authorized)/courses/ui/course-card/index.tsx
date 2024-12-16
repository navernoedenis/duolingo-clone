import Image from 'next/image';
import { cn } from '@/lib/utils';

export const CourseCard = ({
  icon,
  isActive,
  language,
  onClick,
}: {
  icon: string;
  isActive: boolean;
  language: string;
  onClick: VoidFunction;
}) => {
  return (
    <button
      className={cn(
        'h-[180px] w-[180px] border-2 border-b-4 rounded-xl p-2 active:border-b-2 transition',
        'flex flex-col items-center justify-center gap-2',
        isActive && 'border-macaw'
      )}
      onClick={onClick}
    >
      <Image height={54} width={70} src={icon} alt={language} />
      <span className='uppercase font-bold'>{language}</span>
    </button>
  );
};
