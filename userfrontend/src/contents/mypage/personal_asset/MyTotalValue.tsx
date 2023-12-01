import React from 'react';

interface MyTotalValueProps {
  appraise_balance : number|undefined;
}

const MyTotalValue: React.FC<MyTotalValueProps> = ({appraise_balance}) => {
  return (
    <div className='w-[50%] h-full flex flex-row'>
      <div className='w-[30%] h-full flex justify-center items-center text-sm'>
        총 평가
      </div>
      <div className='w-[70%] h-full flex justify-end items-center pr-2 text-sm'>
        {appraise_balance?.toLocaleString()}원
      </div>
    </div>
  )
}

export default MyTotalValue;