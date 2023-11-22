import React from 'react';
import MySubscriptionList from '../MySubscriptionList';

const MySubscription: React.FC = () => {
  return (
    <div className='w-[90%] h-96 mt-5 border border-slate-200 rounded-lg shadow-lg'>
      <div className='w-full h-[20%] border-b border-black flex justify-start items-center'>
        내 청약 목록
      </div>
      <div className='w-full h-[80%] overflow-y-scroll'>
        <MySubscriptionList />
      </div>
    </div>
  )
}

export default MySubscription;