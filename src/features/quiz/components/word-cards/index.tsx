import { WordCard } from './word-card';
import { cn } from '@/lib/utils';

export const WordCards = ({
  data,
  disabledIndexes = [],
  onPick,
}: {
  data: string[];
  disabledIndexes?: number[];
  onPick: (word: string, order: number) => void;
}) => {
  return (
    <div
      className={cn(
        'border-t border-t-mercury py-4',
        'flex items-center gap-3 flex-wrap',
        'min-h-[77px]'
      )}
    >
      {data.map((word, index) => {
        const [value] = word.split('_');

        return (
          <WordCard
            disabled={disabledIndexes.includes(index)}
            key={index}
            onPick={() => onPick(word, index)}
            value={value}
          />
        );
      })}
    </div>
  );
};
