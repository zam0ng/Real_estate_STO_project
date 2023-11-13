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

      width : {
        'admin_modal' : '43.5rem' ,
      },

      height : {
        "line" : "0.09375rem",

      },

      gridTemplateColumns : {
        'layout': '22rem, auto',
        'table': 'repeat(9, minmax(5rem, auto))',
        
      },
      gridTemplateRows: {

      },


      fontSize : {
        "1.75rem" : "1.75rem", 

      },
      spacing : {
        adminLayout_menubar_container : '27rem'
      },
      borderRadius: {
        'adminLayout_header': '3rem 3rem 0 0',
      },
      colors : {
        'admin_content_bg' : '#f4f4f6',
        'adminLayout_menubar_welcome' : '#77767B',
        'adminLayout_menubar_name' : '#252526',
        'admin_modal_bg' : '#3D3D3D',
        'admin_modal_line' : '#D9D9D9',
        'state_pending_back' : '#FFF0E2',
        'state_pending_text' : '#E7AB74',
        'action_btn_border' : '#EDEDED',
        'action_btn_text' : '#8C8C8C',
        'table_crieria_text' : '#8f979d',
        // 'state_pending_text' : '#e7b88d',

      }
    },
  },
  plugins: [],
}