import React, { useEffect, useState } from 'react';

interface DailyHistoryProps {
    date: string;
    next_trade_price: number;
    fluctuation_price: number;
    total_price: number;
}

const DailyHistoryTableInfo: React.FC<DailyHistoryProps> = ({date,next_trade_price,fluctuation_price,total_price}) => {
    const [textColor,setTextColor] = useState<string>("");
    const [changeType,setChangeType] = useState<string>("");

    useEffect(()=>{
        if(fluctuation_price < 0){
            setTextColor("text-blue-500");
            setChangeType(`${fluctuation_price}`);
        }else if(fluctuation_price > 0){
            setTextColor("text-red-500");
            setChangeType(`+${fluctuation_price}`);
        };
    },[])

    return (
        <div className='w-full h-[10%] flex flex-row'>
            <div className='w-[25%] h-full flex justify-center items-center text-sm'>
                {date}
            </div>
            <div className={`w-[25%] h-full flex justify-center items-center text-sm ${textColor}`}>
                {next_trade_price}
            </div>
            <div className={`w-[25%] h-full flex justify-center items-center text-sm ${textColor}`}>
                {changeType}
            </div>
            <div className='w-[25%] h-full flex justify-center items-center text-sm'>
                {(Number(total_price)).toLocaleString()}
            </div>
        </div>
    )
}

export default DailyHistoryTableInfo;