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
        over: "120%",
        "112": "28rem",
        "128": "32rem"
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '25%': { transform: 'translateX(-25%)' },
          '50%': { transform: 'translateX(-50%)' },
          '75%': { transform: 'translateX(-75%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}

