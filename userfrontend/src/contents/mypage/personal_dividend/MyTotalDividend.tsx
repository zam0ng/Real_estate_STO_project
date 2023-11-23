import React, { useContext } from 'react';
import { TotalDividendHistoryContext } from './layout/MyDividend';

const MyTotalDividend: React.FC = () => {
  const myDividendHistory = useContext(TotalDividendHistoryContext);

  if(myDividendHistory === undefined){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className='w-full h-[30%]'>
      <div className='w-full h-[40%] flex justify-center items-center'>
        총 누적 배당금
      </div>
      <div className='w-full h-[60%] flex justify-center items-start text-2xl font-medium'>
        {myDividendHistory[0].total_anticipation_dividend}원
      </div>
    </div>
  )
}

export default MyTotalDividend;