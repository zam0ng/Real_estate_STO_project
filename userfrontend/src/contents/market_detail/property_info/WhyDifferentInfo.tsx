import React from 'react';
import { useNavigate } from 'react-router-dom';

const WhyDifferentInfo: React.FC = () => {
  const navigation = useNavigate();

  const goToWhyDifferent = ()=>{
    navigation("/market/detail/why-different-prices");
  };

  return (
    <div className='w-[90%] h-7 rounded-lg bg-black text-white flex justify-center items-center' 
    onClick={goToWhyDifferent}>
      TOK 가격과 건물 가치가 다른 이유는 ?
    </div>
  )
}

export default WhyDifferentInfo;