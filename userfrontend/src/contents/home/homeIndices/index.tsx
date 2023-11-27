import MarqueeIndeces from "./MarqueeIndeces"
import HomeChart from "./HomeChart"
import HomeSearch from "./HomeSearch"


export default function HomeIndices(){
    return(
        <div className="w-5/6 m-auto">
            <div className="text-xl font-bold ">주요 지수</div>
            <div className="m-auto h-48 mt-5">
                <MarqueeIndeces/>
            </div>
            <div className="text-xl font-bold mt-6 ">실시간 차트</div>
            <div className="w-full m-auto border rounded-2xl h-64 mt-5">
                <HomeChart />
            </div>
            <div className="text-xl font-bold mt-6 ">찾는 부동산이 있으세요?</div>
            <div className="w-full m-auto   mt-5">
                <HomeSearch />
            </div>
        </div>
    )
}