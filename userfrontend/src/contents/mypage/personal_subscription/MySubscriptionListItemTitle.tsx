import React, { useContext, useEffect, useState } from "react";
import { SubscriptionContext } from "./layout/MySubscription";
import { useNavigate } from "react-router-dom";

interface SubscriptionTitleProps {
  id: number | undefined;
  subscription_end_date: string;
  subscription_order_amount: number;
  subscription_totalsupply: number;
  subscription_name: string;
}

const MySubscriptionListItemTitle: React.FC<SubscriptionTitleProps> = ({id,subscription_end_date,subscription_name,subscription_order_amount,subscription_totalsupply}) => {
  const mySubscriptions = useContext(SubscriptionContext);

  const navigation = useNavigate();

  const toSubscriptionDetail = (id: number) => {
    navigation(`/subscription/detail/${id}`);
  };

  const [textColor, setTextColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [completionText, setCompletionText] = useState<string>("");

  useEffect(() => {
      const currentDate = new Date();
      const endDate = new Date(subscription_end_date);
      // console.log(currentDate.getTime());
      // console.log(endDate.getTime());
      if (subscription_order_amount === subscription_totalsupply) {
        setCompletionText("입고");
        setTextColor("text-blue-500");
        setBgColor("bg-blue-200");
      } else if (currentDate.getTime() < endDate.getTime()) {
        setCompletionText("진행중");
        setTextColor("text-yellow-500");
        setBgColor("bg-yellow-200");
      } else if (currentDate.getTime() > endDate.getTime()) {
        setCompletionText("미입고");
        setTextColor("text-red-500");
        setBgColor("bg-red-200");
      }
  }, [mySubscriptions]);

  return (
    <div className="w-full h-8 flex flex-row">
      <div className="w-1/2 h-full flex justify-start items-center text-base" onClick={()=>toSubscriptionDetail(id!)}>
        {subscription_name}
        <svg className="ml-3" xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
          <path d="M1.80554 13.244L7.80554 7.24399L1.80554 1.24399" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="w-1/2 h-full flex justify-end items-center">
        <div
          className={`w-14 h-[60%] rounded-full flex justify-center items-center text-xs ${textColor} ${bgColor}`}
        >
          {completionText}
        </div>
      </div>
    </div>
  );
};

export default MySubscriptionListItemTitle;
