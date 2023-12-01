"use client"

import ImageName from "./ImageName";
import CurrentResult from "./CurrentResult";
import Status from "./Status";
import Progress from "./Progress";
import Totalprice from "./Totalprice";
import Duration from "./Duration";
import ResultDate from "./ResultDate";
import Description from "./Description";
import ActionButton from "./ActionButton";

import { TableRowEstate } from "@/app/_features/admin/real_estates";
import Link from "next/link";
import EnableButton from "./EnableButton";
import DisableButton from "./DisableButton";
import Loading from "./Loading";
import {useState} from 'react';

const TableRowEstate =({ item }: TableRowEstate) => {

    // const subscriptionProgress = item.achievement_rate // ⭐⭐ api 에 따르면 진행률은 achievement_rate 
    // const subscriptionProgress = 0.8 // api 에 따르면 진행률은 achievement_rate 
    const subscriptionProgress = item.achievement_rate / 100 ;// api 에 따르면 진행률은 achievement_rate 
    // console.log( "진행률👏" , subscriptionProgress)
    const [loading,setLoading] = useState(false);

return (
    <>
    {/* 구분선 */}
    <div className="w-full col-span-9 border-t-2 border-collapse border-neutral-100 "> </div>
    {loading && <Loading/>}
    <ImageName
        id={item.id}
        imageURL={item.subscription_img_1}
        name={item.subscription_name}
    />
    <Description 
        id={item.id}
        desc={item.subscription_description} />
        
    <Status 
        id={item.id}
        status={item.subscription_status} />
        
    <Progress 
        id={item.id}
        progress={item.achievement_rate} />
        
    <Totalprice 
        id={item.id}
        totalPrice={item.subscription_totalprice} />
        
    <CurrentResult 
        id={item.id}
        current={700} />
        
    <Duration
        id={item.id}
        startDate={item.subscription_start_date}
        endDate={item.subscription_end_date}
    />
    
    <ResultDate 
        id={item.id}
        resultDate={item.subscription_result_date} />
        
    {subscriptionProgress >= 0.8
    // setLoading = {setLoading}
        ? <EnableButton  text="Enable"  id={item.id} setLoading = {setLoading}  />   // ⭐⭐ STO 토큰 발행 버튼 설치하는 곳 ⭐⭐ 
        : <DisableButton  text="Disable" /> 
    }
    </>
);
};

export default TableRowEstate;
