export const getNoticesList = async () => {


    const path = `/vote/notices`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const res = await fetch(`${url}`, {
        cache: "no-store",
        })
    
        if(!res.ok) {
            throw new Error('Failed to fetch data')
        }
    
        return res.json()
        
    } catch (error) {
        
    }


};
