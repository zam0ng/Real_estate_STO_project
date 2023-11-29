

import { getEstateDetailProps } from "../_features/admin/real_estates";


import axios from "./axiosBaseURL";


/* 
/* [요청 주소] /admin/subscription_pending
- [response 타입] 
    {
        subscription_name : "문래 공차",
    subscription_totalprice: '25000000000',
    subscription_order_totalprice: '5000',
    }
*/


const getPublicOfferingStatus =  async ( ) => {
    
    const path = `/admin/subscription_pending`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store"
        });
        // console.log("resp | getPublicOfferingStatus " , resp)
        
        if(resp.status === 200){
            return resp.json();
        }
    
    } catch (error) {
        console.log(error);
    }

};


export default getPublicOfferingStatus