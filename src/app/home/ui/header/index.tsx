'use client';

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/features/auth';
import { throttle } from '@/lib/performance';
import { cn } from '@/lib/utils';

export const Header = () => {
  const auth = useAuthStore();

  const [showBorder, setShowBorder] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const listener = throttle(() => {
      setShowBorder(window.scrollY > 1);
      setShowButton(window.scrollY > 414);
    });
    listener(); // if user refresh page on bottom content

    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <header
      className={cn(
        'fixed left-0 top-0 right-0 bg-snow border-b-2 border-transparent',
        'transition duration-500 ease-in-out',
        showBorder && 'border-b-inherit'
      )}
    >
      <div className='max-w-screen-wrapper mx-auto px-5 py-4 flex items-center justify-between'>
        <h3 className='font-duo text-3xl text-green-feather'>duolingo</h3>
        <Button
          className={cn(
            'transition-opacity duration-100',
            showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          onClick={auth.onLogin}
        >
          Get started
        </Button>
      </div>
    </header>
  );
};
