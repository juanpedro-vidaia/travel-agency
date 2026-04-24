import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vidaia: {
          dark: '#1B4332',
          primary: '#2D6A4F',
          mid: '#52B788',
          light: '#D8F3DC',
          cream: '#F5EDD7',
          sand: '#FAF6EE',
          earth: '#C8A96E',
          brown: '#8B5A2B',
          charcoal: '#1C2B22',
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
