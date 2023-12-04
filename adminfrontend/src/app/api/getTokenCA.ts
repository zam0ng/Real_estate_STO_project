"use client"

import { getEstateDetailProps } from "../_features/admin/real_estates";

import axios from "axios";

// interface selectedValueParams {
//     selectedValue : string
// }


const getTokenCA = async (selectedValue : string) => {
    
    // axios.get(`${serverurl}/vote/token_contract_address
    
    const path = `/vote/token_contract_address`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`
    // console.log("getOwnerList🔥🔥" , url)
    // console.log("selectedValue" , selectedValue)
    
    
    try {
        const response = await axios.get(  
            url,{
            params: {
                real_estate_name: selectedValue
            }
            });

        // console.log("response" , response)
        return response.data

        
    } catch (error) {
        console.log(error)
    }


};

export default getTokenCA