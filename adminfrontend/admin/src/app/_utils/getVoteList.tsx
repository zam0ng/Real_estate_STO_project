


export const getVoteList = async () => {

    // topics 는 임시로!! 
    const res : Response = await fetch(`http://localhost:9999/votes`, {
    cache: "no-store",
    })
    console.log("res" , res)

    if(!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()

};
