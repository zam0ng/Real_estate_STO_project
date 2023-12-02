

export const getMonthlyIncome = async () => {

    const path = '/admin/monthly_income';
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const res = await fetch(`${url}`, {
        cache: "no-store",
        })        

        if(res.status == 200){
            
            try {
                return await res.json()
            } catch (error) {
                console.log(error)
                return 0
            }
        } else { 
            return 0
        }
        
    } catch (error) {
        console.log(error)
    }

};
