import React, { useEffect, useState } from 'react';
import VoteAgreeNumber from './vote_status/agree_disagree/VoteAgreeNumber';
import VoteAgreeStatus from './vote_status/agree_disagree/VoteAgreeStatus';
import VoteDisagreeNumber from './vote_status/agree_disagree/VoteDisagreeNumber';
import VoteDisagreeStatus from './vote_status/agree_disagree/VoteDisagreeStatus';

interface AgreeDisagreeProps {
  agreeVotes: number;
  disagreeVotes: number;
  totalVotes: number;
}

const VoteCount: React.FC<AgreeDisagreeProps> = ({agreeVotes,disagreeVotes,totalVotes}) => {
  const [agreeNumber,setAgreeNumber] = useState<number>(0);
  const [disagreeNumber,setDisagreeNumber] = useState<number>(0);
  const [totalNumber,setTotalNumber] = useState<number>(0);

  useEffect(()=>{
    setAgreeNumber(Number(agreeVotes));
    setDisagreeNumber(Number(disagreeVotes));
    setTotalNumber(Number(totalVotes));
  },[agreeVotes,disagreeVotes,totalVotes]);

  return (
    <div className='w-full h-32'>
      <VoteAgreeNumber agreeVotes={agreeNumber} totalVotes={totalNumber} />
      <VoteAgreeStatus agreeVotes={agreeNumber} totalVotes={totalNumber} />
      <VoteDisagreeNumber disagreeVotes={disagreeNumber} totalVotes={totalNumber} />
      <VoteDisagreeStatus disagreeVotes={disagreeNumber} totalVotes={totalNumber} />
    </div>
  )
}

export default VoteCount;