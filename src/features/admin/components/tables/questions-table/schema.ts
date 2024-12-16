import { z } from 'zod';
import { questionTypes } from '@/constants';

export const questionSchema = z.object({
  answer: z.string().trim().min(1),
  audio: z.string().optional(),
  character: z.string().optional(),
  hard: z.boolean(),
  id: z.number().optional(),
  language: z.string().trim().min(1, {
    message: 'You have to select a language',
  }),
  lessonId: z.number(),
  order: z.number(),
  sentence: z.string(),
  title: z.string().trim().min(1),
  type: z.enum(questionTypes),
});
