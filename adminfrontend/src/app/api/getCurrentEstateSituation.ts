const getCurrentEstateSituation =  async ( ) => {
    
    const path = `/admin/real_estates_list`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`
    console.log("URL | getCurrentEstateSituation🔥🔥"  , url)

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store"
        });

        // console.log("getCurrentEstateSituation📍" , resp)
        if(resp.status === 200){
            return resp.json();
        }
    
    } catch (error) {
        console.log(error);
    }

};

export default getCurrentEstateSituation