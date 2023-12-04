import React, { useContext, useEffect, useState } from "react";
import { MySubscriptionListRequest, SubscriptionContext } from "./layout/MySubscription";
import MySubscriptionListItemTitle from "./MySubscriptionListItemTitle";
import MySubscriptionListItemImg from "./MySubscriptionListItemImg";
import MySubscriptionListItemHeader from "./MySubscriptionListItemHeader";
import MySubscriptionListitemInfo from "./MySubscriptionListitemInfo";

const MySubscriptionListItem: React.FC<MySubscriptionListRequest> = ({
  id,
  subscription_name,
  subscription_img_1,
  application_date,
  subscription_end_date,
  amount,
  subscription_offering_price,
  refund_price,
  subscription_order_amount,
  subscription_totalsupply
}) => {

  return (
    <>
      <MySubscriptionListItemTitle 
        id={id}
        subscription_end_date={subscription_end_date} 
        subscription_name={subscription_name} 
        subscription_order_amount={subscription_order_amount} 
        subscription_totalsupply={subscription_totalsupply} 
      />
      <div className="w-full h-28 flex flex-row items-center">
        <MySubscriptionListItemImg subscription_img_1={subscription_img_1} />
        <div className="w-[75%] h-[75%] flex flex-col">
          <MySubscriptionListItemHeader />
          <MySubscriptionListitemInfo 
            application_date={application_date} 
            subscription_end_date={subscription_end_date} 
            amount={amount} 
            subscription_offering_price={subscription_offering_price} 
          />
        </div>
      </div>
    </>
  );
};

export default MySubscriptionListItem;
