
import axios from "axios";


const getVotableUsers = async (selectedValue : string) => {
    
    // axios.get(`${serverurl}/vote/token_contract_address
    
    const path = `/vote/vote_wallets`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`
    // console.log("getAmountList" , url)
    // console.log("selectedValue@getAmountList" , selectedValue)
    
    
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

export default getVotableUsers