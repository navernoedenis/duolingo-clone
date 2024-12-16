'use client';

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

import { type Lesson } from '@/types/main';
import { lessonSchema } from './schema';

export const LessonForm = ({
  buttonText,
  defaultOrder = -1,
  disabled = false,
  lesson,
  onSubmit,
}: {
  buttonText: string;
  defaultOrder?: number;
  disabled?: boolean;
  lesson?: Partial<Lesson>;
  onSubmit: (lesson: Lesson) => void;
}) => {
  const form = useForm<Lesson>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      id: lesson?.id ?? -1,
      order: lesson?.order ?? defaultOrder,
      unitId: lesson?.unitId ?? -1,
    },
  });

  return (
    <Form {...form}>
      <form
        className='flex flex-col grow gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='order'
          render={({ field: { onChange, ...otherProps } }) => (
            <FormItem>
              <FormLabel htmlFor='order'>Order</FormLabel>
              <FormControl>
                <Input
                  id='order'
                  min={1}
                  type='number'
                  onChange={(event) => {
                    const value = event.target.value;
                    if (value === '') return onChange(1);
                    const order = parseInt(value);
                    onChange(order);
                  }}
                  {...otherProps}
                />
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
