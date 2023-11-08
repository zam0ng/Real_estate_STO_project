export const getSubscriptionsList = async () => {

    const res = await fetch(`http://localhost:9999/real_estates_submit`, {
    cache: "no-store",
    })

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()

};