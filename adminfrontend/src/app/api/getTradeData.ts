

export const getTradeData = async () => {

    const path = '/admin/ten_date_transaction_price';
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const res = await fetch(`${url}`, {
        cache: "no-store",
        })        

        if(res.status == 200){
            return res.json()
        }
        
    } catch (error) {
        console.log(error)
    }

};
