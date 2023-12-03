"use client"

import { EnrollBlacklistButtonParams } from "@/app/_features/admin/real_estates";
import postBlacklistUser from "@/app/api/postBlacklistUser";
import postBlacklistWithdraw from "@/app/api/postBlacklistWithdraw";
import { useRouter } from "next/navigation";


const UnEnrollBlacklistButton = ({ text, user_email }: EnrollBlacklistButtonParams) => {
  const router = useRouter();
  
  const handleBlacklistEnrollBtn = async () => {
    
    // 정상작동 🔵🔵 
        // postBlacklistWithdraw(user_email)
        // .then( () => {
        //     const path = `/admin/users`;
        //     const domain = process.env.NEXT_PUBLIC_LOCAL_CLIENT || process.env.NEXT_PUBLIC_PRODDUCTION_CLIENT;
        //     const url = `${domain}${path}`
        //     router.refresh();                
        //     router.replace(`${url}`);      
        //   } )


    // revalidate onDemand 🔵🔵 정상 작동
        await postBlacklistWithdraw(user_email)

        // const res = await fetch('api/revalidate?tag=' + tag)   // ⭐⭐ props 를 받는 경우
        const res = await fetch('api/revalidate?tag=userList' , {
          method : 'POST'
        })
        console.log(res)

        // 새로고침 ⭐⭐⭐
        if(res) router.refresh()
        

  }


  return (
    <>
      <button  onClick={handleBlacklistEnrollBtn} className="flex items-center justify-center col-span-1 text-base font-bold text-neutral-700 ">
        {/* <div className="flex items-center w-24 -mr-8 border-2 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
        <div className="flex items-center w-20 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_disable_bg">
        {/* <div className="flex items-center w-10 -mr-8 rounded-lg h-9 justify-evenly border-text-action_btn_text bg-state_enable_bg"> */}
          
          <p className="text-sm text-gray-400">{text}</p>
          
          {/* 배경색 :  */}
          <div className="rounded-lg bg-state_disable_bg_check"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {/* <svg  className="m-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 23 23" fill="none">
              <path  d="M20.269 6.66309L9.26904 17.6631L4.26904 12.6631" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg> */}
          </div>


        </div>
      </button>


    </>
  );
};

export default UnEnrollBlacklistButton;
