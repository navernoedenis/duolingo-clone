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

import { locales } from '@/constants';

import { signUpSchema } from './schema';
import { type SingUpSchema } from './types';

export const SignUpForm = ({
  onSubmit,
  loading = false,
}: {
  onSubmit: (data: SingUpSchema) => void;
  loading?: boolean;
}) => {
  const form = useForm<SingUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      age: '',
      name: '',
      locale: 'en',
    },
  });

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='locale'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='locale'>Your native language</FormLabel>
              <FormControl id='locale'>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='EN' />
                  </SelectTrigger>

                  <SelectContent>
                    {locales.map((locale) => (
                      <SelectItem
                        className='uppercase'
                        key={locale}
                        value={locale}
                      >
                        {locale}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='email' placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='Password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='age'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  onChange={(event) => {
                    const value = event.target.value;
                    const age = parseInt(value);
                    field.onChange(age ? `${age}` : '');
                  }}
                  placeholder='Age'
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full' disabled={loading}>
          Create account
        </Button>
      </form>
    </Form>
  );
};
