import { db } from './';
import * as schema from './schema';
import { createHash } from '../lib/hash';
import { defaultQuestionsRecord } from '../constants';

const seedData = async () => {
  try {
    console.log('Deleting previous data ⚡⚡⚡');

    await db.delete(schema.answers);
    await db.delete(schema.questions);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.courses);

    await db.delete(schema.questionProgress);
    await db.delete(schema.lessonProgress);
    await db.delete(schema.userProgress);

    await db.delete(schema.accounts);
    await db.delete(schema.users);

    console.log('Seeding data 🌱🌱🌱');

    await db.transaction(async (ctx) => {
      const [user] = await ctx
        .insert(schema.users)
        .values({
          age: 31,
          email: 'denis@gmail.com',
          name: 'denis',
          locale: 'ua',
          role: 'root',
        })
        .returning();

      const hash = await createHash('12345678');
      await ctx.insert(schema.passwords).values({
        userId: user.id,
        hash,
      });

      const [en, ua] = await ctx
        .insert(schema.courses)
        .values([
          { language: 'en', icon: '/icons/flags/eng.svg' },
          { language: 'ua', icon: '/icons/flags/ua.svg' },
        ])
        .returning();

      const [basic, intermediate] = await ctx
        .insert(schema.units)
        .values([
          {
            order: 1,
            title: 'basic',
            description: 'Прості теми',
            courseId: en.id,
          },
          {
            order: 2,
            title: 'intermediate',
            description: 'Повсякденні теми',
            courseId: en.id,
          },
          {
            order: 3,
            title: 'advance',
            description: 'Продвинуті теми',
            courseId: en.id,
          },
        ])
        .returning();

      const [basic_l1, basic_l2] = await ctx
        .insert(schema.lessons)
        .values([1, 2].map((order) => ({ order, unitId: basic.id })))
        .returning();

      //
      //
      // BASIC. LESSON 1
      // BASIC. LESSON 1
      // BASIC. LESSON 1
      //
      //

      const [basic_l1_q1] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: basic_l1.id,
            order: 1,
            type: 'which',
            title: 'Що з цього є "яблуком" ?',
            answer: 'apple',
            hard: false,
            language: ua.language,
          },
        ])
        .returning();

      await ctx.insert(schema.answers).values([
        {
          questionId: basic_l1_q1.id,
          audio: `/locales/en/ua/u1/l1/q1/girl.mp3`,
          image: `/locales/en/ua/u1/l1/q1/girl.svg`,
          value: 'girl',
        },
        {
          questionId: basic_l1_q1.id,
          audio: `/locales/en/ua/u1/l1/q1/apple.mp3`,
          image: `/locales/en/ua/u1/l1/q1/apple.svg`,
          value: 'apple',
        },
        {
          questionId: basic_l1_q1.id,
          audio: `/locales/en/ua/u1/l1/q1/boy.mp3`,
          image: `/locales/en/ua/u1/l1/q1/boy.svg`,
          value: 'boy',
        },
      ]);

      const [basic_l1_q2] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: basic_l1.id,
            order: 2,
            type: 'write',
            title: defaultQuestionsRecord.en.write,
            answer: 'my name is Anna',
            sentence: 'Мене звати Анна',
            audio: `/locales/en/ua/u1/l1/q2/my-name-is-anna.mp3`,
            character: '/icons/characters/girl-teenager.svg',
            hard: false,
            language: ua.language,
          },
        ])
        .returning();

      await ctx
        .insert(schema.answers)
        .values(
          ['Anna', 'he', 'surname', 'is', 'name', 'Olga', 'my', 'you'].map(
            (value) => ({ value, questionId: basic_l1_q2.id })
          )
        );

      const [basic_l1_q3] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: basic_l1.id,
            order: 3,
            type: 'listen',
            title: defaultQuestionsRecord.en.listen,
            answer: 'I love English so much',
            sentence: 'я люблю англійську дуже сильно',
            audio: `/locales/en/ua/u1/l1/q3/i-love-english-so-much.mp3`,
            hard: false,
            language: ua.language,
          },
        ])
        .returning();

      await ctx
        .insert(schema.answers)
        .values(
          ['English', 'me', 'so', 'like', 'love', 'I', 'ukranian', 'much'].map(
            (value) => ({ value, questionId: basic_l1_q3.id })
          )
        );

      const [basic_l1_q4] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: basic_l1.id,
            order: 4,
            type: 'select',
            title: defaultQuestionsRecord.en.select,
            sentence: 'Так',
            answer: 'yes',
            character: '/icons/characters/girl-indian.svg',
            hard: false,
            language: ua.language,
          },
        ])
        .returning();

      await ctx.insert(schema.answers).values([
        {
          audio: `/locales/en/ua/u1/l1/q4/please.mp3`,
          value: 'please',
          questionId: basic_l1_q4.id,
        },
        {
          audio: `/locales/en/ua/u1/l1/q4/yes.mp3`,
          value: 'yes',
          questionId: basic_l1_q4.id,
        },
        {
          audio: `/locales/en/ua/u1/l1/q4/coffee.mp3`,
          value: 'coffee',
          questionId: basic_l1_q4.id,
        },
      ]);

      const [basic_l1_q5] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: basic_l1.id,
            order: 5,
            type: 'fill',
            title: defaultQuestionsRecord.en.fill,
            answer: 'man',
            sentence: 'I see a tall _ around',
            character: '/icons/characters/man-mexican.svg',
            hard: false,
            language: ua.language,
          },
        ])
        .returning();

      await ctx.insert(schema.answers).values(
        ['dog', 'house', 'man', 'tree', 'woman'].map((value) => ({
          value,
          questionId: basic_l1_q5.id,
        }))
      );

      const [basic_l1_q6] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: basic_l1.id,
            order: 6,
            type: 'write',
            title: defaultQuestionsRecord.en.write,
            answer: 'hi my name is Andrew what is yours',
            sentence: 'Привіт, мене звати Ендрю, а тебе як?',
            character: '/icons/characters/man-sport.svg',
            audio: `/locales/en/ua/u1/l1/q6/hi-my-name-is-andrew-what-is-yours.mp3`,
            hard: true,
            language: ua.language,
          },
        ])
        .returning();

      await ctx.insert(schema.answers).values(
        [
          'good',
          'name',
          'where',
          'my',
          'is',
          'Andrew',
          'yours',
          'hello',
          'is',
          'what',
          'hi',
        ].map((value) => ({
          value,
          questionId: basic_l1_q6.id,
        }))
      );

      //
      //
      // BASIC. LESSON 2
      // BASIC. LESSON 2
      // BASIC. LESSON 2
      //
      //

      const [basic_l2_q1] = await ctx
        .insert(schema.questions)
        .values({
          lessonId: basic_l2.id,
          order: 1,
          type: 'select',
          title: defaultQuestionsRecord.en.select,
          sentence: 'червона машина',
          answer: 'red car',
          character: '/icons/characters/kid-running.svg',
          hard: false,
          language: ua.language,
        })
        .returning();

      await ctx.insert(schema.answers).values(
        [
          'blue motorbike',
          'green grass',
          'pink convertible',
          'red car',
          'yellow sun',
        ].map((value) => ({
          value,
          questionId: basic_l2_q1.id,
        }))
      );

      const [basic_l2_q2] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: basic_l2.id,
            order: 2,
            type: 'fill',
            title: defaultQuestionsRecord.en.fill,
            answer: 'black',
            sentence: 'My hair color is _',
            character: '/icons/characters/lady-afroamerican.svg',
            hard: false,
            language: ua.language,
          },
        ])
        .returning();

      await ctx.insert(schema.answers).values(
        [
          'pink',
          'red',
          'yellow',
          'orange',
          'green',
          'black',
          'white',
          'purple',
        ].map((value) => ({
          value,
          questionId: basic_l2_q2.id,
        }))
      );

      //
      //
      // INTERMEDIATE. LESSON 1
      //
      //

      const [intermediate_l1] = await ctx
        .insert(schema.lessons)
        .values(
          [1, 2].map((order) => ({
            order,
            unitId: intermediate.id,
          }))
        )
        .returning();

      const [intermediate_l1_q1] = await ctx
        .insert(schema.questions)
        .values([
          {
            lessonId: intermediate_l1.id,
            order: 1,
            type: 'write',
            title: defaultQuestionsRecord.en.write,
            answer: 'you can add more exercises gradually',
            sentence: 'ви можете додавати більше вправ поступово',
            audio: `/locales/en/ua/u2/l1/q1/you-can-add-more-exercises-gradually.mp3`,
            character: '/icons/characters/girl-teenager.svg',
            hard: false,
            language: ua.language,
          },
        ])
        .returning();

      await ctx.insert(schema.answers).values(
        [
          'can',
          'could',
          'gradually',
          'my',
          'mine',
          'buy',
          'more',
          'exercises',
          'you',
          'add',
          'move',
          'jump',
        ].map((value) => ({
          value,
          questionId: intermediate_l1_q1.id,
        }))
      );
    });
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  } finally {
    console.log('Seeding is done ✅');
    process.exit(0);
  }
};

seedData();
