import Image from 'next/image';
import { cn } from '@/lib/utils';

export const UserProgress = ({
  className,
  hearts,
  languageImage,
  points,
}: {
  className?: string;
  hearts: number;
  languageImage: string;
  points: number;
}) => {
  return (
    <section className={cn('flex gap-4 justify-evenly', className)}>
      <Image src={languageImage} height={24} width={24} alt='language' />

      <div className='flex items-center justify-center gap-1'>
        <Image src='/icons/flame.svg' height={28} width={28} alt='flame' />
        <span className='font-semibold'>{points}</span>
      </div>

      <div className='flex items-center justify-center gap-2'>
        <Image src='/icons/heart.svg' height={28} width={28} alt='heart' />
        <span className='font-semibold'>{hearts}</span>
      </div>
    </section>
  );
};
