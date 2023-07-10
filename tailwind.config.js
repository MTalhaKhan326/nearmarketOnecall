/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Gilroy', ...defaultTheme.fontFamily.sans]
      }
    },
    colors: {
      ...colors,
      'black': '#2e2e2f',
      'blue': '#2f89fc',
    },
    fontSize: {
      base: ['14px', '24px']
    }
  },
  plugins: [],
}