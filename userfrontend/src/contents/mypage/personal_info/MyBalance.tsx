import React from 'react';

interface UserBalanceProps {
  balance: number|undefined;
}

const MyBalance: React.FC<UserBalanceProps> = ({balance}) => {
  const moneyForm = balance?.toLocaleString();
  return (
    <div className='w-full h-[10%] flex justify-center items-center text-2xl'>
        {moneyForm}원
    </div>
  )
}

export default MyBalance;