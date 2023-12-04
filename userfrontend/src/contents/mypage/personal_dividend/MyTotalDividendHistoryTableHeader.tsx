import React from 'react';

const MyTotalDividendHistoryTableHeader: React.FC = () => {
  return (
    <div className='w-full h-8 rounded-lg flex flex-row text-xs bg-slate-200'>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-white'>
            부동산
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-white'>
            기준일
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-white'>
            지급일
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-white text-center'>
            토큰당 <br/>배당금
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-white'>
            총 배당금
        </div>
        <div className='w-1/6 h-full flex justify-center items-center'>
            지급여부
        </div>
    </div>
  )
}

export default MyTotalDividendHistoryTableHeader;