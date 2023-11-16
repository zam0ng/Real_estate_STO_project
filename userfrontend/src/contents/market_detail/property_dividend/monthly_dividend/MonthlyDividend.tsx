import React from 'react';
import DividendDate from './DividendDate';
import DividendAmount from './DividendAmount';

const MonthlyDividend: React.FC = () => {
  return (
    <div className='w-[80%] h-44 border border-black rounded-lg'>
      <DividendDate />
      <DividendAmount />
    </div>
  )
}

export default MonthlyDividend;