import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7B1D1D',
          dark:    '#5A1313',
          light:   '#A52A2A',
        },
        gold: {
          DEFAULT: '#C8922A',
          light:   '#E8B84B',
        },
        cream: {
          DEFAULT: '#FAF7F2',
          dark:    '#F0EBE1',
          stone:   '#E8E0D5',
        },
        ink: {
          DEFAULT: '#1C1C1C',
          mid:     '#3D3530',
          soft:    '#6B5E55',
        },
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans:  ['"DM Sans"', 'system-ui', 'sans-serif'],
        deva:  ['"Noto Sans Devanagari"', 'Mangal', '"Arial Unicode MS"', 'sans-serif'],
      },
      spacing: {
        'nav-top': '40px',
        'nav-main': '72px',
      },
      animation: {
        'kb':         'kb 22s ease-in-out infinite alternate',
        'hero-el':    'hero-el 0.7s cubic-bezier(.4,0,.2,1) forwards',
        'stat-in':    'stat-in 0.8s 0.9s cubic-bezier(.4,0,.2,1) both',
        'sweep':      'sweep 3.5s ease-in-out infinite',
        'dd-slide':   'ddSlide 0.15s ease',
        'fu':         'fu 0.6s ease both',
        'sqa-pulse':  'sqaPulse 2.2s infinite',
        'ds-pulse':   'dsPulse 2s infinite',
      },
      keyframes: {
        kb:        { from: { transform: 'scale(1)' }, to: { transform: 'scale(1.07)' } },
        'hero-el': { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'none' } },
        'stat-in': { from: { opacity: '0', transform: 'translateX(24px)' }, to: { opacity: '1', transform: 'none' } },
        sweep:     { '0%': { left: '-60%' }, '100%': { left: '140%' } },
        ddSlide:   { from: { opacity: '0', transform: 'translateY(-4px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fu:        { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        sqaPulse:  { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
        dsPulse:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '.4' } },
      },
      boxShadow: {
        'card':    '0 10px 36px rgba(0,0,0,.1)',
        'card-hover': '0 16px 40px rgba(123,29,29,.12)',
        'nav':     '0 2px 24px rgba(0,0,0,.07)',
        'chat':    '0 20px 60px rgba(0,0,0,.18), 0 4px 12px rgba(123,29,29,.1)',
        'btt':     '0 4px 20px rgba(123,29,29,.35)',
      },
    },
  },
  plugins: [],
};

export default config;
