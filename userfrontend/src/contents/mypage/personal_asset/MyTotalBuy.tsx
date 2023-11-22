import React from 'react';

const MyTotalBuy: React.FC = () => {
  return (
    <div className='w-[50%] h-full border-r border-black flex flex-row'>
      <div className='w-[30%] h-full flex justify-center items-center'>
        총 매입
      </div>
      <div className='w-[70%] h-full flex justify-end items-center pr-2'>
        2,000,000원
      </div>
    </div>
  )
}

export default MyTotalBuy;