
export const getVoteList = async () => {

    const path = `/votes`;
    const domain = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_PROD_URL;
    const url = `${domain}${path}`

    try {
        const resp : Response = await fetch(`${url}`, {
        cache: "no-store",
        })

        return resp.json();

    } catch (error) {
        console.log(error)
    }

};
