import React, { useContext, useEffect, useState } from 'react';
import { SubscriptionContext } from './layout/MySubscription';

const MySubscriptionListitemInfo: React.FC = () => {
    const mySubscriptions = useContext(SubscriptionContext);

    const [textColor,setTextColor] = useState<string>("");

    const [applyDate,setApplyDate] = useState<string>("");
    const [endDate,setEndDate] = useState<string>("");
    const [applyAmount,setApplyAmount] = useState<number>(0);
    const [getAmount,setGetAmount] = useState<number>(0);
    const [offerPrice,setOfferPrice] = useState<number>(0);
    const [refundPrice,setRefundPrice] = useState<number>(0);

    useEffect(()=>{
        if(mySubscriptions){
            const applyDateParts = mySubscriptions[0].application_date.split("-");
            setApplyDate(`${applyDateParts[1]}.${applyDateParts[2]}`);
            const endDateParts = mySubscriptions[0].subscription_end_date.split("-");
            setEndDate(`${endDateParts[1]}.${endDateParts[2]}`);

            setApplyAmount(mySubscriptions[0].subscription_my_amount);
            setGetAmount(mySubscriptions[0].subscription_my_amount);

            setOfferPrice(mySubscriptions[0].subscription_offering_price);
            setRefundPrice(offerPrice*applyAmount - offerPrice*getAmount);
        }
    },[mySubscriptions]);
    
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
                    {offerPrice.toLocaleString()}
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
                    {refundPrice.toLocaleString()}
                </div>
            </div>
        </>
    )
}

export default MySubscriptionListitemInfo;