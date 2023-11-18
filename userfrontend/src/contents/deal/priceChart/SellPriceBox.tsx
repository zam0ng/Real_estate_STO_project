import React from 'react';

interface SellBoxProps {
  price: number;
  amount: string;
}

const SellPriceBox: React.FC<SellBoxProps> = ({price,amount}) => {
  return (
    <div className='w-full h-8 lg:text-base flex flex-row bg-blue-200 border-t border-b border-white'>
        {/* 수량 그래프 */}
        <div className='w-2/5 h-full flex justify-end items-center text-xs pr-5'>
            {amount}
        </div>
        <div className='w-1/5 h-full flex justify-center items-center'>
            {price}
        </div>
        <div className='w-2/5 h-full'>
        
        </div>
    </div>
  )
}

export default SellPriceBox;