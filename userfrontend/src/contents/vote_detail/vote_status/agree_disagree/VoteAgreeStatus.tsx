import React, { useEffect, useState } from 'react';

interface AgreeVoteCountProps {
  agreeVotes: number;
  totalVotes: number;
}

const VoteAgreeStatus: React.FC<AgreeVoteCountProps> = ({agreeVotes,totalVotes}) => {
  const [agreeRate,setAgreeRate] = useState<number>(0);

    useEffect(()=>{
        setAgreeRate(Math.round((agreeVotes/totalVotes) * 100));
    },[agreeVotes,totalVotes]);

  return (
    <div className=" bg-gray-300 rounded-full h-2 mx-auto m-3">
        <div className="bg-blue-500 h-2 rounded-full" style={{width : `${agreeRate}%`}}></div>
    </div>
  )
}

export default VoteAgreeStatus;