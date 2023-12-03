

// import { getEstateDetailProps } from "../_features/admin/real_estates";


// [params 있을 경우] const getBlackList = async (params: getEstateDetailProps ) => {
const getTransaction = async () => {

    const path = `/admin/recent_trade_list`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store"
        });
        // console.log("resp"  , resp)

        if(resp.status == 200){
            return resp.json();
        }
    
    } catch (error) {
        console.log(error);
    }
};


export default getTransaction