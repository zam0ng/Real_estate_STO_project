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
        <div className="">
            <div className="w-5/6 m-auto text-xl font-bold ">주요 지수</div>
            <div className="m-auto h-48 mt-5">
                <MarqueeIndeces/>
            </div>
            <div className="w-5/6 m-auto text-xl font-bold mt-6 ">실시간 차트</div>
            <div data-aos='fade-up'>
                <HomeChart />
            </div>
            <div className="w-5/6 m-auto text-xl font-bold mt-6 ">찾는 부동산이 있으세요?</div>
            <div className="w-full m-auto   mt-5" data-aos='fade-up'>
                <HomeSearch />
            </div>
        </div>
    )
}