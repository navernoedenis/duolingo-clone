import { type QuestionType, type Language } from '@/types/main';

export const questionTypes = [
  'fill',
  'listen',
  'select',
  'which',
  'write',
] as const;

type QuestionVariants = Record<QuestionType, string>;

export const defaultQuestionsRecord: Record<Language, QuestionVariants> = {
  en: {
    fill: 'Fill in the blank',
    listen: 'Tap what you hear',
    select: 'Choose the right translation',
    which: 'Which one of these is " "?',
    write: 'Write this in English',
  },
  ua: {
    fill: 'Заповніть пропуски',
    listen: 'Натисніть те, що ви чуєте',
    select: 'Виберіть правильний переклад',
    which: 'Що з цього є " "?',
    write: 'Напишіть це англійською',
  },
};
