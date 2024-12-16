import { cn } from '@/lib/utils';

export const WordCard = ({
  disabled,
  onPick,
  value,
}: {
  disabled?: boolean;
  onPick: VoidFunction;
  value: string;
}) => {
  return (
    <button
      className={cn(
        'border-2 rounded-xl p-2 cursor-pointer min-w-[44px]',
        disabled && 'cursor-defaulty bg-mercury text-mercury'
      )}
      onClick={onPick}
      disabled={disabled}
    >
      {value}
    </button>
  );
};
