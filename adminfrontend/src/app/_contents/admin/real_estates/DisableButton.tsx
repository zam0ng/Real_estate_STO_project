import { DisableButton } from "@/app/_features/admin/real_estates";

const DisableButton = ({ text }: DisableButton) => {
  
  return (
    <>
      {/* STO 등록 또는 청약 등록 */}
      <div className="flex items-center justify-center col-span-1 text-base font-bold ">
        <div className="flex items-center w-5.6rem  rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_disable_bg">
          
          {/* <p className="text-sm text-action_btn_text">{text} </p> */}
          <p className="text-sm text-gray-400">{text} </p>
  
          <div className="rounded-lg bg-state_disable_bg_check"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
  
  
        </div>
      </div>
    </>
  );
};

export default DisableButton;
