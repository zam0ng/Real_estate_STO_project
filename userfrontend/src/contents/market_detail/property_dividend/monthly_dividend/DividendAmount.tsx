import React, { useContext, useEffect, useState } from 'react';
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

const DividendAmount: React.FC = () => {
  const data = useContext(MarketDetailContext);
  // console.log(data);

  const [tokenSymbol,setTokenSymbol] = useState<string>("");

  const {data:tokenData,error,isLoading,isError} = useQuery<TokenSymbolRequest[]>({
    queryKey: ["fetchTokenSymbol",data!['Subscription.subscription_name']],
    queryFn: ()=>fetchTokenSymbol(data!['Subscription.subscription_name'])
  });

  useEffect(()=>{
    console.log(tokenData);
    if(tokenData){
      if(tokenData.length !== 0){
        setTokenSymbol(tokenData[0].symbol);
      }else{
        setTokenSymbol("TOK");
      }
    }
  },[tokenData]);

  useEffect(()=>{
    console.log(data);
    console.log(data?.dividend_price);
  },[data]);

  return (
    <div className='w-full h-[45%] flex justify-center items-center border-t border-dashed'>
      <div className='w-[70%] h-[75%] flex flex-col justify-center items-center  bg-[#EDF0F4] rounded-xl shadow-innerneu2'>
        {data && data.dividend_price === undefined && (
          <div className='w-full flex justify-center items-center'>
            0 원
          </div>
        )}
        {data && data.dividend_price !== undefined && (
          <div className='w-full flex justify-center items-center'>
            {data.dividend_price} 원
          </div>
        )}
        <div className='w-full flex justify-center items-center text-xs-sm'>
          1 {tokenSymbol}당 배당금(세전)
        </div>
      </div>
    </div>
  )
}

export default DividendAmount;