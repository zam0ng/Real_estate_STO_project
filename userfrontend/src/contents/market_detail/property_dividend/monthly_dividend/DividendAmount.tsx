import React, { useContext } from 'react';
import { MarketDetailContext } from '../../../../pages/MarketDetail';

const DividendAmount: React.FC = () => {
  const data = useContext(MarketDetailContext);
  // console.log(data);

  return (
    <div className='w-full h-[45%] flex justify-center items-center border-t border-dashed'>
      <div className='w-[70%] h-[75%] flex flex-col justify-center items-center  bg-[#EDF0F4] rounded-xl shadow-innerneu2'>
        <div className='w-full flex justify-center items-center'>
          {data?.dividend_price}원
        </div>
        <div className='w-full flex justify-center items-center text-xs-sm'>
          1당 배당금(세전)
        </div>
      </div>
    </div>
  )
}

export default DividendAmount;