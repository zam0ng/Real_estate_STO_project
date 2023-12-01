import React, { useEffect, useState } from 'react';

interface VotePeriodProps {
  vote_start_date: string;
  vote_end_date: string;
}

const VoteListItemPeriod: React.FC<VotePeriodProps> = ({vote_start_date,vote_end_date}) => {
  const [digitStartMonth,setDigitStartMonth] = useState<string>("");
  const [digitEndMonth,setDigitEndMonth] = useState<string>("");

  const [digitStartDay,setDigitStartDay] = useState<string>("");
  const [digitEndDay,setDigitEndDay] = useState<string>("");

  const startDate = new Date(vote_start_date);
  const startMonth = startDate.getMonth() + 1;
  useEffect(()=>{
    if(startMonth < 10){
      setDigitStartMonth(`0${startMonth}`);
    }else{
      setDigitStartMonth(`${startMonth}`);
    }
  },[startMonth]);
  const startDay = startDate.getDate();
  useEffect(()=>{
    if(startDay < 10){
      setDigitStartDay(`0${startDay}`);
    }else{
      setDigitStartDay(`${startDay}`);
    };
  },[startDay]);

  const endDate = new Date(vote_end_date);
  const endMonth = endDate.getMonth() + 1;
  useEffect(()=>{
    if(endMonth < 10){
      setDigitEndMonth(`0${endMonth}`);
    }else{
      setDigitEndMonth(`${endMonth}`);
    }
  },[endMonth]);
  const endDay = endDate.getDate();
  useEffect(()=>{
    if(endDay < 10){
      setDigitEndDay(`0${endDay}`);
    }else{
      setDigitEndDay(`${endDay}`);
    }
  },[endDay]);
  
  return (
    <div className='w-full h-1/3 text-sm text-slate-400'>
        투표기간 : {`${digitStartMonth}.${digitStartDay} - ${digitEndMonth}.${digitEndDay}`}
    </div>
  )
}

export default VoteListItemPeriod;