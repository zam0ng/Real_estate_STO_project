import React, { useEffect, useState } from 'react';
import ProgressBar from '../../../components/ProgressBar';

interface TotalUsedVotesProps {
  totalVotes: number;
  usedVotes: number;
}

const VoteStatusProgressBar: React.FC<TotalUsedVotesProps> = ({totalVotes,usedVotes}) => {
  const [participationRate,setParticipationRate] = useState<number>(0);

  useEffect(()=>{
    setParticipationRate(Math.round((usedVotes/totalVotes) * 100));
  },[totalVotes,usedVotes]);

  return (
    <div className=" bg-gray-300 rounded-full h-2 mx-auto m-3">
        <div className="bg-blue-500 h-2 rounded-full" style={{width : `${participationRate}%`}}></div>
    </div>
  )
}

export default VoteStatusProgressBar;