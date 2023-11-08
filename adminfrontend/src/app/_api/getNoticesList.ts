export const getNoticesList = async () => {

    const res = await fetch(`http://localhost:9999/notices`, {
    cache: "no-store",
    })

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()

};
