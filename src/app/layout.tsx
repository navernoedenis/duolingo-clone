import { type Metadata } from 'next';
import { type ReactNode } from 'react';

import { Nunito } from 'next/font/google';
import localFont from 'next/font/local';

import { ConfirmationProvider } from '@/features/confirmation';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

export const metadata: Metadata = {
  title: 'Duolingo',
  description: "The world's best way to learn a language",
};

const nunito = Nunito({
  subsets: ['latin'],
});

const duo = localFont({
  src: '../assets/fonts/feather-bold.woff2',
  variable: '--font-duo',
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body className={`${duo.variable} ${nunito.className}`}>
        <ConfirmationProvider>
          {children}
          <Toaster />
        </ConfirmationProvider>
      </body>
    </html>
  );
}
