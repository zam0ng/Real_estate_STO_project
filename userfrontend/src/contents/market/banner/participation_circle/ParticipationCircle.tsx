import React from 'react';
import ParticipationRate from './ParticipationRate';

interface CompletionProps {
  completionRate: number | undefined;
}
{/* <div className='w-16 h-16 border border-black rounded-full flex flex-col justify-center items-center mt-2 mr-2'>
        <ParticipationRate completionRate={completionRate} />
    </div> */}

const ParticipationCircle: React.FC<CompletionProps> = ({completionRate}) => {
  return (
    <div className="w-16 h-16 relative flex flex-col justify-center items-center bg-gray-200 rounded-full">
      <div className="absolute top-0 w-full h-full rounded-full" 
      style={{background: `conic-gradient(rgb(125,211,252) 0% ${completionRate}%, transparent ${completionRate}% 100%`}}>
      </div>
      <ParticipationRate completionRate={completionRate} />
    </div>
  )
}

export default ParticipationCircle;