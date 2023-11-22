import React from 'react';

const MyTotalValue: React.FC = () => {
  return (
    <div className='w-[50%] h-full flex flex-row'>
      <div className='w-[30%] h-full flex justify-center items-center'>
        총 평가
      </div>
      <div className='w-[70%] h-full flex justify-end items-center pr-2'>
        2,000,000원
      </div>
    </div>
  )
}

export default MyTotalValue;