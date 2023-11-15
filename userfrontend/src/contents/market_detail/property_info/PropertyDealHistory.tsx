import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketDetailContext } from '../../../pages/MarketDetail';

const PropertyDealHistory: React.FC = () => {
    const navigation = useNavigate();
    const data = useContext(MarketDetailContext);

    const goToHistory = ()=>{
        navigation(`/market/history/${data?.['Subscription.subscription_name']}`);
    };
  
    return (
        <div className='w-[20%] h-5 rounded-md text-xs flex justify-center items-center mr-5
         bg-blue-500 text-white' onClick={goToHistory}>
            체결내역
        </div>
    )
}

export default PropertyDealHistory;