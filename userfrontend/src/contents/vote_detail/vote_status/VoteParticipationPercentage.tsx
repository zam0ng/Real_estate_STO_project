import React, { useEffect, useState } from 'react';

interface TotalUsedVotesProps {
  totalVotes: number;
  usedVotes: number;
}

const VoteParticipationPercentage: React.FC<TotalUsedVotesProps> = ({totalVotes,usedVotes}) => {
  const [participationRate,setParticipationRate] = useState<number>(0);

  useEffect(()=>{
    setParticipationRate(Math.round((usedVotes/totalVotes) * 100));
  },[totalVotes,usedVotes]);

  return (
    <div className='w-full h-8 flex justify-start items-end'>
        투표율 {participationRate}%
    </div>
  )
}

export default VoteParticipationPercentage;