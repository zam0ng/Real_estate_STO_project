import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ToDealPage: React.FC = () => {
  const currentPage = useLocation();
  const propertyName = currentPage.state.propertyData["Subscription.subscription_name"];

  const navigation = useNavigate();

  const goToDeal = ()=>{
    navigation(`/deal/${propertyName}`,{state: {propertyName: propertyName}});
  };

  return (
    <div className='w-[85%] h-14 flex justify-center items-center border border-black rounded-lg mt-5 mb-5 
    bg-black text-white' onClick={goToDeal}>
      거래하기
    </div>
  )
}

export default ToDealPage;