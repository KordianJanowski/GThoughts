module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: "#0E0E0E",
        second: "#0A0A0A",
        main_color: "181818",
        "second_main_color": "0A0A0A",
        "main_blue_color": "269AF2"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
