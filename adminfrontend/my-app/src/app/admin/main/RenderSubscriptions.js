"use client"

export const RenderSubscriptions = ({subscriptionData}) => {

    // useEffect(() => {
    //     fetching();
    // }, []);


    // const fetching = () => {
    //     fetch(`http://localhost:9999/posts`, {
    //     cache: "no-store",
    //     })
    //     .then((res) => res.json())
    //     .then((result) => {
    //         console.log("🚀🚀🚀", result);
    //         setSubscriptionsList(result);
    //     });
    // };

    return (
    <>
        {subscriptionData.map((item) => {
        if (item.mainpurpose != null) {
            return (
            <div key={item.id}>
                <p> 청약 매물 id : {item.id} </p>
                <p> 청약매물 주용도 : {item.mainpurpose} </p>
                <p> 청약매물 사용처 : {item.use_district} </p>
                <p> 청약매물 층수 : {item.floors} </p>
                <p> 청약매물 대지면적 : {item.plottage} </p>
                <p> 청약매물 연면적 : {item.total_ground_area} </p>

                <br></br>
                <br></br>
                <br></br>
            </div>
            );
        }
        })}
    </>
    );
};