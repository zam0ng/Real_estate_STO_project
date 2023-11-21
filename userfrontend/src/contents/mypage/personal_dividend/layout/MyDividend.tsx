import React from 'react';
import MyTotalDividend from '../MyTotalDividend';
import MyTotalDividendHistoryTable from '../MyTotalDividendHistoryTable';

const MyDividend: React.FC = () => {
  return (
    <div className='w-full h-96 border-b border-black'>
      <div className='w-full h-[30%] border-b border-black'>배당금 상세</div>
      <MyTotalDividend />
      <MyTotalDividendHistoryTable />
    </div>
  )
}

export default MyDividend;