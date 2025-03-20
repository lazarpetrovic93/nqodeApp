/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
        },
        red: {
          DEFAULT: "#FF3737",
        },
        secondary: {
          DEFAULT: "#A89BFF",
        },
        disabled: {
          DEFAULT: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
};
