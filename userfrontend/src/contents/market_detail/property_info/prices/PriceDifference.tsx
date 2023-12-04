import React, { useContext, useEffect, useState } from 'react'
import { MarketDetailContext } from '../../../../pages/MarketDetail';

const PriceDifference: React.FC = () => {
  const data = useContext(MarketDetailContext);

  const [rating,setRating] = useState<string>("");
  const [textColor,setTextColor] = useState<string>("");
  const [priceValueRate,setPriceValueRate] = useState<string | number>("");

  useEffect(()=>{
    const currentPriceToValue = data && data.current_price / data.value;
    if(currentPriceToValue && currentPriceToValue < 1 && currentPriceToValue > -1){
      const priceValue = (Math.round(currentPriceToValue * 100) / 100).toFixed(2);
      setPriceValueRate(priceValue);
    }else if(currentPriceToValue && currentPriceToValue >= 1 && currentPriceToValue <= -1){
      const priceValue = (Math.round(currentPriceToValue));
      setPriceValueRate(priceValue);
    }else if(currentPriceToValue === undefined){
      setPriceValueRate(0);
    };
    
    if(data && data.rating < -10){
      setRating("매우 저평가");
      setTextColor("text-blue-500");
    }else if(data && data.rating >= -10 && data.rating < -5){
      setRating("저평가");
      setTextColor("text-blue-500");
    }else if(data && data.rating >= -5 && data.rating < 5){
      setRating("적정");
    }else if(data && data.rating >= 5 && data.rating < 10){
      setRating("고평가");
      setTextColor("text-red-500");
    }else{
      setRating("매우 고평가");
      setTextColor("text-red-500");
    }
  },[data]);
  

  return (
    <div className='w-[20%] h-[80%]'>
      <div className='w-full h-[30%] flex justify-center items-end text-xxs'>건물가치 대비</div>
      <div className='w-full h-[40%] flex justify-center items-center'>
        {priceValueRate + "%"}
      </div>
      <div className={`w-full h-[30%] flex justify-center items-center ${textColor} text-xs`}>
        {rating}
      </div>
    </div>
  )
}

export default PriceDifference;