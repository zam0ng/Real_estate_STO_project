import React, { useEffect, useState } from 'react';

interface AssetTableBodyProps {
    name: string;
    price: number;
    amount: number;
    valuation: number;
    present_price: number;
    possible_quantity: number;
    rate_of_return: number;
}

const MyAssetHistoryTableBody: React.FC<AssetTableBodyProps> = ({name,price,amount,valuation,present_price,possible_quantity,rate_of_return}) => {
    const [textColor,setTextColor] = useState<string>("");

    useEffect(()=>{
        if(price > present_price){
            setTextColor("text-blue-500");
        }else if(price < present_price){
            setTextColor("text-red-500");
        }
    },[]);

    return (
        <div className='w-full h-20 border-b border-slate-200 flex flex-row text-sm'>
            <div className='w-[30%] h-full border-r border-slate-200 flex justify-center items-center'>
                {name}
            </div>
            <div className='w-1/5 h-full flex flex-col'>
                <div className='w-full h-1/2 flex justify-center items-center'>{price.toLocaleString()}</div>
                <div className={`w-full h-1/2 flex justify-center items-center ${textColor}`}>{present_price.toLocaleString()}</div>
            </div>
            <div className='w-1/5 h-full'>
                <div className='w-full h-1/2 flex justify-center items-center'>{amount}</div>
                <div className='w-full h-1/2 flex justify-center items-center'>{possible_quantity}</div>
            </div>
            <div className='w-[30%] h-full'>
                <div className={`w-full h-1/2 flex justify-center items-center ${textColor}`}>{valuation.toLocaleString()}</div>
                <div className={`w-full h-1/2 flex justify-center items-center ${textColor}`}>{rate_of_return}%</div>
            </div>
        </div>
    )
}

export default MyAssetHistoryTableBody;