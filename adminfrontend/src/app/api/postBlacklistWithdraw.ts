import { useRouter } from "next/navigation";

import { revalidateTag } from 'next/cache'

interface postBlacklistUser {
  user_email : string 
}

const postBlacklistWithdraw = async ( user_email : string) => {

    const path = `/admin/blacklist_del`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    const postData = {
      user_email : `${user_email}`
    }

    // const revalidateAction = () => {
    //   revalidateTag('adminUsers')
    // }

    try {
    const response = await fetch(
      `${url}`,
      {
        method: "POST",
        headers : {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if(response.status == 200){
         const data = await response.json()
         return data  
      }

      // console.log("response" , response)


      // revalidateAction
      
      // 여기서 다시 재검증 요청 ✅ 
      // 여기서 데이터 다시 받아오면 깔끔히 해결 
      // 방법은 1) get 요청을 여기서 다시 보내기 -> 전체를 다 받아오나? 
      // 2) 재검증을 보내기 -> 이걸 하면, 안 바뀐 부분은 안 가져오나? | 근데 딱히, 문제 없지 않나? 음. 
      // 3) 새로고침을 하기 -> 이렇게 하면 새로고침? 
      
      // 1) 경로 재요청 

      // 2) 새로고침 router.refresh | 끊김없이? | 음. react 에서도 끊김이 없지 않느냐?! 
      
      // 3) revalidation 
      
      


    } catch (error) {
      console.log(error)
    }
    
    
    // if (response.status !== 201) {
      //   throw new Error(
        //     "Failed to fetch data : 매물 등록 후 서버에서 fetch 받기 Error"
        //   );
        // } else {
          //   return response;
          // }
  };

    export default postBlacklistWithdraw;
        


