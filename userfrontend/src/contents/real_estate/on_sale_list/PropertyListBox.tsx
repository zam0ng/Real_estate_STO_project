import React, { useEffect, useState } from 'react';
import PropertyBox from './property/PropertyBox';
import { useQuery } from 'react-query';

interface PropertyInfo {
  start_price: number;
  current_price: number;
  fluctuation_rate: number;
  rating: number;
  "Subscription.subscription_img": string;
  "Subscription.subscription_name": string;
  "Subscription.subscription_description": string;
};

const queryPropertyList = async (): Promise<PropertyInfo[]> =>{
  const response = await fetch("http://127.0.0.1:8080/market/tradelist");
  if(!response.ok){
    throw new Error("Could not fetch data from /market/tradelist");
  };
  return response.json();
};

const PropertyListBox: React.FC = () => {
  const {data,error,isLoading,isError} = useQuery<PropertyInfo[],Error>("tradeListData",queryPropertyList);
  console.log("property list data : ", data);

  if(isError){
    return <div>Error : {error.message}</div>
  }

  return (
    <div className='w-[80%] h-auto mt-10 flex flex-col'>
      <div className='w-[80%] h-20 flex flex-col justify-center items-start mb-5'>
        <div className='text-xl'>거래중인 건물</div>
        <div className='text-sm'>지금 바로 소유주가 되어보세요</div>
      </div>
      {isLoading ? <div>Loading...</div> : data && data.map((item,index)=>(
        <PropertyBox key={index} start_price={item.start_price} current_price={item.current_price}
        fluctuation_rate={item.fluctuation_rate} rating={item.rating} subscription_img={item["Subscription.subscription_img"]}
        subscription_name={item["Subscription.subscription_name"]} subscription_description={item["Subscription.subscription_description"]} />
      ))}
    </div>
  )
}

export default PropertyListBox;