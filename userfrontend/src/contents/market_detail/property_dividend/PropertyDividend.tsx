import React from 'react'
import MonthlyDividend from './monthly_dividend/MonthlyDividend';
import ToTotalDividend from './ToTotalDividend';

const PropertyDividend: React.FC = () => {
  return (
    <div className='w-full h-96 flex flex-col items-center justify-evenly'>
      <div className='w-full h-6 ml-7 text-lg'>배당금</div>
      <MonthlyDividend />
      <ToTotalDividend />
    </div>
  )
}

export default PropertyDividend;