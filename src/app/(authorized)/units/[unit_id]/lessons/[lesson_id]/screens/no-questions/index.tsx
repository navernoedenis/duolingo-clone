import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { routes } from '@/constants';

export const NoQuestionsScreen = () => {
  return (
    <section className='h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-5'>
        <Image
          width={300}
          height={150}
          src='/icons/owl/owl-crying.svg'
          alt='icon'
        />

        <h3 className='text-2xl text-center font-duo text-green-feather'>
          No questions yet. <br /> Try a bit later
        </h3>

        <Link href={routes.learn}>
          <Button className='w-full' size='lg'>
            Go back
          </Button>
        </Link>
      </div>
    </section>
  );
};
