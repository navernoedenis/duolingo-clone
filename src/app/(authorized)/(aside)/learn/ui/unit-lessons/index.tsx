'use client';

import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { routes } from '@/constants';
import { type LessonStepProgress, type LessonWithStatus } from '@/types/main';

import { NoLessons } from '../no-lessons';
import { LessonProgress } from '../lesson-progress';

export const UnitLessons = ({
  lessons,
  lessonStepProgress,
}: {
  lessons: LessonWithStatus[];
  lessonStepProgress: LessonStepProgress;
}) => {
  const router = useRouter();
  const quantity = lessons.length;
  const odd = quantity % 2;

  let middle = Math.round(quantity / 2);
  middle += odd ? 0 : 1;

  const position: Record<number, number> = {};

  for (let index = 0; index < quantity; index++) {
    const shift = 24;

    if (index >= middle) {
      const last = position[index - 1];
      position[index] = last - shift;
    } else {
      position[index] = index * shift;
    }
  }

  if (!quantity) {
    return <NoLessons />;
  }

  return (
    <div className='flex flex-col items-center gap-2 py-6'>
      {lessons.map((lesson, index) => {
        const isProgressButton = lesson.available && !lesson.complete;
        const leftPosition = `-${position[index]}px`;

        const lessonButton = (
          <button
            key={lesson.id}
            aria-label={`lesson ${lesson.order} button`}
            style={{ left: isProgressButton ? 0 : leftPosition }}
            className={cn(
              'relative rounded-full py-4 px-5 text-snow cursor-pointer',
              'border-b-8 border-b-green-feather bg-green-mask',
              'active:border-b-4 active:mt-1',
              'disabled:active:mt-0 disabled:active:border-b-8',
              'disabled:opacity-45 disabled:cursor-default'
            )}
            onClick={() => {
              router.push(
                `${routes.units}/${lesson.unitId}/lessons/${lesson.id}`
              );
            }}
            disabled={!lesson.available}
          >
            <Star />
          </button>
        );

        if (isProgressButton) {
          return (
            <LessonProgress
              key={lesson.id}
              step={lessonStepProgress.step}
              stepsCount={lessonStepProgress.stepsCount}
              style={{ left: leftPosition }}
              tooltipText='Почати'
            >
              {lessonButton}
            </LessonProgress>
          );
        }

        return lessonButton;
      })}
    </div>
  );
};
