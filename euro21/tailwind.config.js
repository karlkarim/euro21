module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins'],
    },
    extend: {
      colors: {
        'uefa-dark': '#1C5E6C',
        'uefa-light': '#277A8C'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
