import React from 'react';

interface MyBalanceProps {
  balance: number|undefined;
}

const MyTotalBuy: React.FC<MyBalanceProps> = ({balance}) => {
  return (
    <div className='w-[50%] h-full border-r border-slate-200 flex flex-row'>
      <div className='w-[30%] h-full flex justify-center items-center text-sm'>
        총 매입
      </div>
      <div className='w-[70%] h-full flex justify-end items-center pr-2 text-sm'>
        {balance}원
      </div>
    </div>
  )
}

export default MyTotalBuy;