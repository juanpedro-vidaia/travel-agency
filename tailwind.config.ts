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
          primary: '#2f7d85',  // teal corporativo principal — CTAs, precios, estados activos (AA: blanco 4.78:1)
          mid: '#70cad4',      // teal claro — acentos secundarios / fondos
          light: '#c0e8ec',    // teal muy claro — bordes, chips
          cream: '#faf3f6',    // rosa muy claro — fondos alternativos de sección
          sand: '#f0f8f9',     // teal muy claro — fondo acordeón y secciones suaves
          earth: '#c891a6',    // malva CLARA — acentos/eyebrow sobre fondos oscuros (no usar como fondo de botón con texto blanco)
          earthDark: '#a64f6e',// malva OSCURA — fondo de CTAs con texto blanco (AA: blanco 5.30:1)
          brown: '#8f4460',    // rosa intenso — hover sobre earthDark (más oscuro)
          charcoal: '#1c2e32', // casi negro con tono teal — texto de cuerpo
        },
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      typography: {
        vidaia: {
          css: {
            '--tw-prose-body':          '#1c2e32',
            '--tw-prose-headings':      '#1a4a52',
            '--tw-prose-links':         '#2f7d85',
            '--tw-prose-bold':          '#1a4a52',
            '--tw-prose-counters':      '#2f7d85',
            '--tw-prose-bullets':       '#2f7d85',
            '--tw-prose-hr':            '#c0e8ec',
            '--tw-prose-quotes':        '#1a4a52',
            '--tw-prose-quote-borders': '#2f7d85',
            '--tw-prose-captions':      '#6b7280',
            '--tw-prose-code':          '#1a4a52',
            '--tw-prose-pre-code':      '#c0e8ec',
            '--tw-prose-pre-bg':        '#1a4a52',
            '--tw-prose-th-borders':    '#c0e8ec',
            '--tw-prose-td-borders':    '#c0e8ec',
            'h2': { fontFamily: 'var(--font-playfair), Georgia, serif' },
            'h3': { fontFamily: 'var(--font-playfair), Georgia, serif' },
            'h4': { fontFamily: 'var(--font-playfair), Georgia, serif' },
            'a': { textDecoration: 'underline', textUnderlineOffset: '2px' },
            'a:hover': { color: '#1a4a52' },
            'blockquote': {
              borderLeftColor: '#2f7d85',
              backgroundColor: '#f0f8f9',
              borderRadius: '0 0.5rem 0.5rem 0',
              padding: '0.75rem 1.25rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
