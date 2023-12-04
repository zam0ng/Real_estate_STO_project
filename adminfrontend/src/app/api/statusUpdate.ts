export const getBlackList = async () => {

    const path = `/admin/status_update`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const resp = await fetch(`${url}` ,{ 
            cache: "no-store"
        });
        if(resp.status === 200){
            return resp.json();
        }

    
    } catch (error) {
        console.log(error);
    }
};