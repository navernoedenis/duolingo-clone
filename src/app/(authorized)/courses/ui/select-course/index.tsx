'use client';

import { useState, useCallback, useTransition } from 'react';
import { toast } from 'sonner';
import { FaArrowRightLong } from 'react-icons/fa6';

import { selectCourse } from '@/db/api';
import { Button } from '@/components/ui/button';
import { type Course } from '@/types/main';

import { CourseCard } from '../course-card';

export const SelectCourse = ({ courses }: { courses: Course[] }) => {
  const [pending, startTransition] = useTransition();
  const [language, setLanguage] = useState('');

  const onClick = useCallback((language: string) => {
    startTransition(() => {
      selectCourse(language).then((res) => {
        if (res.error) toast.error(res.error);
      });
    });
  }, []);

  return (
    <>
      <div className='flex gap-4 justify-center items-center flex-wrap w-full'>
        {courses.map((course) => (
          <CourseCard
            icon={course.icon}
            isActive={course.language === language}
            key={course.id}
            language={course.language}
            onClick={() => setLanguage(course.language)}
          />
        ))}
      </div>

      <div className='h-[40px] flex gap-2'>
        {language.trim().length > 0 && (
          <Button
            disabled={pending}
            onClick={() => onClick(language)}
            size='lg'
            variant='outline'
          >
            <FaArrowRightLong className='text-green-feather' />
          </Button>
        )}
      </div>
    </>
  );
};
