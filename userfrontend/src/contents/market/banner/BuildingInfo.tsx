import React from 'react';
import ParticipationCircle from './participation_circle/ParticipationCircle';

interface InfoProps {
  name: string;
  description: string;
  completionRate: number | undefined;
  restdate: number;
}

const BuildingInfo: React.FC<InfoProps> = ({name,description,completionRate,restdate}) => {
  return (
    <div className='w-[85%] h-24 flex flex-row justify-between m-4'>
      <div className='w-[90%] h-full flex flex-col'>
        <div className='w-full h-1/3 text-sm'>{description}</div>
        <div className='w-full h-1/3 text-2xl'>{name}</div>
        <div className='w-full h-1/3 text-xs-sm flex items-end'>청약 마감까지 {restdate}일 남았습니다!</div>
      </div>
      <div>
        <ParticipationCircle completionRate={completionRate} />
      </div>
    </div>
  )
}

export default BuildingInfo;