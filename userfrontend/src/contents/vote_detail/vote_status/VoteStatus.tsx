import React from 'react';
import VoteParticipationPercentage from './VoteParticipationPercentage';
import VoteStatusProgressBar from './VoteStatusProgressBar';
import VoteParticipationNumber from './VoteParticipationNumber';

const VoteStatus: React.FC = () => {
  return (
    <div className='w-full h-32 border-b border-slate-300'>
      <VoteParticipationPercentage />
      <VoteStatusProgressBar />
      <VoteParticipationNumber />
    </div>
  )
}

export default VoteStatus;