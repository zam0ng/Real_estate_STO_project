import React, { useContext, useEffect, useState } from 'react'
import { MarketDetailContext } from '../../../../pages/MarketDetail';

const PropertyPrice: React.FC = () => {
  const data = useContext(MarketDetailContext);

  const [textColor,setTextColor] = useState<string>("");
  const [priceChangeRate,setPriceChangeRate] = useState<string>("");

  useEffect(()=>{
    if(data && data.fluctuation_rate > 0){
      const twoDecimalChangeRate = (Math.round(data.fluctuation_rate * 100) / 100).toFixed(2);
      setPriceChangeRate(`+${twoDecimalChangeRate}`);
      setTextColor("text-red-500");
    }else if(data && data.fluctuation_rate < 0){
      const twoDecimalChangeRate = (Math.round(data.fluctuation_rate * 100) / 100).toFixed(2);
      setPriceChangeRate(`${twoDecimalChangeRate}`);
      setTextColor("text-blue-500");
    }else{
      setPriceChangeRate("0");
    }
  },[data]);

  return (
    <div className='w-[20%] h-[80%]'>
      <div className='w-full h-[30%] flex justify-center items-end text-xxs'>토큰 가격</div>
      <div className='w-full h-[40%] flex justify-center items-center'>
        {data?.current_price + "원"}
      </div>
      <div className={`w-full h-[30%] flex justify-center items-center ${textColor} text-xxs`}>
        {priceChangeRate}
      </div>
    </div>
  )
}

export default PropertyPrice;