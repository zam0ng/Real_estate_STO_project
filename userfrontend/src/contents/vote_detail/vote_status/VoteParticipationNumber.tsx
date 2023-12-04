import React from 'react';

interface TotalUsedVotesProps {
  totalVotes: number;
  usedVotes: number;
  tokenSymbol: string;
}

const VoteParticipationNumber: React.FC<TotalUsedVotesProps> = ({totalVotes,usedVotes,tokenSymbol}) => {
  return (
    <div className='w-full h-16'>
        <div className='w-full h-1/2 flex justify-between items-center'>
            전체 투표권 : <span>{`${totalVotes} ${tokenSymbol}`}</span>
        </div>
        <div className='w-full h-1/2 flex justify-between items-start'>
            참여 투표권 : <span>{`${usedVotes} ${tokenSymbol}`}</span>
        </div>
    </div>
  )
}

export default VoteParticipationNumber;