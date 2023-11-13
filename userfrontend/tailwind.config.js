/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontSize: {
        home: "62.5%",
        xxxs: "0.5rem",
        xxs: "0.6rem",
        xs: "0.70rem",
        "xs-sm": "0.8rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem"
      },
      screens: {
        xs: "250px"
      },
      height: {
        over: "120%"
      }
    },
  },
  plugins: [],
}

