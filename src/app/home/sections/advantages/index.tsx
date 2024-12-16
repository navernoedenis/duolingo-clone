import Image from 'next/image';
import laptop from './laptop.svg';

import { Card } from './card';

export const Advantages = () => {
  return (
    <div className='px-16 py-10'>
      <h4 className='mb-6 text-2xl font-bold text-shisha-coal text-center'>
        Why you’ll love learning with Duolingo
      </h4>

      <div className='flex items-center justify-between gap-5'>
        <div>
          <Card
            image='/icons/flame.svg'
            title='Effective and efficient'
            description={
              'Our courses effectively and efficiently teach reading, ' +
              'listening, and speaking skills. Check out our latest research!'
            }
          />
          <Card
            image='/icons/check.svg'
            title='Personalized learning'
            description={
              'Combining the best of AI and language science, lessons are ' +
              'tailored to help you learn at just the right level and pace.'
            }
          />
        </div>

        <Image
          className='shrink-0'
          height={161}
          width={245}
          src={laptop}
          alt='laptop'
        />

        <div>
          <Card
            image='/icons/shield.svg'
            title='Stay motivated'
            description={
              'We make it easy to form a habit of language learning, ' +
              'with game-like features, fun challenges, and reminders ' +
              'from our friendly mascot, Duo the owl.'
            }
          />
          <Card
            image='/icons/woman.svg'
            title='Have fun with it!'
            description={
              'Effective learning doesn’t have to be boring! ' +
              'Build your skills each day with engaging exercises ' +
              'and playful characters.'
            }
          />
        </div>
      </div>
    </div>
  );
};
