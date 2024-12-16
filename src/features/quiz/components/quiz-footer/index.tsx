'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { FaCheck } from 'react-icons/fa6';
import { CgClose } from 'react-icons/cg';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type Status } from '../../types';

export const QuizFooter = ({
  answer,
  disabled = false,
  onCheck,
  status,
}: {
  answer: string;
  disabled?: boolean;
  onCheck: VoidFunction;
  status: Status;
}) => {
  const t = useTranslations('components.features.quiz');

  const isCheck = status === 'check';
  const isCorrect = status === 'correct';
  const isWrong = status === 'wrong';
  const isFinish = status === 'finish';

  const successMessages = useMemo(
    () => [
      t('corrects.amazing'),
      t('corrects.awesome'),
      t('corrects.excellent'),
      t('corrects.great'),
      t('corrects.great_job'),
      t('corrects.nice'),
      t('corrects.nice_job'),
      t('corrects.nicely_done'),
    ],
    [t]
  );

  const successMessage = useMemo(() => {
    const index = Math.floor(Math.random() * successMessages.length);
    return successMessages[index];
    // eslint-disable-next-line
  }, [answer]);

  return (
    <footer
      className={cn('border-t-2 border-t-mercury', {
        ['bg-green-mask/60 border-t-green-mask/10']: status === 'correct',
        ['bg-cardinal/20 border-t-cardinal/10']: status === 'wrong',
      })}
    >
      <div className='max-w-screen-wrapper mx-auto px-4 py-6 flex items-center justify-between gap-2'>
        <div className='flex items-center gap-3'>
          <div className='h-16 w-16 bg-snow rounded-full flex items-center justify-center'>
            {isCorrect && <FaCheck className='text-green-feather' size={32} />}
            {isWrong && <CgClose className='text-cardinal' size={32} />}
          </div>

          <div>
            {isCorrect && (
              <p className='text-green-feather text-xl font-bold capitalize'>
                {successMessage}!
              </p>
            )}

            {isWrong && (
              <>
                <p className='text-cardinal text-xl font-xl font-bold'>
                  {t('correct_solution')}:
                </p>
                <span className='text-sm text-cardinal font-semibold'>
                  {answer}
                </span>
              </>
            )}
          </div>
        </div>

        <Button
          onClick={onCheck}
          className='ml-auto capitalize'
          size='lg'
          variant='secondary'
          disabled={disabled}
        >
          {isCheck && t('buttons.check')}
          {isCorrect && t('buttons.continue')}
          {isWrong && t('buttons.continue')}
          {isFinish && t('buttons.complete')}
        </Button>
      </div>
    </footer>
  );
};
