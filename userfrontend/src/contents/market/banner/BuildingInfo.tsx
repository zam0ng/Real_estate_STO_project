import React, { useEffect, useState } from 'react';
import ParticipationCircle from './participation_circle/ParticipationCircle';

interface InfoProps {
  name: string;
  description: string;
  completionRate: number | undefined;
  restdate: number;
}

const BuildingInfo: React.FC<InfoProps> = ({name,description,completionRate,restdate}) => {
  const [dueDate,setDueDate] = useState<string>("");

  useEffect(()=>{
    if(restdate < 0){
      setDueDate("청약이 종료되었습니다.");
    }else if(restdate === 0){
      setDueDate("청약이 오늘 마감됩니다!");
    }else{
      setDueDate(`청약 마감까지 ${restdate}일 남았습니다!`);
    }
  },[restdate]);

  return (
    <div className='w-[85%] h-24 flex flex-row justify-between m-4'>
      <div className='w-[70%] h-full flex flex-col'>
        <div className='w-full h-1/3 text-sm'>{description}</div>
        <div className='w-full h-1/3 text-xl'>{name}</div>
        <div className='w-[120%] h-1/3 text-xs-sm flex items-end'>
          {dueDate}
        </div>
      </div>
      <div>
        <ParticipationCircle completionRate={completionRate} />
      </div>
    </div>
  )
}

export default BuildingInfo;