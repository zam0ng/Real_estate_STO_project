import React from 'react';

const MyTotalDividendHistoryTableBody: React.FC = () => {
  return (
    <div className='w-[90%] h-1/4 rounded-lg flex flex-row text-xs-sm'>
        <div className='w-1/6 h-full flex justify-center items-center'>
            문래 공차
        </div>
        <div className='w-1/6 h-full flex justify-center items-center'>
            23.11.30
        </div>
        <div className='w-1/6 h-full flex justify-center items-center'>
            23.11.30
        </div>
        <div className='w-1/6 h-full flex justify-center items-center'>
            10원
        </div>
        <div className='w-1/6 h-full flex justify-center items-center'>
            20원
        </div>
        <div className='w-1/6 h-full flex justify-center items-center'>
            예정/완료
        </div>
    </div>
  )
}

export default MyTotalDividendHistoryTableBody;