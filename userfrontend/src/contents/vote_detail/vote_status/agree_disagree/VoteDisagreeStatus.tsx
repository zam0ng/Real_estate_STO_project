import React, { useEffect, useState } from 'react';

interface DisagreeVoteCountProps {
  disagreeVotes: number;
  totalVotes: number;
}

const VoteDisagreeStatus: React.FC<DisagreeVoteCountProps> = ({disagreeVotes,totalVotes}) => {
  const [disagreeRate,setDisagreeRate] = useState<number>(0);

    useEffect(()=>{
        setDisagreeRate(Math.round((disagreeVotes/totalVotes) * 100));
    },[disagreeVotes,totalVotes]);

  return (
    <div className=" bg-gray-300 rounded-full h-2 mx-auto m-3">
        <div className="bg-red-500 h-2 rounded-full" style={{width : `${disagreeRate}%`}}></div>
    </div>
  )
}

export default VoteDisagreeStatus;