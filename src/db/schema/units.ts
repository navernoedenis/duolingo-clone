import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { courses } from './courses';
import { lessons } from './lessons';

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  order: integer('order').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  courseId: integer('course_id')
    .notNull()
    .references(() => courses.id, {
      onDelete: 'cascade',
    }),
});

export const unitsRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));
