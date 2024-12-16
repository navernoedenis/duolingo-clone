'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Confetti from 'react-confetti';

import { updateLessonProgress, updateQuestionProgress } from '@/db/api';
import { routes } from '@/constants';

import {
  type QuestionWithAnswers,
  type QuestionProgress,
  type LessonProgress,
} from '@/types/main';

import { HeartsLimit } from './heart-limit';
import { QuizQuestion } from './quiz-question';
import { QuizFooter } from './quiz-footer';
import { QuizHeader } from './quiz-header';
import { useSounds } from './../hooks';

import { type Status } from './../types';

export const Quiz = ({
  hearts,
  lessonProgress,
  lessonStep,
  questions,
  questionsProgress,
  unitId,
}: {
  hearts: number;
  lessonProgress: LessonProgress;
  lessonStep: number;
  questions: QuestionWithAnswers[];
  questionsProgress: QuestionProgress[];
  unitId: number;
}) => {
  const router = useRouter();
  const sounds = useSounds();

  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>('check');
  const [step, setStep] = useState(() => lessonStep);
  const [answer, setAnswer] = useState('');

  const progress = (step / (questions.length - 1)) * 100;
  const question = questions[step];
  const questionProgress = questionsProgress[step];

  const hoHearts = hearts === 0;
  const isCheck = status === 'check';
  const isLastStep = step === questions.length - 1;
  const isFinish = status === 'finish';

  const handleCheck = () => {
    if (isFinish) {
      router.push(routes.learn);
      return;
    }

    if (!isCheck && isLastStep) {
      sounds.play.finish();
      setStatus('finish');
      if (lessonProgress.complete) return;

      startTransition(async () => {
        await updateLessonProgress(unitId, lessonProgress.id);
      });

      return;
    }

    if (!isCheck) {
      setStatus('check');
      setStep((prevStep) => prevStep + 1);
      setAnswer('');
      return;
    }

    const isCorrect = question.answer.toLowerCase() === answer.toLowerCase();

    if (isCorrect) {
      setStatus('correct');
      sounds.play.correct();
    } else {
      setStatus('wrong');
      sounds.play.wrong();
    }

    startTransition(async () => {
      if (!questionProgress.complete) {
        await updateQuestionProgress(question.id, isCorrect);
      }
    });
  };

  return (
    <>
      {sounds.audio.correct}
      {sounds.audio.finish}
      {sounds.audio.wrong}

      {isFinish && <Confetti numberOfPieces={140} gravity={0.08} />}

      <HeartsLimit open={hoHearts} />

      <QuizHeader hearts={hearts} progress={progress} />
      <QuizQuestion data={question} onAnswer={setAnswer} selected={answer} />
      <QuizFooter
        answer={question.answer}
        disabled={!answer || pending || hoHearts}
        onCheck={handleCheck}
        status={status}
      />
    </>
  );
};
