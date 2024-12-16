'use client';

import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { flags } from '@/constants';
import { type Course } from '@/types/main';
import { courseSchema } from './schema';

export const CourseForm = ({
  buttonText,
  course,
  disabled = false,
  onSubmit,
}: {
  buttonText: string;
  course?: Course;
  disabled?: boolean;
  onSubmit: (updated: Course) => void;
}) => {
  const form = useForm<Course>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      id: course?.id ?? -1,
      language: course?.language ?? '',
      icon: course?.icon ?? flags[0],
    },
  });

  const handleReset = useCallback(() => {
    if (!course) return;
    Object.keys(course).forEach((item) => {
      const key = item as keyof Course;
      form.setValue(key, course[key]);
    });
  }, [form, course]);

  useEffect(() => handleReset(), [course, handleReset]);

  return (
    <Form {...form}>
      <form
        className='flex flex-col grow gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='language'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='language'>Language</FormLabel>
              <FormControl>
                <Input id='language' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='icon'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='icon'>Icon</FormLabel>
              <FormControl id='icon'>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Icon' />
                  </SelectTrigger>

                  <SelectContent>
                    {flags.map((flag) => (
                      <SelectItem value={flag} key={flag}>
                        <Image src={flag} height={18.5} width={24} alt='logo' />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex gap-2'>
          <Button className='w-full' type='submit' disabled={disabled}>
            {buttonText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
