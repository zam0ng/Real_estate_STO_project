import React from "react"
import { SubAllList } from "../../../features/SubAllList"
import { useNavigate } from "react-router-dom"
import { serverurl } from "../../../components/serverurl";

type DropdownProps = {
    props : SubAllList[] | string;
}

export default function Dropdown({props} : DropdownProps){

    const Navigate = useNavigate();

    if(typeof props === 'string'){
        return(
            <div className="relative flex flex-col items-center h-16 rounded-lg  mt-6">
                <button className="w-full h-full text-center">{props}</button>
            </div>
        )
    }

    function dayCounter(num : string){
                // 문자열로 된 목표 날짜
        let targetDateString = num;

        // 목표 날짜와 오늘 날짜의 Date 객체 생성
        let targetDate  = new Date(targetDateString);
        let today = new Date();

        // 두 날짜의 차이 계산 (밀리초 단위)
        let difference : number = targetDate.getTime() - today.getTime();

        // 밀리초를 일수로 변환 (1일 = 24시간 * 60분 * 60초 * 1000밀리초)
        let days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        // D-Day 계산
        let dDay;
        if (days > 0) {
            dDay = 'D-' + days; // 미래 날짜
        } else if (days < 0) {
            dDay = 'D+' + Math.abs(days); // 과거 날짜
        } else {
            dDay = 'D-Day'; // 오늘 날짜
        }

        return (dDay);
    }

       const content = props.map((building : SubAllList,index : number)=>
        <div className="bg-[#EDF0F4] rounded-xl shadow-innerneu2 mt-3  h-16 text-center pt-1 flex  px-5 justify-between" key={index} onClick={()=>Navigate(`detail/${building.id}`)}>
            <div className={` mr-2 w-14 h-14 rounded-2xl `} style={{background : `url('${serverurl}/estate_img/${(building.subscription_img_1).split("/")[2]}')`, backgroundSize : 'cover'}}> </div>
            <div className=" h-14 w-40 flex flex-col text-left pt-2">
                <span className="">{building.subscription_name}</span>
                <span className="text-xs pt-1 overflow-hidden">{building.subscription_address}</span>
            </div>
            <div className=" h-14 w-14 text-right text-sm font-extrabold pt-2">
                {building.subscription_status === "start" ? <span>{dayCounter(building.subscription_end_date)}</span> : dayCounter(building.subscription_start_date)}
            </div>
        </div>
       )


    return(
        <>{content}</>
    )

}