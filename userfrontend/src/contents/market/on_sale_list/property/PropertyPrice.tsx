import React from 'react';

interface PriceProps {
  price: number;
  symbol: string;
}

const PropertyPrice: React.FC<PriceProps> = ({price,symbol}) => {
  return (
    <div className='w-full h-3/4 flex justify-end items-center pr-3'>
      <div className='w-1/2 h-full flex justify-end items-center text-sm text-gray-500'>1 {symbol} 가격</div>
      <div className='w-1/2 h-full flex justify-end items-center text-xl'>{`${price}원`}</div>
    </div>
  )
}

export default PropertyPrice;