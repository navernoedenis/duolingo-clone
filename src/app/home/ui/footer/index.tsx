'use client';

import { useAuthStore } from '@/features/auth';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  const auth = useAuthStore();

  return (
    <footer className='bg-green-feather'>
      <div className='max-w-screen-wrapper mx-auto px-5 py-10'>
        <div className='flex items-center justify-center gap-8'>
          <h3 className='text-snow font-bold text-center text-3xl'>
            Learn a language with Duolingo.
          </h3>

          <Button onClick={auth.onLogin}>Get started</Button>
        </div>
      </div>
    </footer>
  );
};
