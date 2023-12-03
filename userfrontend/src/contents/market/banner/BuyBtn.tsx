import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionIdProps {
  id: number;
  restdate: number;
}

const BuyBtn: React.FC<SubscriptionIdProps> = ({id,restdate}) => {
  const navigation = useNavigate();

  const toSubscriptionPage = ()=>{
    navigation(`/subscription/detail/${id}`)
  };

  return (
    <>
      {restdate && restdate < 0 && (
        <div className='w-[85%] h-12  bg-slate-300 text-slate-500 rounded-lg mb-4  text-sm 
        flex justify-center items-center' onClick={toSubscriptionPage}>
          청약 종료
        </div>
      )}
      {restdate && restdate >= 0 && (
        <div className='w-[85%] h-12  bg-blue-950 text-white rounded-lg mb-4  text-sm 
        flex justify-center items-center' onClick={toSubscriptionPage}>
          바로 청약하기
        </div>
      )}
    </>
    
  )
}

export default BuyBtn;