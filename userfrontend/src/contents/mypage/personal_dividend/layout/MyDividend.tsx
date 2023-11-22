import React from 'react';
import MyTotalDividend from '../MyTotalDividend';
import MyTotalDividendHistoryTable from '../MyTotalDividendHistoryTable';

const MyDividend: React.FC = () => {
  return (
    <div className='w-[90%] h-96 mt-5 border border-slate-200 rounded-lg shadow-lg pl-5 pr-5'>
      <div className='w-full h-[30%] flex justify-start items-center text-xl'>
        배당금 상세
      </div>
      <MyTotalDividend />
      <MyTotalDividendHistoryTable />
    </div>
  )
}

export default MyDividend;