import React from 'react';
import PropertyBox from './property/PropertyBox';

const PropertyListBox: React.FC = () => {
  const propertyList = [
    {
      start_price : 5000,
      current_price : 4900,
      fluctuation_rate : -0.10,
      rating: 15.0816,
      subscription_img : "",
      subscription_name: "property name",
      subscription_description: "property description"
    },
    {
      start_price : 5000,
      current_price : 4900,
      fluctuation_rate : -0.10,
      rating: 4.0816,
      subscription_img : "",
      subscription_name: "property name",
      subscription_description: "property description"
    },
    {
      start_price : 5000,
      current_price : 4900,
      fluctuation_rate : -0.10,
      rating: 4.0816,
      subscription_img : "",
      subscription_name: "property name",
      subscription_description: "property description"
    },
  ];

  return (
    <div className='w-[80%] h-auto mt-10 flex flex-col'>
      <div className='w-[80%] h-20 flex flex-col justify-center items-start mb-5'>
        <div className='text-xl'>거래중인 건물</div>
        <div className='text-sm'>지금 바로 소유주가 되어보세요</div>
      </div>
      {propertyList.map((item,index)=>(
        <PropertyBox key={index} start_price={item.start_price} current_price={item.current_price}
        fluctuation_rate={item.fluctuation_rate} rating={item.rating} subscription_img={item.subscription_img}
        subscription_name={item.subscription_name} subscription_description={item.subscription_description} />
      ))}
    </div>
  )
}

export default PropertyListBox;