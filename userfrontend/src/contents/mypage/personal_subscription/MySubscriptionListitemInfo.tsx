import React, { useEffect, useState } from 'react';

interface SubscriptionItemInfoProps {
    application_date: string;
    subscription_end_date: string;
    amount: number;
    subscription_offering_price: string;
}

const MySubscriptionListitemInfo: React.FC<SubscriptionItemInfoProps> = ({application_date,subscription_offering_price,subscription_end_date,
    amount}) => {

    const [applyDate,setApplyDate] = useState<string>("");
    const [endDate,setEndDate] = useState<string>("");
    const [applyAmount,setApplyAmount] = useState<number>(0);
    const [getAmount,setGetAmount] = useState<number>(0);
    const [offerPrice,setOfferPrice] = useState<number>(0);
    const [refundPrice,setRefundPrice] = useState<number>(0);

    useEffect(()=>{
        const applyDateParts = application_date.split("-");
        if(applyDateParts !== undefined){
            setApplyDate(`${applyDateParts[1]}.${applyDateParts[2]}`);
        }
        const endDateParts = subscription_end_date.split("-");
        if(endDateParts !== undefined){
            setEndDate(`${endDateParts[1]}.${endDateParts[2]}`);
        }
        setApplyAmount(amount);
        setGetAmount(amount);
        setOfferPrice(Number(subscription_offering_price));
        setRefundPrice(offerPrice*applyAmount - offerPrice*getAmount);
    },[]);
    
    return (
        <>
            <div className='w-full h-1/3 border-b border-slate-300 flex flex-row'>
                <div className='w-1/3 h-full flex justify-center items-center'>
                    {applyDate}
                </div>
                <div className='w-1/3 h-full flex justify-center items-center'>
                    {applyAmount}
                </div>
                <div className='w-1/3 h-full flex justify-center items-center'>
                    {offerPrice?.toLocaleString()}
                </div>
            </div>
            <div className='w-full h-1/3 flex flex-row'>
                <div className='w-1/3 h-full flex justify-center items-center'>
                    {endDate}
                </div>
                <div className='w-1/3 h-full flex justify-center items-center'>
                    {getAmount}
                </div>
                <div className='w-1/3 h-full flex justify-center items-center'>
                    {refundPrice?.toLocaleString()}
                </div>
            </div>
        </>
    )
}

export default MySubscriptionListitemInfo;