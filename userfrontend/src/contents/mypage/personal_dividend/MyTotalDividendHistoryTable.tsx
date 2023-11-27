import React from 'react';
import MyTotalDividendHistoryTableHeader from './MyTotalDividendHistoryTableHeader';
import MyTotalDividendHistoryTableBody from './MyTotalDividendHistoryTableBody';


const MyTotalDividendHistoryTable: React.FC = () => {

  return (
    <div className='w-full h-[40%] flex flex-col justify-start items-center'>
      <MyTotalDividendHistoryTableHeader />
      <MyTotalDividendHistoryTableBody />
    </div>
  )
}

export default MyTotalDividendHistoryTable;