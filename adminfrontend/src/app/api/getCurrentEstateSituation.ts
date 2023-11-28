

import { getEstateDetailProps } from "../_features/admin/real_estates";


import axios from "./axiosBaseURL";


/* 
- 요청 경로 : /admin/real_estates_list
- response 타입 
    {
        subscription_img: "images/test.png",
        subscription_name: "문래 공차",
        subscription_description: "한번가야지",
        weekly_trade_amount : 2000 ,
        // 토큰 가격: ,
        // 누적 수익률: ,
        current_price: 5000,
    }
*/



const getCurrentEstateSituation =  async ( ) => {
    
    const path = `/admin/real_estates_list`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`
    // console.log("URL🔥🔥"  , url)

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store"
        });

        if(resp.status === 200){
            console.log("getCurrentEstateSituation | 성공")
        }else{
            console.log("오류😥")   // subscripitons 에서 status 가 success 일 때, 데이터를 가져올 수 있음. 
        }

        // console.log("getCurrentEstateSituation📍" , resp)
        
        return resp.json();
    
    } catch (error) {
        console.log(error);
    }

};


export default getCurrentEstateSituation