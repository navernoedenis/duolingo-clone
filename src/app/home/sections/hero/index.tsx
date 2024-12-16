'use client';

import Image from 'next/image';
import icon from './icon.svg';

import { useAuthStore } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Hero = ({ className }: { className?: string }) => {
  const auth = useAuthStore();

  return (
    <section className='bg-snow'>
      <div
        className={cn(
          'max-w-screen-wrapper mx-auto px-5 h-screen',
          'flex items-center justify-between gap-4',
          className
        )}
      >
        <Image height={360} width={360} src={icon} alt='earth' priority />

        <div className='max-w-[535px] flex flex-col items-center gap-8'>
          <h1 className='text-eel font-bold text-center text-4xl'>
            The free, fun, and effective way to learn a language!
          </h1>
          <div className='flex flex-col gap-3 max-w-[320px] w-full'>
            <Button className='w-full' onClick={auth.onSignUp}>
              Get started
            </Button>

            <Button className='w-full' onClick={auth.onLogin} variant='outline'>
              I already have an account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
