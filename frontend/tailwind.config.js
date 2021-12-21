module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: "#0E0E0E",
        second: "#0A0A0A",
        main_color: "181818",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
