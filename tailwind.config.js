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
      }
    },
  },
  plugins: [],
}
