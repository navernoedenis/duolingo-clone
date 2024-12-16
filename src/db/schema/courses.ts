import { relations } from 'drizzle-orm';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { units } from './units';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  icon: text('icon').notNull(),
  language: text('language').notNull().unique(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  units: many(units),
}));
