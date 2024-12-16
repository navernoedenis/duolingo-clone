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

import { type Answer } from '@/types/main';
import { answerSchema } from './schema';

export const AnswerForm = ({
  answer,
  buttonText,
  disabled = false,
  onSubmit,
}: {
  answer?: Partial<Answer>;
  buttonText: string;
  disabled?: boolean;
  onSubmit: (answer: Answer) => void;
}) => {
  const form = useForm<Answer>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      audio: answer?.audio ?? '',
      id: answer?.id ?? -1,
      image: answer?.image ?? '',
      questionId: answer?.questionId ?? -1,
      value: answer?.value ?? '',
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
          name='value'
          render={({ field: { value, ...otherProps } }) => (
            <FormItem>
              <FormLabel htmlFor='value'>Value</FormLabel>
              <FormControl>
                <Input
                  id='value'
                  {...otherProps}
                  value={value ?? ''}
                  placeholder='Your answer'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='audio'
          render={({ field: { value, ...otherProps } }) => (
            <FormItem>
              <FormLabel htmlFor='audio'>Audio (Optional)</FormLabel>
              <FormControl>
                <Input
                  id='audio'
                  {...otherProps}
                  value={value ?? ''}
                  placeholder='/path/to/file/audio.mp3'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='image'
          render={({ field: { value, ...otherProps } }) => (
            <FormItem>
              <FormLabel htmlFor='image'>Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  id='image'
                  {...otherProps}
                  value={value ?? ''}
                  placeholder='/path/to/file/image.jpeg'
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
