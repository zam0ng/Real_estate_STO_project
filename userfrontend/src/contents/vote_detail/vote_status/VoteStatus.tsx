import React, { useEffect, useState } from 'react';
import VoteParticipationPercentage from './VoteParticipationPercentage';
import VoteStatusProgressBar from './VoteStatusProgressBar';
import VoteParticipationNumber from './VoteParticipationNumber';

interface VoteStatusProps {
  totalVotes: number;
  usedVotes: number;
}

const VoteStatus: React.FC<VoteStatusProps> = ({totalVotes,usedVotes}) => {
  const [totalNumber,setTotalNumber] = useState<number>(0);
  const [usedNumber,setUsedNumber] = useState<number>(0);

  useEffect(()=>{
    setTotalNumber(Number(totalVotes));
    setUsedNumber(Number(usedVotes));
  },[totalVotes,usedVotes]);

  return (
    <div className='w-full h-32 border-b border-slate-300'>
      <VoteParticipationPercentage totalVotes={totalNumber} usedVotes={usedNumber} />
      <VoteStatusProgressBar totalVotes={totalNumber} usedVotes={usedNumber} />
      <VoteParticipationNumber totalVotes={totalNumber} usedVotes={usedNumber} />
    </div>
  )
}

export default VoteStatus;