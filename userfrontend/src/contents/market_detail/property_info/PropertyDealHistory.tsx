import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketDetailContext } from '../../../pages/MarketDetail';

const PropertyDealHistory: React.FC = () => {
    const navigation = useNavigate();
    const data = useContext(MarketDetailContext);
    const propertyName = data?.['Subscription.subscription_name'];

    const goToHistory = ()=>{
        navigation(`/market/history/${propertyName}`,{ state : {propertyName : propertyName}});
    };
  
    return (
        <div className='w-[20%] h-5 rounded-md text-xs flex justify-center items-center mr-5
         bg-blue-500 text-white' onClick={goToHistory}>
            체결내역
        </div>
    )
}

export default PropertyDealHistory;