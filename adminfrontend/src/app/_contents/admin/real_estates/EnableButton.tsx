"use client"

import { EnableButtonParam } from "@/app/_features/admin/real_estates";

const EnableButton = ({ text  }: EnableButtonParam) => {

  const handleSTOBtn = () => {
    alert("🔥STO 발행 시작🔥")
  }

  return (
    <>
      {/* STO 등록 또는 청약 등록 */}
      <button  onClick={handleSTOBtn} className="flex items-center justify-center col-span-1 text-base font-bold text-neutral-700 ">
        {/* <div className="flex items-center w-24 -mr-8 border-2 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
        <div className="flex items-center w-5.6rem  rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg">
        {/* <div className="flex items-center w-10 -mr-8 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
          
          <p className="text-sm text-state_enable_bg_check_text">{text}</p>
          
          {/* 배경색 :  */}
          <div className="rounded-lg bg-state_enable_bg_check"> 
            <svg  className="m-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 23 23" fill="none">
              <path  d="M20.269 6.66309L9.26904 17.6631L4.26904 12.6631" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>


        </div>
      </button>

      {/* 1차 테스트 : STO 등록 또는 청약 등록 */}
      {/* <div   className="flex items-center justify-center col-span-1 text-base font-bold text-neutral-700 "> */}
        {/* <div className="flex items-center w-24 -mr-8 border-2 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
        {/* <div className="flex items-center w-24 -mr-8 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
          
          {/* <p className="text-sm text-state_enable_bg_check_text">{text}</p> */}
          
          {/* 배경색 :  */}
          {/* <div className="rounded-lg bg-state_enable_bg_check"> 
            <svg  className="m-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 23 23" fill="none">
              <path  d="M20.269 6.66309L9.26904 17.6631L4.26904 12.6631" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>


        </div>
      </div> */}
    </>
  );
};

export default EnableButton;
