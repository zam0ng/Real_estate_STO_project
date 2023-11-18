import React from 'react';

interface BuyBoxProps {
    price: number;
    amount: string;
}

const BuyPriceBox: React.FC<BuyBoxProps> = ({price,amount}) => {
  return (
    <div className='w-full h-8 flex flex-row bg-red-200 border-t border-b border-white'>
        <div className='w-2/5 h-full'>
    
        </div>
        <div className='w-1/5 h-full flex justify-center items-center'>
            {price}
        </div>
        <div className='w-2/5 h-full flex justify-start items-center text-xs pl-5'>
            {amount}
        </div>
    </div>
  )
}

export default BuyPriceBox;