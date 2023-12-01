import React from 'react';
import DividendDate from './DividendDate';
import DividendAmount from './DividendAmount';

const MonthlyDividend: React.FC = () => {
  return (
    <div className='w-[80%] h-44  bg-[#EDF0F4] rounded-xl shadow-innerneu2'>
      <DividendDate />
      <DividendAmount />
    </div>
  )
}

export default MonthlyDividend;