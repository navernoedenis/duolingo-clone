import { relations } from 'drizzle-orm';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core';

import { questions } from './questions';
import { units } from './units';

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  order: integer('order').notNull(),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, {
      onDelete: 'cascade',
    }),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  questions: many(questions),
}));
