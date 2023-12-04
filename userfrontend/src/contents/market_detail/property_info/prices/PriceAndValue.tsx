import React from 'react'
import BuildingValue from './BuildingValue';
import PropertyPrice from './PropertyPrice';
import PriceDifference from './PriceDifference';

const PriceAndValue: React.FC = () => {
  return (
    <div className='w-[90%] h-[35%]  flex flex-row items-center justify-around  bg-[#EDF0F4] rounded-xl shadow-innerneu2'>
        <BuildingValue />
        <div className='h-[55%] border border-slate-300'></div>
        <PropertyPrice />
        <div className='h-[55%] border border-slate-300'></div>
        <PriceDifference />
    </div>
  )
}

export default PriceAndValue;