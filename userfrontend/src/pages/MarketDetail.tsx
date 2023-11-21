import React, { createContext, useEffect } from 'react'
import PropertyImg from '../contents/market_detail/layout/PropertyImg';
import PropertyWordBox from '../contents/market_detail/layout/PropertyWordBox';
import { useLocation } from 'react-router-dom';
import { PropertyInfo } from '../contents/market/on_sale_list/PropertyListBox';
import { useQuery } from 'react-query';
import { serverurl } from '../components/serverurl';
interface MarketDetailRequest {
  current_price: number;
  value: number;
  fluctuation_rate: number;
  rating: number;
  "Subscription.subscription_img": string;
  "Subscription.subscription_description": string;
  "Subscription.subscription_name": string;
  "Subscription.subscription_address": string;
  dividend_price: number;
  dividend_basedate: Date;
  dividend_paymentdate: Date;
}

interface PropertyDataProps {
  propertyData: PropertyInfo | undefined;
}

export const MarketDetailContext = createContext<MarketDetailRequest | undefined>(undefined);

const MarketDetail: React.FC = () => {
  const currentPage = useLocation();
  const {propertyData} = currentPage.state as PropertyDataProps;
  const propertyName = propertyData && propertyData['Subscription.subscription_name'];

  const queryMarketDetail = async (): Promise<MarketDetailRequest> => {
    if(!propertyName){
      throw new Error("no property name");
    };

    const response = await fetch(`${serverurl}/market/detail/${propertyName}`);
    if(!response.ok){
      throw new Error("Could not fetch data from /market/detail");
    };
    return response.json();
  };

  const {data,error,isLoading,isError} = useQuery<MarketDetailRequest,Error>(
    ["marketDetailData",propertyName],
    queryMarketDetail,
    {enabled: !!propertyName}
  );
  // console.log(data);

  if(isLoading){
    return (
      <div>isLoading</div>
    )
  };

  if(isError){
    return (
      <div>Error: {error.message}</div>
    )
  };

  return (
    <MarketDetailContext.Provider value={data}>
      <div className='w-screen h-screen overflow-x-hidden'>
        <PropertyImg />
        <PropertyWordBox />
      </div>
    </MarketDetailContext.Provider>
  )
}

export default MarketDetail;