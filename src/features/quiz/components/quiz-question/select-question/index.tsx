import { AnswerButton } from './answer-button';
import { CharacterImage } from '../../character-image';
import { SentenceMessage } from '../../sentence-message';
import { type QuestionProps } from '../../../types';

export const SelectQuestion = ({ data, selected, onAnswer }: QuestionProps) => {
  const { answers, sentence, character } = data;
  const showHeading = !!sentence || !!character;

  return (
    <div className='flex flex-col gap-2'>
      {showHeading && (
        <div className='flex items-center gap-3'>
          {character && <CharacterImage src={character} />}
          {sentence && (
            <div className='my-10'>
              <SentenceMessage sentence={sentence} />
            </div>
          )}
        </div>
      )}

      {answers.map((answer, index) => (
        <AnswerButton
          data={answer}
          isSelected={selected === answer.value}
          key={answer.id}
          onAnswer={onAnswer}
          order={index + 1}
        />
      ))}
    </div>
  );
};
