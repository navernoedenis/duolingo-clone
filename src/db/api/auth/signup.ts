'use server';

import { eq } from 'drizzle-orm';

import { db, schema } from '@/db';
import { type SingUpSchema } from '@/features/auth/components/signup-form/types';
import { createHash } from '@/lib/hash';
import { locales } from '@/constants';

export const signUp = async (payload: SingUpSchema) => {
  try {
    const { age, email, name, locale, password } = payload;

    const user = await db.query.users.findFirst({
      where: eq(schema.users.email, email),
    });

    if (user) {
      return { error: 'This email is already taken' };
    }

    const isCorrectLocale = locales.includes(locale);
    if (!isCorrectLocale) {
      return { error: 'This language is not acceptable' };
    }

    await db.transaction(async (tx) => {
      const [user] = await tx
        .insert(schema.users)
        .values({
          age: parseInt(age),
          email,
          locale,
          name,
        })
        .returning();

      const hash = await createHash(password);
      await tx.insert(schema.passwords).values({
        userId: user.id,
        hash,
      });

      // FIRST USER IS ROOT BY DEFAULT
      if (user.id === 1) {
        await tx
          .update(schema.users)
          .set({ role: 'root' })
          .where(eq(schema.users.id, 1));
      }
    });

    return { data: 'Successfully registered' };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: 'Something went wrong' };
  }
};
