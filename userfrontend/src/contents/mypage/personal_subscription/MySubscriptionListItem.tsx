import React, { useContext, useEffect, useState } from 'react';
import { SubscriptionContext } from './layout/MySubscription';
import MySubscriptionListItemTitle from './MySubscriptionListItemTitle';
import MySubscriptionListItemImg from './MySubscriptionListItemImg';
import MySubscriptionListItemHeader from './MySubscriptionListItemHeader';
import MySubscriptionListitemInfo from './MySubscriptionListitemInfo';

const MySubscriptionListItem: React.FC = () => {
    const mySubscriptions = useContext(SubscriptionContext);

    const [textColor,setTextColor] = useState<string>("");
    const [bgColor,setBgColor] = useState<string>("");
    const [completionText,setCompletionText] = useState<string>("");

    useEffect(()=>{
        console.log(mySubscriptions);
        if(mySubscriptions){
            console.log(mySubscriptions[0].subscription_end_date);
            console.log(new Date(mySubscriptions[0].subscription_end_date));
            console.log(new Date());
            if(mySubscriptions[0].subscription_order_amount === mySubscriptions[0].subscription_totalsupply){
                setCompletionText("입고");
                setTextColor("text-blue-500");
                setBgColor("bg-blue-200");
            }else if(new Date() < new Date(mySubscriptions[0].subscription_end_date)){
                setCompletionText("진행중");
                setTextColor("text-yellow-500");
                setBgColor("bg-yellow-200");
            }else if(new Date() > new Date(mySubscriptions[0].subscription_end_date) && mySubscriptions[0].subscription_order_amount < mySubscriptions[0].subscription_totalsupply){
                setCompletionText("미입고");
                setTextColor("text-red-500");
                setBgColor("bg-red-200");
            };
        };
    },[mySubscriptions]);

    return (
        <>
            <MySubscriptionListItemTitle />
            <div className='w-full h-28 flex flex-row'>
                <MySubscriptionListItemImg />
                <div className='w-[75%] h-full flex flex-col'>
                    <MySubscriptionListItemHeader />
                    <MySubscriptionListitemInfo />
                </div>
            </div>
        </>
    )
}

export default MySubscriptionListItem;