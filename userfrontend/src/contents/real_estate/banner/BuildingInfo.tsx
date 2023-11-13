import React from 'react';
import ParticipationCircle from './participation_circle/ParticipationCircle';

const BuildingInfo: React.FC = () => {
  return (
    <div className='w-[85%] h-24 flex flex-row justify-between m-4'>
      <div className='w-[90%] h-full flex flex-col'>
        <div className='w-full h-1/3 text-sm'>매출의 15% 이상 월 배당</div>
        <div className='w-full h-1/3 text-2xl'>{/* property name */}수원 행궁 뉴스 뮤지엄</div>
        <div className='w-full h-1/3 text-xs-sm flex items-end'>청약 마감까지 10일 남았습니다!</div>
      </div>
      <div>
        <ParticipationCircle />
      </div>
    </div>
  )
}

export default BuildingInfo;