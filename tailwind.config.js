/** @type {import('tailwindcss').Config} */

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
        primary: '#929ea8',
        secondary: '#27201e',
        neutral: '#cfcdcc',
        active: '#363434',
      },
    },
  },

  plugins: [require('@tailwindcss/typography')],
};
