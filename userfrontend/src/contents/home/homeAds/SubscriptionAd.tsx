
export default function SubscriptionAd(){ 
    return(
        <div className="border w-5/6 h-40 mt-2 rounded-2xl m-auto bg-gradient-to-br from-blue-400 to to-blue-800">
            <div className="grid grid-cols-3 h-full">
                <div className="col-span-2 h-full pl-3 ">
                    <div className="border border-white rounded-lg text-white w-28  text-sm text-center m-2">청약 마감 D-3</div>
                    <div className=" text-white text-sm font-semibold ">매출의 15% 이상 월 배당</div>
                    <div className=" text-white font-extrabold text-xl whitespace-nowrap pt-1 ">수원행궁 뉴스뮤지엄</div>
                    <div className="bg-slate-100 w-28 rounded-xl text-sm h-9 text-center pt-2 font-bold mt-2">청약하러 가기</div>
                </div>
                <div className="h-full">
                        <img src={process.env.PUBLIC_URL + `/images/home/coin.gif`} className="mt-20 pr-3 "/>
                </div>
            </div>
        </div>
    )

}