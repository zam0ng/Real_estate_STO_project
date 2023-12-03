import React, { useContext } from 'react';
import MyTotalDividendHistoryTableHeader from './MyTotalDividendHistoryTableHeader';
import MyTotalDividendHistoryTableBody from './MyTotalDividendHistoryTableBody';
import { TotalDividendHistoryContext } from './layout/MyDividend';


const MyTotalDividendHistoryTable: React.FC = () => {
  const myDividendHistory = useContext(TotalDividendHistoryContext);

  if(myDividendHistory && myDividendHistory.length === 0){
    return (
      <div></div>
    )
  }

  return (
    <div className='w-full h-[45%] flex flex-col justify-center items-center'>
      <MyTotalDividendHistoryTableHeader />
      <MyTotalDividendHistoryTableBody />
    </div>
  )
}

export default MyTotalDividendHistoryTable;