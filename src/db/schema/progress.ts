import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial } from 'drizzle-orm/pg-core';

import { courses } from './courses';
import { lessons } from './lessons';
import { questions } from './questions';
import { users } from './users';

export const userProgress = pgTable('user_progress', {
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .primaryKey(),
  courseId: integer('course_id')
    .notNull()
    .references(() => courses.id, {
      onDelete: 'cascade',
    }),
  hearts: integer('hearts').notNull().default(5),
  points: integer('points').notNull().default(50),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [userProgress.courseId],
    references: [courses.id],
  }),
}));

export const lessonProgress = pgTable('lesson_progress', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id')
    .notNull()
    .references(() => lessons.id, {
      onDelete: 'cascade',
    }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  available: boolean('available').notNull().default(false),
  complete: boolean('complete').notNull().default(false),
});

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonProgress.id],
    references: [lessons.id],
  }),
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
}));

export const questionProgress = pgTable('question_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  lessonId: integer('lesson_id')
    .notNull()
    .references(() => lessons.id, {
      onDelete: 'cascade',
    }),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id, {
      onDelete: 'cascade',
    }),
  complete: boolean('complete').notNull().default(false),
  isCorrectAnswer: boolean('is_correct_answer').notNull().default(false),
});

export const questionsProgressRelations = relations(
  questionProgress,
  ({ one }) => ({
    user: one(users, {
      fields: [questionProgress.userId],
      references: [users.id],
    }),
    question: one(questions, {
      fields: [questionProgress.questionId],
      references: [questions.id],
    }),
    lesson: one(lessons, {
      fields: [questionProgress.lessonId],
      references: [lessons.id],
    }),
  })
);
