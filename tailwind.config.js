const tailwindCssAnimista = require("tailwindcss-animistacss")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik'],
        'title': ['Anton'],
      },
      aspectRatio: {
        '4000/4250':'4000 / 4250'
      },
    },
    ripple: theme => ({
      colors: theme('colors')
    }),
  },
  plugins: [
    require('tailwindcss-ripple')(),
    tailwindCssAnimista({
      classes:['animate__slide-out-left', 'animate__slide-in-left', 'animate__slide-in-right', 'animate__scale-in-center', 'animate__flip-in-ver-left'],
      settings:{
        'animate__slide-out-left': {
          duration: 500,
          iterationCounts: 1,
          isInfinite: false,
        },
        'animate__slide-in-right': {
          duration: 500,
          iterationCounts: 1,
          isInfinite: false,
        },
        'animate__slide-in-left': {
          duration: 500,
          iterationCounts: 1,
          isInfinite: false,
        },
        'animate__scale-in-center': {
          duration: 500,
          iterationCounts: 1,
          isInfinite: false,
        },
        'animate__flip-in-ver-left': {
          duration: 500,
          iterationCounts: 1,
          isInfinite: false,
        }
      },
      variants: ["responsive"]
    })
  ],
}
