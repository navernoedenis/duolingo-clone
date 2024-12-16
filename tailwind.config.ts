import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        duo: ['var(--font-duo)'],
      },
      screens: {
        wrapper: '1105px', // left right = 20px
      },
      colors: {
        'dr-white': '#fafafa',
        'green-feather': '#58cc02',
        'green-mask': '#89e219',
        'lucky-grey': '#777777',
        'shisha-coal': '#3c3c3c',
        'smoke-screen': '#afafaf',
        'tranquil-pool': '#84d8ff',
        'winter-day': '#ddf4ff',
        bee: '#ffc800',
        beetle: '#ce82ff',
        cardinal: '#ff4b4b',
        eel: '#4b4b4b',
        fox: '#ff9600',
        humpback: '#2b70c9',
        macaw: '#1cb0f6',
        mercury: '#ebebeb',
        snow: '#ffffff',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
