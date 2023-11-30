import React, { useEffect, useState } from 'react';

interface VotePeriodProps {
  startDate: number;
  endDate: number;
}

const VotePeriod: React.FC<VotePeriodProps> = ({startDate,endDate}) => {
  const [startTime,setStartTime] = useState<string>("");
  const [endTime,setEndTime] = useState<string>("");

  useEffect(()=>{
    const newStartDate = new Date(Number(startDate) * 1000);
    const newStartYear = newStartDate.getFullYear().toString().slice(-2);
    const newStartMonth = newStartDate.getMonth() + 1;
    const newStartDay = newStartDate.getDate();
    setStartTime(`${newStartYear}.${newStartMonth}.${newStartDay}`);

    const newEndDate = new Date(Number(endDate) * 1000);
    const newEndYear = newEndDate.getFullYear().toString().slice(-2);
    const newEndMonth = newEndDate.getMonth() + 1;
    const newEndDay = newEndDate.getDate();
    setEndTime(`${newEndYear}.${newEndMonth}.${newEndDay}`);
  },[startDate,endDate]);

  return (
    <div className='w-full h-10'>
      투표 기간 : {startTime} - {endTime}
    </div>
  )
}

export default VotePeriod;