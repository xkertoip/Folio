/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const rotateX = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
    '.rotate-x-180': {
      transform: 'rotateX(180deg)',
    },
  });
});
const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    },
  });
});
const perspective = plugin(function ({ addUtilities }) {
  addUtilities({
    '.perspective-3d': {
      perspective: '600px',
    },
  });
});
const transformStyle = plugin(function ({ addUtilities }) {
  addUtilities({
    '.transform-preserve': {
      'transform-style': 'preserve-3d',
    },
  });
});
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    typography: (theme) => ({}),
    extend: {
      fontFamily: {
        RedHatText: ['RedHatText', 'sans-serif'],
        Candal: ['Candal', 'sans-serif'],
        CaudexItalic: ['CaudexItalic', 'sans-serif'],
        BebasNeue: ['BebasNeue', 'sans-serif'],
      },
      colors: {
        primaryLight: '#cfcdcc' ,
        primaryDark: '#252323',
        secondary: '#929ea8',
        active: '#181717',
        neutral: '#cfcdcc',
      },
      keyframes: {
        transVertical: {
          from: { transform: 'translateY(-100%)' },
          to: { transform: 'translateY(100%)' },
        },
        transHorizontal: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
        lowPulse: {
          '0%, 100% ': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      animation: {
        transVertical: 'transVertical 3s ease-in-out infinite',
        transHorizontal: 'transHorizontal 3s ease-in-out infinite',
        lowPulse: 'lowPulse 3s ease-in-out infinite',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    rotateX,
    backfaceVisibility,
    perspective,
    transformStyle,
  ],
};
