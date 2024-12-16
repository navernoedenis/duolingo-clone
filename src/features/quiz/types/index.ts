import { type QuestionWithAnswers } from '@/types/main';

export type Status = 'correct' | 'wrong' | 'check' | 'finish';

export type QuestionProps = {
  data: QuestionWithAnswers;
  onAnswer: (answer: string) => void;
  selected: string;
};
