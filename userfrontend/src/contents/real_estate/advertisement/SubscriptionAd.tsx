import React from 'react';

const SubscriptionAd: React.FC = () => {
  return (
    <div className='w-[80%] h-15 border border-black rounded-lg flex flex-col justify-center bg-sky-700'>
      <div className='w-full h-full flex justify-center items-center text-white'>10월 25일 공모 시작!</div>
      <div className='w-full h-full flex justify-center items-center text-xs text-white'>
        {/* property name */}
        소유 10호 수원 행궁 뉴스 뮤지엄
      </div>
    </div>
  )
}

export default SubscriptionAd;