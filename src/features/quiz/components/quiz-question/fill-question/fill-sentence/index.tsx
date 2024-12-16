import { cn } from '@/lib/utils';

export const FillSentence = ({
  selectedIndex,
  words,
}: {
  selectedIndex: number;
  words: string[];
}) => {
  return (
    <div className='text-lg flex flex-wrap gap-1.5'>
      {words.map((word, index) => {
        const isActive = index === selectedIndex;

        return (
          <p
            key={word}
            className={cn(isActive && 'text-green-feather font-semibold')}
          >
            {word}
          </p>
        );
      })}
    </div>
  );
};
