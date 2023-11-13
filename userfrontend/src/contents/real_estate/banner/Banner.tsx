import React from 'react';
import BuildingImg from './BuildingImg';
import BuildingInfo from './BuildingInfo';
import BuyBtn from './BuyBtn';

const Banner: React.FC = () => {
  const subscriptionInfo = {
    subscription_img: "",
    subscription_totalPrice: BigInt(2890000000),
    subscription_description: "매출의 15% 이상 월 배당",
    subscription_name: "문래 공차",
    subscription_order_amount: 0,
    subscription_restDate: 1
  };

  return (
    <div className='w-[80%] h-4/5 bg-slate-100 mt-10 rounded-lg flex flex-col items-center justify-around 
    shadow-lg'>
      <BuildingImg img={subscriptionInfo.subscription_img} totalPrice={subscriptionInfo.subscription_totalPrice} />
      <BuildingInfo />
      <BuyBtn />
    </div>
  )
}

export default Banner;