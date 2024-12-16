import { z } from 'zod';

export const unitSchema = z.object({
  id: z.number().optional(),
  courseId: z.number(),
  title: z.string().trim().min(2).max(40),
  description: z.string().optional(),
  order: z.number().positive(),
});
