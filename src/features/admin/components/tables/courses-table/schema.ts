import { z } from 'zod';

export const courseSchema = z.object({
  id: z.number().optional(),
  language: z
    .string()
    .trim()
    .min(1, { message: "language can't be empty" })
    .max(30),
  icon: z.string().min(10, { message: "icon can't be empty" }),
});
