import { useMemo } from 'react';
import { FillSentence } from './fill-sentence';
import { CharacterImage } from '../../character-image';
import { WordCards } from '../../word-cards';
import { useWrite } from '../../../hooks';

import { type QuestionProps } from '../../../types';

export const FillQuestion = ({ data, selected, onAnswer }: QuestionProps) => {
  const { character, sentence, answers } = data;
  const { words, disabledIndexes, onWrite } = useWrite({
    onAnswer,
    selected,
    type: 'single',
  });

  const selectedIndex = useMemo(() => {
    const array = data.sentence ? data.sentence.split(' ') : [];
    return array.findIndex((item) => item === '_');
  }, [data.sentence]);

  const result = sentence ? sentence.split(' ') : [];

  if (selected.trim()) {
    result[selectedIndex] = words[0].split('_')[0];
  } else {
    result[selectedIndex] = '_______';
  }

  const showHeading = !!character || !!sentence;

  return (
    <div className='flex flex-col'>
      {showHeading && (
        <div className='flex items-center gap-6'>
          {character && <CharacterImage src={character} />}
          {sentence && (
            <FillSentence selectedIndex={selectedIndex} words={result} />
          )}
        </div>
      )}

      <WordCards
        data={answers.map((answer) => answer.value)}
        disabledIndexes={disabledIndexes}
        onPick={onWrite}
      />
    </div>
  );
};
