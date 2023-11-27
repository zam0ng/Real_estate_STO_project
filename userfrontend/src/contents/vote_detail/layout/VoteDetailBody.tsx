import React from 'react';
import VoteTitle from '../VoteTitle';
import VotePeriod from '../VotePeriod';
import VotePropertyImg from '../VotePropertyImg';
import VoteStatus from '../VoteStatus';
import VoteAdditionalInfo from '../VoteAdditionalInfo';
import VoteOwned from '../VoteOwned';

const VoteDetailBody: React.FC = () => {
  return (
    <div className='w-full h-full flex flex-col overflow-y-scroll'>
        <VoteTitle />
        <VotePeriod />
        <VotePropertyImg />
        <VoteStatus />
        <VoteOwned />
        <VoteAdditionalInfo />
    </div>
  )
}

export default VoteDetailBody;