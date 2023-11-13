import React from 'react';
import BuildingImg from './BuildingImg';
import BuildingInfo from './BuildingInfo';
import BuyBtn from './BuyBtn';
import { useQuery } from 'react-query';

interface SubscriptionInfo {
  subscription_img: string;
  subscription_totalprice: bigint;
  subscriptoin_description: string;
  subscription_name: string;
  subscription_order_amount: number;
  subscription_restdate: number;
}

// 이 부분 확인하기
const querySubscriptionInfo = async (): Promise<SubscriptionInfo> => {
  const response = await fetch("http://127.0.0.1:8080/market/subscription");
  if(!response.ok){
    throw new Error("Could not fetch data of subscription info");
  };
  return response.json();
};

const Banner: React.FC = () => {
  const {data,error,isLoading,isError} = useQuery<SubscriptionInfo,Error>("tradeListData",querySubscriptionInfo);
  console.log("subscription info : ",data);

  if(isError){
    return <div>Error : {error.message}</div>
  }

  return (
    <>
      {isLoading ? <div>Loading...</div> : data &&
      <div className='w-[80%] h-4/5 bg-slate-100 mt-10 rounded-lg flex flex-col items-center justify-around 
      shadow-lg'>
        <BuildingImg img={data.subscription_img} totalPrice={data.subscription_totalprice} />
        <BuildingInfo />
        <BuyBtn />
      </div>}
    </>
  )
}

export default Banner;