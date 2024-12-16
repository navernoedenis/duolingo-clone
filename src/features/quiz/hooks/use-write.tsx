import { useState, useEffect, useCallback } from 'react';

export const useWrite = ({
  onAnswer,
  selected,
  type = 'multiply',
}: {
  onAnswer: (answer: string) => void;
  selected: string;
  type?: 'single' | 'multiply';
}) => {
  const [wordsWithOrder, setWordsWithOrder] = useState(() => {
    // ['apple_1', 'orange_2', 'blueberry_3']
    return selected ? selected.split(' ') : [];
  });

  useEffect(() => {
    if (!wordsWithOrder.length) return;

    const words = wordsWithOrder
      .map((word) => word.split('_')[0])
      .join(' ')
      .trim();

    onAnswer(words);
  }, [onAnswer, wordsWithOrder]);

  const onWrite = useCallback(
    (word: string, order: number) => {
      const wordWithOrder = `${word}_${order}`;

      if (type === 'single') {
        setWordsWithOrder([wordWithOrder]);
      } else {
        setWordsWithOrder((prev) => [...prev, wordWithOrder]);
      }
    },
    [type]
  );

  const onErase = useCallback((wordWithOrder: string) => {
    setWordsWithOrder((prev) => prev.filter((item) => item !== wordWithOrder));
  }, []);

  return {
    disabledIndexes: wordsWithOrder.map(
      (wordWithOrder) => +wordWithOrder.split('_')[1]
    ),
    onErase,
    onWrite,
    words: wordsWithOrder,
  };
};
