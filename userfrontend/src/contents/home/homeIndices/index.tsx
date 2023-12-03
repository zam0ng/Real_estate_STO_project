import MarqueeIndeces from "./MarqueeIndeces";
import HomeChart from "./HomeChart";
import HomeSearch from "./HomeSearch";
import AOS from "aos"
import { useEffect } from "react";

export default function HomeIndices(){

    useEffect(()=>{
        AOS.init({duration : 1200})
    },[])

    const year = new Date().getFullYear().toString();
    const month = Number(new Date().getMonth().toString().padStart(2,'0'))+1;
    const date = new Date().getDate().toString().padStart(2,'0');



    return(
    
    <>
        <div className="w-5/6 m-auto  text-2xl font-extrabold my-10 text-sm" data-aos='slide-right' >
            <div className=" w-full border-b-4 pb-2   ">{year}년 {month}월 {date}일</div>
        </div>
        <div className="">
            <div className="w-5/6 m-auto text-xl font-bold ">주요 지수</div>
            <div className="m-auto h-48 mt-5">
                <MarqueeIndeces/>
            </div>
            {/* <div className="mt-6" data-aos='fade-up'> */}
            <div className="mt-6" >
                <div className="w-5/6 m-auto text-xl font-bold mt-2 ">실시간 차트</div>
                <HomeChart />
            </div>
            {/* <div className="w-full m-auto   mt-5" data-aos='fade-up'> */}
            <div className="w-full m-auto   mt-5">
                <div className="w-5/6 m-auto text-xl font-bold mt-6 ">찾는 부동산이 있으세요?</div>
                <HomeSearch />
            </div>
        </div>
    </>
  );
}
