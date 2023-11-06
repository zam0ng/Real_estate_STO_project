export const getSubscriptionsList = async () => {

    const res = await fetch(`http://localhost:9999/posts`, {
    cache: "no-store",
    })

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()

};
