import React from 'react';

interface MyTotalValueProps {
  appraise_balance : number|undefined;
}

const MyTotalValue: React.FC<MyTotalValueProps> = ({appraise_balance}) => {
  return (
    <div className='w-[50%] h-full flex flex-row'>
      <div className='w-[35%] h-full flex justify-center items-center text-xs-sm'>
        총 평가
      </div>
      <div className='w-[65%] h-full flex justify-end items-center pr-2 text-xs-sm'>
        {appraise_balance ? appraise_balance.toLocaleString() : "0"}
      </div>
    </div>
  )
}

export default MyTotalValue;