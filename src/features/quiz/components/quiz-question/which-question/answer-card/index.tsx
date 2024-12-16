import Image from 'next/image';
import { memo, useCallback } from 'react';
import { useSafeAudio } from '@/hooks';

import { type Answer } from '@/types/main';
import { cn } from '@/lib/utils';

interface AnswerCardProps {
  data: Answer;
  onAnswer: (answer: string) => void;
  order: number;
  isSelected: boolean;
}

export const AnswerCard = memo((props: AnswerCardProps) => {
  const { data, onAnswer, order, isSelected } = props;

  const safeAudio = useSafeAudio({
    src: data.audio,
  });

  const handleSelect = useCallback(() => {
    safeAudio?.controls.play();
    onAnswer(data.value);
  }, [safeAudio?.controls, data.value, onAnswer]);

  return (
    <>
      {safeAudio?.audio}
      <button
        className={cn(
          'border-2 border-b-4 rounded-xl p-5',
          'active:border-b-2 active:mt-0.5',
          'flex flex-col items-center gap-2 transition-colors',
          isSelected && 'border-tranquil-pool bg-tranquil-pool/40'
        )}
        onClick={handleSelect}
      >
        {data.image && (
          <Image
            className='object-cover'
            src={data.image}
            height={160}
            width={142}
            alt={`${data.value} image`}
          />
        )}
        <div className='flex items-center justify-between w-full'>
          <span className={cn(isSelected && 'text-macaw')}>{data.value}</span>
          <p
            className={cn(
              'border-[2px] p-1 rounded-lg h-7 min-w-7 text-xs font-semibold',
              'flex items-center justify-center shrink-0',
              isSelected && 'border-tranquil-pool text-macaw'
            )}
          >
            {order}
          </p>
        </div>
      </button>
    </>
  );
});

AnswerCard.displayName = 'AnswerCard';
