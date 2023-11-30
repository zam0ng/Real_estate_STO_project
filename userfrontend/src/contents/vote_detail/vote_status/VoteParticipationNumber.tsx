import React from 'react';

interface TotalUsedVotesProps {
  totalVotes: number;
  usedVotes: number;
}

const VoteParticipationNumber: React.FC<TotalUsedVotesProps> = ({totalVotes,usedVotes}) => {
  return (
    <div className='w-full h-16'>
        <div className='w-full h-1/2 flex justify-between items-center'>
            전체 투표권 : <span>{totalVotes}</span>
        </div>
        <div className='w-full h-1/2 flex justify-between items-start'>
            참여 투표권 : <span>{usedVotes}</span>
        </div>
    </div>
  )
}

export default VoteParticipationNumber;