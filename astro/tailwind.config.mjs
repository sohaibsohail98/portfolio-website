/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)', surf: 'var(--surf)', surf2: 'var(--surf2)',
        ink: 'var(--ink)', mid: 'var(--mid)', low: 'var(--low)',
        acc: 'var(--acc)', hair: 'var(--hair)',
      },
      fontFamily: {
        sans: ['Schibsted Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: { content: '940px' },
    },
  },
  plugins: [],
};
