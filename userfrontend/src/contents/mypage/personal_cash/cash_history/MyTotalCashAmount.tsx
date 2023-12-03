import React from 'react';

interface TotalBalanceProps {
  balance: number;
}

const MyTotalCashAmount: React.FC<TotalBalanceProps> = ({balance}) => {
  
  return (
    <div className='w-full h-[50%] flex justify-end items-start text-sm'>
        {balance.toLocaleString()} 원
    </div>
  )
}

export default MyTotalCashAmount;