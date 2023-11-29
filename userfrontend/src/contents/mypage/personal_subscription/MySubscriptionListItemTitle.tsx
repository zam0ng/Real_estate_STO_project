import React, { useContext, useEffect, useState } from "react";
import { SubscriptionContext } from "./layout/MySubscription";

const MySubscriptionListItemTitle: React.FC = () => {
  const mySubscriptions = useContext(SubscriptionContext);

  const [textColor, setTextColor] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("");
  const [completionText, setCompletionText] = useState<string>("");

  useEffect(() => {
    // console.log(mySubscriptions);
    if (mySubscriptions !== undefined) {
      const currentDate = new Date();
      const endDate = new Date(mySubscriptions[0]?.subscription_end_date);
      // console.log(currentDate.getTime());
      // console.log(endDate.getTime());
      if (
        mySubscriptions[0]?.subscription_order_amount ===
        mySubscriptions[0]?.subscription_totalsupply
      ) {
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
    }
  }, [mySubscriptions]);

  return (
    <div className="w-full h-8 flex flex-row">
      <div className="w-1/2 h-full flex justify-start items-center text-lg">
        여의도 자이 1차
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
