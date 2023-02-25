/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    extend: {},
    theme: {
      screens: {
        tablet: '640px',
        laptop: '1024px',
        'twelve-hundred': '1200px',
      },
    },
  },
  plugins: [],
};
