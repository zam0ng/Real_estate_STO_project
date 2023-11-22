import React from 'react';

const MyTotalDividendHistoryTableHeader: React.FC = () => {
  return (
    <div className='w-[90%] h-1/4 border border-black rounded-lg flex flex-row text-xs-sm bg-slate-200'>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-black'>
            부동산
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-black'>
            기준일
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-black'>
            지급일
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-black'>
            1TOK당 배당금
        </div>
        <div className='w-1/6 h-full flex justify-center items-center border-r border-black'>
            총 배당금
        </div>
        <div className='w-1/6 h-full flex justify-center items-center'>
            지급여부
        </div>
    </div>
  )
}

export default MyTotalDividendHistoryTableHeader;