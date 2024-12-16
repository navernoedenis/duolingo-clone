import { type QuestionProps } from '../../../types';
import { AnswerCard } from './answer-card';

export const WhichQuestion = ({ data, selected, onAnswer }: QuestionProps) => {
  return (
    <div className='grid grid-cols-3 gap-2 my-10'>
      {data.answers.map((answer, index) => (
        <AnswerCard
          data={answer}
          isSelected={answer.value === selected}
          key={answer.id}
          onAnswer={onAnswer}
          order={index + 1}
        />
      ))}
    </div>
  );
};
