

export const getTenDateUser = async () => {

    // path 
        // 기존 DJ 테스트 주소 : http://localhost:8080/admin/subscription
        // 변경 주소 : /admin/management/real_estates_list

    const path = '/admin/ten_date_join_list';
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
