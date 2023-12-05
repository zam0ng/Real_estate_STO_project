import React, { useEffect, useState } from 'react';
import { TodayHistoryRequest } from './TodayHistoryTable';

const TodayHistoryTableInfo: React.FC<TodayHistoryRequest> = ({createdAt,trade_price,trade_amount,rises_falls}) => {
    const [textColor,setTextColor] = useState<string>("");

    const tradeDate = new Date(createdAt);
    const tradeHour = tradeDate.getHours();
    const tradeMinute = ((tradeDate.getMinutes()).toString()).padStart(2,'0');

    useEffect(()=>{
        if(rises_falls < 0){
            setTextColor("text-blue-500");
        }else if(rises_falls > 0){
            setTextColor("text-red-500");
        };
    },[]);

    return (
        <div className='w-full h-[10%] flex flex-row'>
            <div className='w-[25%] h-full flex justify-center items-center text-sm'>
                {`${tradeHour}:${tradeMinute}`}
            </div>
            <div className={`w-[25%] h-full flex justify-center items-center text-sm ${textColor}`}>
                {trade_price}
            </div>
            <div className={`w-[25%] h-full flex justify-center items-center text-sm ${textColor}`}>
                {rises_falls}
            </div>
            <div className='w-[25%] h-full flex justify-center items-center text-sm'>
                {(Number(trade_amount)).toLocaleString()}
            </div>
        </div>
  )
}

export default TodayHistoryTableInfo;