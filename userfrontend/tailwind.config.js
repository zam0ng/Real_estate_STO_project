/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily : {
        sans : ['Pretendard-Regular',]
      },
      fontSize: {
        home: "62.5%",
        xxxs: "0.5rem",
        xxs: "0.6rem",
        xs: "0.70rem",
        "xs-sm": "0.8rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        // 여기에 필요한 다른 fontSize 정의를 추가할 수 있습니다.
      },
      screens: {
        xs: "250px",
        // 필요한 경우 다른 화면 크기도 정의할 수 있습니다.
      },
      height: {
        over: "120%",
        112: "28rem",
        128: "32rem",
        // 필요에 따라 추가적인 높이 설정을 여기에 추가할 수 있습니다.
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        swipe: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { transform: "translateY(100px)" },
          "100%": { transform: "translateY(0)" },
        },
        fade: {
          "0%": { transform: "opacity(0)" },
          "100%": { transform: "opacity(1)" },
        },
      },
      animation: {
        marquee: 'marquee 14s linear infinite',
        marquee2: 'marquee2 14s linear infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        swipe : 'swipe 0.4s ease-out',
        fadeIn : 'fadeIn 5s ease',
        fade : 'fade 5s ease'
      },boxShadow: {
        neu1: '-5px -5px 15px 2px rgb(0 0 0 / 0.1)',
        neu2: '-5px -5px 10px 2px rgb(0.9 0.9 0.9 / 0.1)',
        innerneu1: 'inset -5px -5px 10px 2px rgb(0.9 0.9 0.9 / 1)',
        innerneu2: 'inset -5px -5px 15px 2px rgb(0 0 0 / 0.1)'
      },
      colors :{
        state_loading_back : "rgba(0, 0, 0, 0.500)",
      }
    },
  },
  darkMode: "class",
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
}
