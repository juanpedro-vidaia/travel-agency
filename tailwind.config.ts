import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

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
          dark: '#1a4a52',     // teal muy oscuro — fondos oscuros, headings
          primary: '#5ea6ae',  // teal corporativo principal — CTAs, precios, estados activos
          mid: '#70cad4',      // teal claro — acentos secundarios
          light: '#c0e8ec',    // teal muy claro — bordes, chips
          cream: '#faf3f6',    // rosa muy claro — fondos alternativos de sección
          sand: '#f0f8f9',     // teal muy claro — fondo acordeón y secciones suaves
          earth: '#c891a6',    // malva — CTAs secundarios, acentos cálidos
          brown: '#c36689',    // rosa intenso — hover sobre earth
          charcoal: '#1c2e32', // casi negro con tono teal — texto de cuerpo
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      typography: (theme: (path: string) => string) => ({
        vidaia: {
          css: {
            '--tw-prose-body': theme('colors.vidaia.charcoal'),
            '--tw-prose-headings': theme('colors.vidaia.dark'),
            '--tw-prose-links': theme('colors.vidaia.primary'),
            '--tw-prose-bold': theme('colors.vidaia.dark'),
            '--tw-prose-counters': theme('colors.vidaia.primary'),
            '--tw-prose-bullets': theme('colors.vidaia.primary'),
            '--tw-prose-hr': theme('colors.vidaia.light'),
            '--tw-prose-quotes': theme('colors.vidaia.dark'),
            '--tw-prose-quote-borders': theme('colors.vidaia.primary'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.vidaia.dark'),
            '--tw-prose-pre-code': theme('colors.vidaia.light'),
            '--tw-prose-pre-bg': theme('colors.vidaia.dark'),
            '--tw-prose-th-borders': theme('colors.vidaia.light'),
            '--tw-prose-td-borders': theme('colors.vidaia.light'),
            'h2': { fontFamily: 'var(--font-playfair), Georgia, serif' },
            'h3': { fontFamily: 'var(--font-playfair), Georgia, serif' },
            'h4': { fontFamily: 'var(--font-playfair), Georgia, serif' },
            'a': { textDecoration: 'underline', textUnderlineOffset: '2px' },
            'a:hover': { color: theme('colors.vidaia.mid') },
            'blockquote': {
              borderLeftColor: theme('colors.vidaia.primary'),
              backgroundColor: theme('colors.vidaia.sand'),
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '0.75rem 1.25rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
