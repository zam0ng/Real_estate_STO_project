import React from 'react';
import VoteTitle from '../VoteTitle';
import VotePeriod from '../VotePeriod';
import VotePropertyImg from '../VotePropertyImg';
import VoteStatus from '../vote_status/VoteStatus';
import VoteAdditionalInfo from '../VoteAdditionalInfo';
import VoteBtns from '../vote_status/agree_disagree/VoteBtns';
import VoteCount from '../VoteCount';

const VoteDetailBody: React.FC = () => {
  return (
    <div className='w-full h-fit flex flex-col'>
        <VoteTitle />
        <VotePeriod />
        <VotePropertyImg />
        <VoteStatus />
        <VoteBtns />
        <VoteCount />
    </div>
  )
}

export default VoteDetailBody;