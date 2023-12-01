import React, { useContext, useEffect, useState } from 'react';
import { TotalDividendHistoryContext } from './layout/MyDividend';

const MyTotalDividend: React.FC = () => {
  const myDividendHistory = useContext(TotalDividendHistoryContext);
  console.log(myDividendHistory);
  
  const [totalExpectedDividend,setTotalExpectedDividend] = useState<number>(0);

  useEffect(()=>{
    if(myDividendHistory && myDividendHistory.length !== 0){
      if(myDividendHistory[0].total_anticipation_dividend){
        setTotalExpectedDividend(myDividendHistory[0].total_anticipation_dividend);
      }else{
        setTotalExpectedDividend(0);
      }
    };
  },[totalExpectedDividend]);

  return (
    <div className='w-full h-24'>
      <div className='w-full h-[40%] flex justify-center items-center'>
        총 누적 배당금
      </div>
      <div className='w-full h-[60%] flex justify-center items-start text-2xl font-medium'>
        {totalExpectedDividend} 원
      </div>
    </div>
  )
}

export default MyTotalDividend;