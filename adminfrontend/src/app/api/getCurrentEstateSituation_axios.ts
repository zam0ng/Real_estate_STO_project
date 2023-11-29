

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


const getCurrentEstateSituation =  ( ) => {
    
    const path = `/admin/real_estates_list`;

    return axios.get(`${path}`)
        .then(res => res.data.json())
        .catch(error => {
            throw new Error(error);
        })

};


export default getCurrentEstateSituation