'use server';

import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/db';
import { getAuth } from '@/db/api';

export const getUserProgress = cache(async () => {
  const user = await getAuth();
  if (!user) return null;

  const userProgress = await db.query.userProgress.findFirst({
    where: eq(schema.userProgress.userId, user.id),
    with: {
      course: true,
    },
  });

  return userProgress ?? null;
});
