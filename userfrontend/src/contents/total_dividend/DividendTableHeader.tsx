import React from 'react';

const DividendTableHeader: React.FC = () => {
  return (
    <div className='w-[90%] h-[8%] border border-black flex flex-row rounded-lg bg-slate-100 shadow-md mt-3'>
        <div className='w-[30%] h-full text-xs-sm flex justify-center items-center'>기준일</div>
        <div className='w-[30%] h-full text-xs-sm flex justify-center items-center'>지급일</div>
        <div className='w-[40%] h-full text-xs-sm flex justify-center items-center'>토큰당 배당금</div>
    </div>
  )
}

export default DividendTableHeader;