import { z } from 'zod';

export const lessonSchema = z.object({
  order: z.number(),
  unitId: z.number(),
});
