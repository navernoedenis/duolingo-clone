import { redirect } from 'next/navigation';
import {
  getLastLessonStepProgress,
  getUnitsProgress,
  getUserProgress,
} from '@/db/api';

import { GridCard } from '@/components/layouts';
import { UserProgress } from '@/components/ui/user-progress';
import { routes } from '@/constants';

import { UnitHeader } from './ui/unit-header';
import { UnitLessons } from './ui/unit-lessons';

export default async function LearnPage() {
  const [userProgress, unitsProgress, lessonStepProgress] = await Promise.all([
    getUserProgress(),
    getUnitsProgress(),
    getLastLessonStepProgress(),
  ]);

  if (!userProgress || !lessonStepProgress) {
    redirect(routes.courses);
  }

  return (
    <GridCard
      aside={
        <UserProgress
          hearts={userProgress.hearts}
          languageImage={userProgress.course.icon}
          points={userProgress.points}
        />
      }
    >
      <div className='flex flex-col gap-6'>
        {unitsProgress.map((item) => (
          <section key={item.id}>
            <UnitHeader
              description={item.description}
              order={item.order}
              title={item.title}
            />

            <UnitLessons
              lessons={item.lessons}
              lessonStepProgress={lessonStepProgress}
            />
          </section>
        ))}
      </div>
    </GridCard>
  );
}
