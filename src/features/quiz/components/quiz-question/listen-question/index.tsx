import { AudioCard } from './audio-card';
import { WordCards } from '../../word-cards';
import { useWrite } from '../../../hooks';
import { type QuestionProps } from '../../../types';

export const ListenQuestion = ({ data, selected, onAnswer }: QuestionProps) => {
  const { audio, answers } = data;
  const { words, onWrite, onErase, disabledIndexes } = useWrite({
    onAnswer,
    selected,
  });

  return (
    <section className='flex flex-col'>
      {audio && (
        <div className='my-10'>
          <AudioCard src={audio} />
        </div>
      )}

      <WordCards data={words} onPick={onErase} />
      <WordCards
        data={answers.map((answer) => answer.value)}
        disabledIndexes={disabledIndexes}
        onPick={onWrite}
      />
    </section>
  );
};
