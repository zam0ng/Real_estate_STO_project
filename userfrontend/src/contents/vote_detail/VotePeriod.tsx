import React, { useEffect, useState } from 'react';

interface VotePeriodProps {
  startDate: number;
  endDate: number;
}

const VotePeriod: React.FC<VotePeriodProps> = ({startDate,endDate}) => {
  const [digitStartMonth,setDigitStartMonth] = useState<string>("");
  const [digitEndMonth,setDigitEndMonth] = useState<string>("");

  const [digitStartDay,setDigitStartDay] = useState<string>("");
  const [digitEndDay,setDigitEndDay] = useState<string>("");

  const startTime = new Date(Number(startDate) * 1000);
  const startYear = startTime.getFullYear().toString().slice(-2);
  const startMonth = startTime.getMonth() + 1;
  useEffect(()=>{
    if(startMonth < 10){
      setDigitStartMonth(`0${startMonth}`);
    }else{
      setDigitStartMonth(`${startMonth}`);
    }
  },[startMonth])
  const startDay = startTime.getDate();
  useEffect(()=>{
    if(startDay < 10){
      setDigitStartDay(`0${startDay}`);
    }else{
      setDigitStartDay(`${startDay}`);
    };
  },[startDay]);

  const endTime = new Date(Number(endDate) * 1000);
  const endYear = endTime.getFullYear().toString().slice(-2);
  const endMonth = endTime.getMonth() + 1;
  useEffect(()=>{
    if(endMonth < 10){
      setDigitEndMonth(`0${endMonth}`);
    }else{
      setDigitEndMonth(`${endMonth}`);
    }
  },[endMonth]);
  const endDay = endTime.getDate();
  useEffect(()=>{
    if(endDay < 10){
      setDigitEndDay(`0${endDay}`);
    }else{
      setDigitEndDay(`${endDay}`);
    }
  },[endDay]);

  return (
    <div className='w-full h-10'>
      투표 기간 : {`${startYear}.${digitStartMonth}.${digitStartDay} - ${endYear}.${digitEndMonth}.${digitEndDay}`}
    </div>
  )
}

export default VotePeriod;