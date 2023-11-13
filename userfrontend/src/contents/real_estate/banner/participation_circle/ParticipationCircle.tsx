import React from 'react';
import ParticipationRate from './ParticipationRate';

const ParticipationCircle = () => {
  return (
    <div className='w-16 h-16 border border-black rounded-full flex flex-col justify-center items-center mt-2 mr-2'>
        <ParticipationRate />
    </div>
  )
}

export default ParticipationCircle;