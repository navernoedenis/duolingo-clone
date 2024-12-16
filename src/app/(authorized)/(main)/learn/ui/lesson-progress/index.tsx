import { type ReactNode, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

export const LessonProgress = ({
  children,
  step,
  stepsCount,
  style = {},
  tooltipText,
}: {
  children: ReactNode;
  step: number;
  stepsCount: number;
  style?: CSSProperties;
  tooltipText?: string;
}) => {
  const size = 106;
  const r = 43;
  const cxy = 53;
  const strokeWidth = 7;
  const strokeDasharray = 270;

  // if lesson doesn't have questions, we receive stepsCount = 0,
  // strokeDasharray(270) * stepsCount(0) = Infinity.
  // It will cause NaN for progressPoints,
  // To change this behavior, we set 1 by default

  const safeStepCount = stepsCount === 0 ? 1 : stepsCount;
  const stepPoints = strokeDasharray / safeStepCount;
  const progressPoints = strokeDasharray - step * stepPoints;

  return (
    <div className='relative inline-block' style={style}>
      {tooltipText && (
        <div className='absolute z-30 -top-5 left-1/2 transform -translate-x-1/2'>
          <div
            className={cn(
              'border-2 rounded-xl py-2 px-4',
              'bg-snow font-bold animate-bounce'
            )}
          >
            <span className='select-none'>{tooltipText}</span>
            <div
              className={cn(
                'absolute z-20 -bottom-2.5 bg-snow',
                'border-b-2 border-r-2 h-4 w-4',
                'transform left-1/2 -translate-x-1/2 rotate-45'
              )}
            />
          </div>
        </div>
      )}

      <svg
        height={size}
        width={size}
        style={{ transform: 'rotate(-90deg)', ...style }}
      >
        <circle
          cx={cxy}
          cy={cxy}
          r={r}
          className='fill-transparent stroke-mercury'
          strokeDasharray={strokeDasharray}
          strokeDashoffset={0}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cxy}
          cy={cxy}
          r={r}
          className='fill-transparent stroke-green-mask'
          strokeDasharray={strokeDasharray}
          strokeDashoffset={progressPoints ?? 0}
          strokeLinecap='round'
          strokeWidth={strokeWidth}
        />
      </svg>

      <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        {children}
      </div>
    </div>
  );
};
