import ImageName from "./ImageName";
import CurrentResult from "./CurrentResult";
import Status from "./Status";
import Progress from "./Progress";
import Totalprice from "./Totalprice";
import Duration from "./Duration";
import ResultDate from "./ResultDate";
import Description from "./Description";
import ActionButton from "./ActionButton";

import { TableRow } from "@/app/_features/admin/real_estates";
import Link from "next/link";
import EnableButton from "./EnableButton";
import DisableButton from "./DisableButton";

const TableRow = async ({ item }: TableRow) => {

    const subscriptionProgress = item.achievement_rate // api 에 따르면 진행률은 achievement_rate 
    console.log( "진행률👏" , subscriptionProgress)
    
    
return (
    <>
    {/* 구분선 */}
    <div className="w-full col-span-9 border-t-2 border-collapse border-neutral-100 "> </div>

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
        ? <EnableButton  text="Enable" />   // ⭐⭐ STO 토큰 발행 버튼 설치하는 곳 ⭐⭐ 
        : <DisableButton  text="Disable" />
    }

    

    {/* {item.subscription_status == "success" && (
        <ActionButton  text="STO토큰발행🔥" />
    )} */}

    
    </>
);
};

export default TableRow;
