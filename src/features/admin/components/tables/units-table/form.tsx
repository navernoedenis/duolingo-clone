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

import { type Unit } from '@/types/main';
import { unitSchema } from './schema';

export const UnitForm = ({
  buttonText,
  defaultOrder = -1,
  disabled = false,
  onSubmit,
  unit,
}: {
  buttonText: string;
  defaultOrder?: number;
  disabled?: boolean;
  onSubmit: (unit: Unit) => void;
  unit?: Partial<Unit>;
}) => {
  const form = useForm<Unit>({
    resolver: zodResolver(unitSchema),
    defaultValues: {
      courseId: unit?.courseId ?? -1,
      description: unit?.description ?? '',
      id: unit?.id ?? -1,
      order: unit?.order ?? defaultOrder,
      title: unit?.title ?? '',
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
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='language'>Title</FormLabel>
              <FormControl>
                <Input id='title' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field: { value, ...otherProps } }) => (
            <FormItem>
              <FormLabel htmlFor='description'>
                Description (Optional)
              </FormLabel>
              <FormControl>
                <Input id='description' value={value ?? ''} {...otherProps} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    const order = event.target.value;
                    if (order === '') return onChange(1);
                    onChange(parseInt(order));
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
