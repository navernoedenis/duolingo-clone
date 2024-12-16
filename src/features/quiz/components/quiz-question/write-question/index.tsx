import { AudioCard } from './audio-card';
import { CharacterImage } from '../../character-image';
import { WordCards } from '../../word-cards';
import { useWrite } from '../../../hooks';
import { type QuestionProps } from '../../../types';

export const WriteQuestion = ({ data, selected, onAnswer }: QuestionProps) => {
  const { audio, character, sentence, answers } = data;
  const { words, onWrite, onErase, disabledIndexes } = useWrite({
    onAnswer,
    selected,
  });

  const showHeading = !!audio || !!character;

  return (
    <section className='flex flex-col'>
      {showHeading && (
        <div className='flex items-center gap-3'>
          {character && <CharacterImage src={character} />}
          {audio && (
            <div className='my-10'>
              <AudioCard src={audio} sentence={sentence} />
            </div>
          )}
        </div>
      )}

      <WordCards data={words} onPick={onErase} />
      <WordCards
        data={answers.map((answer) => answer.value)}
        onPick={onWrite}
        disabledIndexes={disabledIndexes}
      />
    </section>
  );
};
