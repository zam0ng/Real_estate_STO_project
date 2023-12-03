import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhyDifferentInfo: React.FC = () => {
  const navigation = useNavigate();

  const goToWhyDifferent = ()=>{
    navigation("/market/detail/why-different-prices");
  };

  return (
    <div className='w-[90%] h-7 font-bold flex justify-center items-center bg-[#EDF0F4] rounded-lg shadow-neu2' 
    onClick={goToWhyDifferent}>
      토큰당 가격과 건물 가치가 다른 이유는 ?
    </div>
  )
}

export default WhyDifferentInfo;