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
    <div className='fixed w-full bottom-0 left-0 h-16 border-t border-slate-200 flex justify-center items-center bg-white z-10'>
      <div className='w-[85%] h-10 flex justify-center items-center border border-black rounded-lg mt-5 mb-5 
      bg-black text-white z-20' onClick={goToDeal}>
        거래하기
      </div>
    </div>
  )
}

export default ToDealPage;