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
    },
  },
  plugins: [],
};

export default config;
