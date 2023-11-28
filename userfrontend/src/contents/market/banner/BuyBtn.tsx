import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionIdProps {
  id: number;
}

const BuyBtn: React.FC<SubscriptionIdProps> = ({id}) => {
  const navigation = useNavigate();

  const toSubscriptionPage = ()=>{
    navigation(`/subscription/detail/${id}`)
  };

  return (
    <div className='w-[85%] h-12 border border-black rounded-lg mb-4 bg-black text-sm text-white
    flex justify-center items-center' onClick={toSubscriptionPage}>
      바로 구매하기
    </div>
  )
}

export default BuyBtn;