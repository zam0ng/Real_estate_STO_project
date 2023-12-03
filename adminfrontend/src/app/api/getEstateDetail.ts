

import { getEstateDetailProps } from "../_features/admin/real_estates";

const getEstateDetail = async (params: getEstateDetailProps ) => {
    // console.log("🚀🚀 @getEstateDetail" , params)

    const path = `/admin/management/real_estates_detail/${params.id}`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store"
        });
        
        return resp.json();
    
    } catch (error) {
        console.log(error);
    }
};


export default getEstateDetail