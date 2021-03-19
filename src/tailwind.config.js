const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        inherit: 'inherit',
      },
      colors: {
        primary: '#eb3349',
        secondary: '#f45c43',
        orange: colors.orange,
        inherit: 'inherit',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
