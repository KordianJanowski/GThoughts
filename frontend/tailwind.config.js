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
      spacing: {
        '120': '30rem',
        '160': '40rem',
        '200': '50rem',
        '240': '60rem',
        '280': '70rem',
        '320': '80rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
