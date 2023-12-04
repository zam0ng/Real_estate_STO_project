import React, { useContext, useEffect, useState } from 'react';
import { MarketDetailContext } from '../../../../pages/MarketDetail';

const BuildingValue: React.FC = () => {
  const data = useContext(MarketDetailContext);

  const [digitMonth,setDigitMonth] = useState<string>("");
  const [digitDay,setDigitDay] = useState<string>("");

  const todayDate = new Date();

  const currentYear = todayDate.getFullYear().toString();
  const currentYearTwo = currentYear.slice(-2);

  const currentMonth = todayDate.getMonth() + 1;

  const currentDay = todayDate.getDate();

  useEffect(()=>{
    if(currentMonth < 10){
      setDigitMonth(`0${currentMonth}`);
    }else{
      setDigitMonth(`${currentMonth}`);
    }
  },[data]);

  useEffect(()=>{
    if(currentDay < 10){
      setDigitDay(`0${currentDay}`);
    }else{
      setDigitDay(`${currentDay}`);
    }
  },[data]);

  return (
    <div className='w-[20%] h-[80%]'>
      <div className='w-full h-[30%] flex justify-center items-end text-xxs'>건물가치</div>
      {data !== undefined && (
        <div className='w-full h-[40%] flex justify-center items-center'>
          {data?.value+"원"}
        </div>
      )}
      {data === undefined && (
        <div className='w-full h-[40%] flex justify-center items-center'>
          {"0 원"}
        </div>
      )}
      <div className='w-full h-[30%] flex justify-center items-center text-xxs'>
        {`${currentYearTwo}.${currentMonth}.${currentDay}`}
      </div>
    </div>
  )
}

export default BuildingValue;