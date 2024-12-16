import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { passwords } from './passwords';
import { userProgress } from './progress';

const roleEnum = ['user', 'admin', 'root'] as const;

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image'),
  age: integer('age').notNull(),
  role: text('role', { enum: roleEnum }).notNull().default('user'),
  locale: varchar('locale', { length: 5 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  password: one(passwords, {
    fields: [users.id],
    references: [passwords.userId],
  }),
  progress: one(userProgress, {
    fields: [users.id],
    references: [userProgress.userId],
  }),
}));
