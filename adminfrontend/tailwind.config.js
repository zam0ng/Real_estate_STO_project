/** @type {import('tailwindcss').Config} */

function generateDefaultTableRows(rowCount) {
  // 초기 행 (4px 48px)
  let rows = "4px 48px";

  // 이후 행 반복 (2px 56px)
  for (let i = 0; i < rowCount; i++) {
    rows += " 2px 56px";
  }

  // 마지막 행에 auto 추가
  return rows + " auto";
}

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      grayscale: {
        10: '10%',
        20: '20%',
        80: '80%'
      },

      fontFamily: {
        sans: ["Pretendard-Regular-400"],
        "Pretendard-800": ["Pretendard-800"]
      },

      transitionDuration: {
        5000: "5000ms",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },

      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards", // 시간 조절 필요
        fadeOut: "fadeOut 1s ease-in-out forwards", // 시간 조절 필요
      },

      letterSpacing: {
        "0.015rem": "-0.015rem",
      },

      width: {
        admin_modal: "43.5rem",
        "16.25rem": "16.25rem",
        "40rem": "40rem",
        "36.75rem": "36.75rem",
        "31rem": "31rem",
        "30rem": "30rem",
        "150rem": "150rem",
        "40rem": "40rem",
        "76rem": "76rem",
        
        "5.6rem": "5.6rem",
        "37.9rem": "37.9rem",
        backdrop_calc: "calc(100% - 4rem)",
        "4.5rem": "4.5rem",
        "5.375rem": "5.375rem",
        "9.875rem": "9.875rem",

        "116rem": "116rem",
        "80rem": "80rem"
      },

      padding: {
        "2rem": "2rem",
      },

      height: {
        line: "0.09375rem",
        "11.5rem": "11.5rem",
        "15rem": "15rem",
        "37.9rem": "37.9rem",
        "36.75rem": "36.75rem",
        "53.5rem": "53.5rem",
        "71.5rem": "71.5rem",
        "75rem": "75rem",
        "4.5rem": "4.5rem",
        "5.375rem": "5.375rem",
        "60rem": "60rem",
        "55.62rem": "55.62rem",
        "50rem": "50rem",
        "45.625rem": "45.625rem",
        "36.5rem": "36.5rem",
        "32rem": "32rem",
      },
      // gridTemplateColumns: {
      //   layout: "10rem auto",
      //   table: "10rem 10rem repeat(7, minmax(8rem, auto))",
        // table: "5rem 5rem 5rem 5rem 8rem 8rem 7rem 7rem 5rem",

      gridTemplateColumns: {
        layout: "10rem auto",
        table: "10rem 10rem repeat(7, minmax(8rem, auto))",
        // table: "5rem 5rem 5rem 5rem 8rem 8rem 7rem 7rem 5rem",


        userTable: "repeat(8, minmax(5rem, auto))",
        // transactionTable: "repeat(8, minmax(5rem, auto))",
        transactionTable: "2rem 3rem 21rem 21rem 2rem 5rem 5rem ",
        // noticeTable: "5rem 5rem 15rem 15rem 5rem  ",
        noticeTable: "4rem 5rem 5rem repeat(5, minmax(5rem, auto))",
        // noticeTable: "5rem 5rem 5rem 15rem 15rem 5rem ",
      },
      gridTemplateRows: {
        // userTable : "auto",
        // userTable: "repeat(8, minmax(5rem, auto))",

        // userTable: '4px 48px 2px 56px 2px 56px 2px 56px 2px 56px 2px 56px 2px 56px auto', // 첫 번째 행 48px, 두 번째 행 38px, 그 외 행은 콘텐츠에 따라 자동 조절
        // 4px = 맨 윗 줄 | 48px = 목차 높이 | 2px = 아이템 상단선 | 56px 아이템 간격
        defaultTable: generateDefaultTableRows(7),
      },

      fontSize: {
        "1.65rem": "1.65rem",
        "1.687rem": "1.687rem",
        "0.9375rem": "0.9375rem",
      },
      spacing: {
        adminLayout_menubar_container: "27rem",
      },
      borderRadius: {
        adminLayout_header: "3rem 3rem 0 0",
        "0.625rem": "0.625rem",
    
        "1.25rem": "1.25rem",
        "0.87rem": "0.87rem",
      },

      fontWeight: {
        semiSemibold: "550",
      },

      backdropBlur: {
        backdrop_test: "33px",
      },

      backgroundImage: {
        pattern_1: "url('/pattern_1.jpg')",
        pattern_2: "url('/pattern_2.jpg')",
      },

      boxShadow: {
        backdrop_test_bg: "0 10px 15px rgba(0, 0, 0, 0.2)",
        backdrop_test_contentBG: "0 10px 15px rgba(0, 0, 0, 0.1)",
        card: "0px 2px 2px 0px rgba(0, 0, 0, 0.05);",
      },

      colors: {
        borderLine: "#E7E7E7",
        // admin_content_bg: "#f4f4f6", //예전 버전
        admin_content_bg: "#f8f8f8", // ⭐어드민 대시보드 메인 배경

        adminLayout_menubar_welcome: "#77767B",
        adminLayout_menubar_name: "#252526",

        admin_modal_mainBG: "#FCFCFC",  // ⭐ 대시보드 큰 모달
        admin_modal_bg: "#3D3D3D",
        admin_modal_line: "#D9D9D9",
        admin_modal_info: "#E3E1ED",
        admin_modal_text: "#422cbb",
        admin_modal_desc: "#524f62",
        admin_modal_border: "#DDD",
        admin_modal_input: "#7B7B7B",
        admin_modal_cancel: "#D5D2E5",
        admin_modal_create: "#A69CF2",
        admin_modal_cancelText: "#171D40",
        admin_modal_createText: "#F5F7FF",

        dashboard_card_board: "#E8E8E8",
        dashboard_card_bg: "#FAFAFA",
        dashboard_card_text: "#7D7C7F",
        dashboard_card_transaction_title: "#2A2A2A",
        dashboard_card_transaction_date: "#666",
        dashboard_card_transaction_view: "#717171",

        dashboard_btn_estate: "#EF4464",
        dashboard_btn_vote: "#47BEC4",
        dashboard_btn_notice: "#908998",
        dashboard_btn_dividend: "#ED9C3E",

        dashboard_progressBar: "rgb(75, 91, 235)",

        dashboard_carousel_black: "#18191F",
        dashboard_carousel_black_800: "#474A57",

        // backdrop_test : '#ffffff7d',
        backdrop_test: "#252526",

        // 상태 버튼
        state_pending_back: "#FFF0E2", // 주황 or
        state_pending_text: "#E7AB74",
        state_black_opacity_4 : "rgba(0, 0, 0, 0.400)",
        
        blacklist_status_bgColor : "#4a4747",
        blacklist_status_textColor : "#febebe",
        
        

        state_green_back: "#E6F6F6",
        state_green_text: "#4FA0A1",

        state_pink_back: "#f2d5da",
        state_pink_text: "#4FA0A1",

        blacklist_status_bgColor: "#4a4747",
        blacklist_status_textColor: "#febebe",

        // 매물관리-enable 버튼
        state_enable_bg: "#befee0",
        state_enable_bg_check: "#4ea474",
        state_enable_bg_check_text: "#5aa984",

        state_disable_bg: "#e8e8e8",
        state_disable_bg_check: "#c9c9c9",
        state_disable_bg_test: "#e5e5e5",
        // state_disable_bg : "#da3055",
        // state_disable_bg_check : "#851d40",
        // state_disable_bg_test : "#e5e5e5",

        // user-블랙리스트-enroll 버튼
        enable_blacklist_bg: "#febebe",
        enable_blacklist_bg_check: "#a4544e",
        enable_blacklist_bg_check_text: "#a9635a",

        action_btn_border: "#EDEDED",
        action_btn_text: "#8C8C8C",
        table_crieria_text: "#8f979d",
      },
    },
  },
  plugins: [],
};
