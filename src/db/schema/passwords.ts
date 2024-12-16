import { relations } from 'drizzle-orm';
import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { users } from './users';

export const passwords = pgTable('passwords', {
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .primaryKey(),
  hash: text('hash').notNull(),
});

export const passwordsRelations = relations(passwords, ({ one }) => ({
  user: one(users, {
    fields: [passwords.userId],
    references: [users.id],
  }),
}));
