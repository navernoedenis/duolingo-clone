import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { answers } from './answers';
import { courses } from './courses';
import { lessons } from './lessons';

import { questionTypes } from '@/constants/questions';

// 'fill', [question, character?]
// 'listen', [audio]
// 'select', [title, character?]
// 'which', [title, image]
// 'write', [title, character, question-audio?]

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  type: text('type', { enum: questionTypes }).notNull(),
  order: integer('order').notNull(),
  title: text('title').notNull(),
  sentence: text('sentence'),
  answer: text('answer').notNull(),
  audio: text('audio'),
  character: text('character'),
  hard: boolean('hard').notNull().default(false),
  language: text('language')
    .notNull()
    .references(() => courses.language, {
      onDelete: 'cascade',
    }),
  lessonId: integer('lesson_id')
    .notNull()
    .references(() => lessons.id, {
      onDelete: 'cascade',
    }),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [questions.lessonId],
    references: [lessons.id],
  }),
  course: one(courses, {
    fields: [questions.language],
    references: [courses.language],
  }),
  answers: many(answers),
}));
