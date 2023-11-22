export const getEstateList = async () => {

    // 임시 주소
    const res = await fetch(`http://localhost:8080/admin/subscription`, {
    cache: "no-store",
    })

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    console.log("res🚀🚀" , res)

    return res.json()

};
