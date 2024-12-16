'use client';

import { useEffect, useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { IoClose } from 'react-icons/io5';

import { signUp } from '@/db/api';
import { Button } from '@/components/ui/button';
import { routes } from '@/constants';

import { useAuthStore } from '../../hooks/use-auth';
import { LoginForm } from '../login-form';
import { SignUpForm } from '../signup-form';
import { type LoginSchema } from '../login-form/types';
import { type SingUpSchema } from '../signup-form/types';

export const AuthScreen = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const auth = useAuthStore();
  const isLogin = auth.type === 'login';
  const isNone = auth.type === 'none';

  useEffect(() => {
    if (isNone) return;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isNone]);

  const handleLogin = useCallback(
    ({ email, password }: LoginSchema) => {
      startTransition(() => {
        signIn('credentials', {
          redirect: false,
          email,
          password,
        })
          .then((data) => {
            if (data?.error) {
              toast.error('Invalid credentials');
              return;
            }

            router.replace(routes.learn);
          })
          .catch((error: unknown) => toast.error(JSON.stringify(error)));
      });
    },
    [router]
  );

  const handleSignUp = useCallback(
    (data: SingUpSchema) => {
      startTransition(() => {
        signUp(data)
          .then((payload) => {
            if (payload.error) toast.error(payload.error);
            if (payload.data) {
              toast.success(payload.data);
              auth.onLogin();
            }
          })
          .catch(() => toast.error('Something went wrong'));
      });
    },
    [auth]
  );

  if (isNone) return null;

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 z-10 bg-snow'>
      <header className='flex items-center justify-between p-4'>
        <button className='self-start' onClick={auth.onClose}>
          <IoClose className='text-shisha-coal' size={28} />
        </button>
        {isLogin ? (
          <Button onClick={auth.onSignUp} disabled={pending}>
            Sign up
          </Button>
        ) : (
          <Button onClick={auth.onLogin} disabled={pending}>
            Login
          </Button>
        )}
      </header>

      <div className='h-screen flex items-center justify-center p-5'>
        <div className='max-w-96 w-full'>
          <h2 className='mb-7 text-center text-2xl font-bold'>
            {isLogin ? 'Log in' : 'Create your profile'}
          </h2>

          {isLogin ? (
            <LoginForm onSubmit={handleLogin} loading={pending} />
          ) : (
            <SignUpForm onSubmit={handleSignUp} loading={pending} />
          )}

          <p className='mt-11 text-center text-smoke-screen'>
            By signing in to Duolingo, you agree to our
            <b> Terms</b> and
            <b> Privacy Policy</b>
          </p>
        </div>
      </div>
    </div>
  );
};
