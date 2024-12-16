import { memo, useCallback } from 'react';
import { useSafeAudio } from '@/hooks';
import { type Answer } from '@/types/main';
import { cn } from '@/lib/utils';

interface AnswerButtonProps {
  data: Answer;

  isSelected: boolean;
  onAnswer: (answer: string) => void;
  order: number;
}

export const AnswerButton = memo((props: AnswerButtonProps) => {
  const { data, onAnswer, order, isSelected } = props;

  const safeAudio = useSafeAudio({
    src: data.audio,
  });

  const handleSelect = useCallback(() => {
    safeAudio?.controls.play();
    onAnswer(data.value);
  }, [safeAudio, data.value, onAnswer]);

  return (
    <button
      className={cn(
        'border-2 border-b-4 border-mercury',
        'active:border-b-2 active:mt-0.5',
        'flex items-center gap-2',
        'p-3 rounded-xl',
        isSelected && 'border-tranquil-pool bg-tranquil-pool/40'
      )}
      onClick={handleSelect}
    >
      {safeAudio?.audio}
      <p className='shrink-0'>{order}</p>
      <span className='grow'>{data.value}</span>
    </button>
  );
});

AnswerButton.displayName = 'AnswerButton';
