import { z } from 'zod';
import { locales } from '@/constants';

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(40),
  locale: z.enum(locales),
  name: z
    .string({ message: 'Name is required' })
    .min(2, { message: 'The name must contain at least 2 characters' })
    .max(20, { message: 'The maximum length of the name is 20 characters' }),

  age: z.string().superRefine((value, ctx) => {
    const age = parseInt(value);

    let error = '';

    if (!age) error = 'Please, add your age';
    if (age < 6) error = 'Minimum age is 6';
    if (age > 99) error = 'Maximum age is 99';

    if (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: error,
      });
    }
  }),
});
