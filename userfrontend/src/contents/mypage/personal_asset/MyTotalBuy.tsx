import React from 'react';

interface MyBalanceProps {
  total_buy: {
    total_buy: string;
  } | undefined
}

const MyTotalBuy: React.FC<MyBalanceProps> = ({total_buy}) => {
  // console.log(total_buy);

  return (
    <div className='w-[50%] h-full border-r border-slate-200 flex flex-row'>
      <div className='w-[35%] h-full flex justify-start items-center text-xs-sm'>
        총 매입
      </div>
      <div className='w-[65%] h-full flex justify-end items-center pr-2 text-xs-sm'>
        {total_buy ? Number(total_buy?.total_buy).toLocaleString() : "0"}
      </div>
    </div>
  )
}

export default MyTotalBuy;