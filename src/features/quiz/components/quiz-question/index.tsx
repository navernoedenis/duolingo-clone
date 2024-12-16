import { type JSX } from 'react';
import { type QuestionType } from '@/types/main';
import { cn } from '@/lib/utils';

import { FillQuestion } from './fill-question';
import { ListenQuestion } from './listen-question';
import { SelectQuestion } from './select-question';
import { WhichQuestion } from './which-question';
import { WriteQuestion } from './write-question';

import { HardExercise } from '../hard-exercise';
import { type QuestionProps } from '../../types';

const questions: Record<QuestionType, (props: QuestionProps) => JSX.Element> = {
  fill: FillQuestion,
  listen: ListenQuestion,
  select: SelectQuestion,
  which: WhichQuestion,
  write: WriteQuestion,
};

export const QuizQuestion = ({ data, onAnswer, selected }: QuestionProps) => {
  const Question = questions[data.type];

  return (
    <section
      className={cn(
        'h-[calc(100vh-80px-114px)] overflow-y-auto',
        'max-w-screen-wrapper mx-auto px-4',
        'flex items-center justify-center'
      )}
    >
      <div className='flex flex-col gap-1 max-w-[600px] w-full'>
        {data.hard && <HardExercise />}
        <h3 className='text-2xl font-extrabold'>{data.title}</h3>
        <Question data={data} onAnswer={onAnswer} selected={selected} />
      </div>
    </section>
  );
};
