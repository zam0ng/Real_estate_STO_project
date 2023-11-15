import React, { useContext } from 'react';
import { MarketDetailContext } from '../../../../pages/MarketDetail';

const BuildingValue: React.FC = () => {
  const data = useContext(MarketDetailContext);
  const todayDate = new Date();

  const currentYear = todayDate.getFullYear().toString();
  const currentYearTwo = currentYear.slice(-2);

  const currentMonth = todayDate.getMonth() + 1;

  const currentDay = todayDate.getDate();
  

  return (
    <div className='w-[20%] h-[80%]'>
      <div className='w-full h-[30%] flex justify-center items-end text-xxs'>건물가치</div>
      <div className='w-full h-[40%] flex justify-center items-center'>
        {data?.value+"원"}
      </div>
      <div className='w-full h-[30%] flex justify-center items-center text-xxs'>
        {`${currentYearTwo}.${currentMonth}.${currentDay}`}
      </div>
    </div>
  )
}

export default BuildingValue;