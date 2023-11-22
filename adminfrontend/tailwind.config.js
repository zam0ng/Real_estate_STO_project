/** @type {import('tailwindcss').Config} */
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
      letterSpacing: {
        "0.015rem": "-0.015rem",
      },

      width: {
        admin_modal: "43.5rem",
        "40rem": "40rem",
        "36.75rem": "36.75rem",
        "31rem": "31rem",
        "30rem": "30rem",
        "150rem": "150rem",
        "40rem": "40rem",
        "5.6rem": "5.6rem",
        "37.9rem": "37.9rem",
        backdrop_calc: "calc(100% - 4rem)",
        "4.5rem": "4.5rem",
        "5.375rem": "5.375rem",

        "116rem": "116rem",
        "80rem": "80rem,",
      },

      padding: {
        "2rem": "2rem",
      },

      height: {
        line: "0.09375rem",
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
        "45.625rem" : "45.625rem",
        "36.5rem" : "36.5rem",
      },

      gridTemplateColumns: {
        layout: "22rem, auto",
        table: "repeat(9, minmax(5rem, auto))",
      },
      gridTemplateRows: {},

      fontSize: {
        "1.65rem": "1.65rem",
      },
      spacing: {
        adminLayout_menubar_container: "27rem",
      },
      borderRadius: {
        adminLayout_header: "3rem 3rem 0 0",
        "0.625rem": "0.625rem",
      },

      borderRadius: {
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
        admin_content_bg: "#f4f4f6",
        adminLayout_menubar_welcome: "#77767B",
        adminLayout_menubar_name: "#252526",

        admin_modal_mainBG: "#FCFCFC",
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

        // backdrop_test : '#ffffff7d',
        backdrop_test: "#252526",

        state_pending_back: "#FFF0E2",
        state_pending_text: "#E7AB74",
        state_enable_bg: "#befee0",
        state_enable_bg_check: "#4ea474",
        state_enable_bg_check_text: "#5aa984",

        state_disable_bg : "#e8e8e8 ",
        state_disable_bg_check : "#c9c9c9",
        state_disable_bg_test : "#e5e5e5",
        
        action_btn_border: "#EDEDED",
        action_btn_text: "#8C8C8C",
        table_crieria_text: "#8f979d",
        // 'state_pending_text' : '#e7b88d',
      },
    },
  },
  plugins: [],
};
