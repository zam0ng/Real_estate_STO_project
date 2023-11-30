import MarqueeIndeces from "./MarqueeIndeces"
import HomeChart from "./HomeChart"
import HomeSearch from "./HomeSearch"
import AOS from "aos"
import { useEffect } from "react"

export default function HomeIndices(){

    useEffect(()=>{
        AOS.init({duration : 1200})
    })


    return(
    
    <>
        <div className="w-5/6 m-auto  text-2xl font-extrabold my-10 border-b-2 to-blue-600 ">
            <span className=" w-5/6  ">오늘 뭐사지?</span>
        </div>
        <div className="">
            <div className="w-5/6 m-auto text-xl font-bold ">주요 지수</div>
            <div className="m-auto h-48 mt-5">
                <MarqueeIndeces/>
            </div>
            <div className="mt-6" data-aos='fade-up'>
                <div className="w-5/6 m-auto text-xl font-bold mt-2 ">실시간 차트</div>
                <HomeChart />
            </div>
            <div className="w-full m-auto   mt-5" data-aos='fade-up'>
                <div className="w-5/6 m-auto text-xl font-bold mt-6 ">찾는 부동산이 있으세요?</div>
                <HomeSearch />
            </div>
        </div>
    </>
    )
}