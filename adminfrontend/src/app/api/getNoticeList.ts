

export const getNoticeList = async () => {

    const path = `/admin/notices`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const res = await fetch(`${url}`, {
        cache: "no-store",
        })        

        return res.json()
        
    } catch (error) {
        console.log(error)
    }

};
    