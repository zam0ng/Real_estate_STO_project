import React, { useContext, useEffect, useState } from 'react'
import { MarketDetailContext } from '../../../../pages/MarketDetail';
import { TokenSymbolRequest } from '../../../market/on_sale_list/property/PropertyBox';
import axios from 'axios';
import { serverurl } from '../../../../components/serverurl';
import { useQuery } from '@tanstack/react-query';

const fetchTokenSymbol = async (propertyName: string): Promise<TokenSymbolRequest[]> => {
  const response = await axios.get(`${serverurl}/vote/token_contract_address`,{
    params: {
      real_estate_name: propertyName
    }
  });
  return response.data;
}

const PropertyPrice: React.FC = () => {
  const data = useContext(MarketDetailContext);
  // console.log(data);

  const [tokenSymbol,setTokenSymbol] = useState<string>("");

  const [textColor,setTextColor] = useState<string>("");
  const [priceChangeRate,setPriceChangeRate] = useState<string>("");

  const {data:tokenData,error,isLoading,isError} = useQuery<TokenSymbolRequest[]>({
    queryKey: ["fetchTokenSymbol",data!['Subscription.subscription_name']],
    queryFn: ()=>fetchTokenSymbol(data!['Subscription.subscription_name'])
  });

  useEffect(()=>{
    // console.log(tokenData);
    if(tokenData){
      if(tokenData.length !== 0){
        setTokenSymbol(tokenData[0].symbol);
      }else{
        setTokenSymbol("TOK");
      }
    }
  },[tokenData]);

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
      <div className='w-full h-[30%] flex justify-center items-end text-xxs'>1 {tokenSymbol} 가격</div>
      {data !== undefined && (
        <div className='w-full h-[40%] flex justify-center items-center'>
          {data?.current_price + "원"}
        </div>
      )}
      {data === undefined && (
        <div className='w-full h-[40%] flex justify-center items-center'>
          {"0 원"}
        </div>
      )}
      <div className={`w-full h-[30%] flex justify-center items-center ${textColor} text-xxs`}>
        {priceChangeRate}%
      </div>
    </div>
  )
}

export default PropertyPrice;