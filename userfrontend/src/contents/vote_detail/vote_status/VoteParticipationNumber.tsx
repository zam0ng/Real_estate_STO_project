import React from 'react';

const VoteParticipationNumber: React.FC = () => {
  return (
    <div className='w-full h-16'>
        <div className='w-full h-1/2 flex justify-between items-center'>
            전체 투표권 : <span>{/* total supply */}160000</span>
        </div>
        <div className='w-full h-1/2 flex justify-between items-start'>
            참여 투표권 : <span>{/* used tokens */}100000</span>
        </div>
    </div>
  )
}

export default VoteParticipationNumber;