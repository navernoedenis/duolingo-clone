import { z } from 'zod';

export const answerSchema = z.object({
  id: z.number().optional(),
  value: z.string().trim().min(1),
  image: z.string().optional(),
  audio: z.string().optional(),
  questionId: z.number(),
});
