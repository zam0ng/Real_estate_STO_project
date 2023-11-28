import React from 'react';
import VoteAgreeNumber from './vote_status/agree_disagree/VoteAgreeNumber';
import VoteAgreeStatus from './vote_status/agree_disagree/VoteAgreeStatus';
import VoteDisagreeNumber from './vote_status/agree_disagree/VoteDisagreeNumber';
import VoteDisagreeStatus from './vote_status/agree_disagree/VoteDisagreeStatus';

const VoteCount: React.FC = () => {
  return (
    <div className='w-full h-32'>
      <VoteAgreeNumber />
      <VoteAgreeStatus />
      <VoteDisagreeNumber />
      <VoteDisagreeStatus />
    </div>
  )
}

export default VoteCount;