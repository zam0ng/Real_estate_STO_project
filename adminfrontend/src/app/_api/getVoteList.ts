


export const getVoteList = async () => {

    const res : Response = await fetch(`http://localhost:8080/votes`, {
    cache: "no-store",
    })
    console.log("res" , res)

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()

};
