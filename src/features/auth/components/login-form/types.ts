import { z } from 'zod';
import { loginSchema } from './schema';

export type LoginSchema = z.infer<typeof loginSchema>;
