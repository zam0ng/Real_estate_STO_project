

// import { getEstateDetailProps } from "../_features/admin/real_estates";

// [params 있을 경우] const getBlackList = async (params: getEstateDetailProps ) => {
const getBlackList = async () => {

    const path = `/admin/blacklist`;
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


export default getBlackList