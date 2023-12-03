import { getEstateDetailProps } from "../_features/admin/real_estates";

const getVoteableEstateData = async () => {

    const path = `/admin/real_estate_name_list`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store"
        });
        
        // console.log("도착했니")

        if(resp.status == 200){
            return resp.json();
        }
    
    } catch (error) {
        console.log(error);
    }
};

export default getVoteableEstateData