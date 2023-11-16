import React from 'react';

interface CompletionProps {
  completionRate: number | undefined;
}

const ParticipationRate: React.FC<CompletionProps> = ({completionRate}) => {
  return (
    <>
      <div className='w-full h-2/5 text-xxs flex justify-center items-end'>청약 모집률</div>
      <div className='w-full h-3/5 text-lg flex justify-center items-start'>{completionRate}%</div>
    </>
  )
}

export default ParticipationRate;