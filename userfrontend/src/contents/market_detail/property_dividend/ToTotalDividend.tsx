import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MarketDetailContext } from '../../../pages/MarketDetail';

const ToTotalDividend: React.FC = () => {
  const navigation = useNavigate();
  const data = useContext(MarketDetailContext);
  const propertyName = data?.['Subscription.subscription_name'];

  const goToTotalDividend = ()=>{
    navigation("/market/detail/total-dividend",{state: {propertyName: propertyName}});
  };

  return (
    <div className='w-[50%] h-10 border border-black flex justify-center items-center rounded-lg text-sm'
    onClick={goToTotalDividend}>
      전체 수익 보러 가기
    </div>
  )
}

export default ToTotalDividend;