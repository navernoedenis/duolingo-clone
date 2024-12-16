'use server';

import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/db';
import { auth } from '@/auth';

export const getAuth = cache(async () => {
  const session = await auth();
  if (!session || !session.user?.email) return null;

  const user = await db.query.users.findFirst({
    where: eq(schema.users.email, session.user.email),
  });

  return user ?? null;
});
