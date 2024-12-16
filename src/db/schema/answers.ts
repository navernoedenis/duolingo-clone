import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { questions } from './questions';

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(),
  image: text('image'),
  audio: text('audio'),
  value: text('value').notNull(),
  questionId: integer('question_id')
    .notNull()
    .references(() => questions.id, {
      onDelete: 'cascade',
    }),
});

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));
