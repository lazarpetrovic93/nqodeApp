/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        secondary: {
          DEFAULT: "#A9A29C",
        },
        main: {
          DEFAULT: "#013440",
        },
        red: {
          DEFAULT: "#FF3737",
        },
      },
    },
  },
  plugins: [],
};
