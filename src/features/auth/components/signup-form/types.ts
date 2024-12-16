import { z } from 'zod';
import { signUpSchema } from './schema';

export type SingUpSchema = z.infer<typeof signUpSchema>;
