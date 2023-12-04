import React, { useContext } from 'react';
import MySubscriptionListItem from './MySubscriptionListItem';
import { SubscriptionContext } from './layout/MySubscription';

const MySubscriptionList: React.FC = () => {
  const mySubscriptions = useContext(SubscriptionContext);
  // console.log(mySubscriptions);

  return (
    <div className='w-full h-full'>
      {mySubscriptions && mySubscriptions.map((item,index)=>(
        <MySubscriptionListItem key={index} 
          id={item.id}
          subscription_name={item.subscription_name}
          subscription_img_1={item.subscription_img_1}
          subscription_end_date={item.subscription_end_date}
          amount={item.amount}
          subscription_offering_price={item.subscription_offering_price}
          subscription_order_amount={item.subscription_order_amount}
          subscription_totalsupply={item.subscription_totalsupply}
          refund_price={item.refund_price}
          application_date={item.application_date} />
      ))}
    </div>
  )
}

export default MySubscriptionList;