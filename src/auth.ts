import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import postgres from 'postgres';

import * as schema from '@/db/schema';
import { loginSchema } from '@/features/auth';
import { verifyHash } from '@/lib/hash';

const pool = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle(pool, {
  schema,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      authorize: async (credentials: unknown) => {
        const { error, data } = await loginSchema.safeParseAsync(credentials);
        if (error) return null;

        const user = await db.query.users.findFirst({
          where: eq(schema.users.email, data.email),
          with: {
            password: true,
          },
        });
        if (!user) return null;

        const isValidPassword = await verifyHash(
          user.password.hash,
          data.password
        );
        if (!isValidPassword) return null;

        return {
          id: user.id + '',
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signOut: '/',
  },
});
