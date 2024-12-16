import * as schema from '@/db/schema';

export type Language = 'en' | 'ua';

export type User = typeof schema.users.$inferSelect;
export type UserRole = User['role'];

export type Answer = typeof schema.answers.$inferSelect;
export type CreateaAnswer = typeof schema.answers.$inferInsert;

export type Course = typeof schema.courses.$inferSelect;
export type CreateCourse = typeof schema.courses.$inferInsert;

export type Lesson = typeof schema.lessons.$inferSelect;
export type CreateLesson = typeof schema.lessons.$inferInsert;

export type Unit = typeof schema.units.$inferSelect;
export type CreateUnit = typeof schema.units.$inferInsert;

export type Question = typeof schema.questions.$inferSelect;
export type CreateQuestion = typeof schema.questions.$inferInsert;
export type QuestionType = Question['type'];

export type LessonProgress = typeof schema.lessonProgress.$inferSelect;
export type QuestionProgress = typeof schema.questionProgress.$inferSelect;
export type UserProgress = typeof schema.userProgress.$inferSelect;

export type UnitWithLessons = Unit & {
  lessons: LessonWithStatus[];
};

export type LessonWithStatus = Lesson & {
  available: boolean;
  complete: boolean;
};

export type LessonStepProgress = {
  lessonId: number;
  step: number;
  stepsCount: number;
};

export type QuestionWithAnswers = Question & {
  answers: Answer[];
};

export type QuestionOptionalField = keyof Pick<
  Question,
  'audio' | 'character' | 'sentence'
>;

export type LeaderboardItem = {
  userId: number;
  points: number;
  name: string;
  image: string | null;
};
