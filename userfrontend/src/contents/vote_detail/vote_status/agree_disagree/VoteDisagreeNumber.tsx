import React, { useEffect, useState } from 'react';

interface DisagreeVoteCountProps {
  disagreeVotes: number;
  totalVotes: number;
}

const VoteDisagreeNumber: React.FC<DisagreeVoteCountProps> = ({disagreeVotes,totalVotes}) => {
  const [disagreeRate,setDisagreeRate] = useState<number>(0);

    useEffect(()=>{
        setDisagreeRate(Math.round((disagreeVotes/totalVotes) * 100));
    },[disagreeVotes,totalVotes]);

  return (
    <div className='w-full h-8 flex flex-row'>
        <div className='w-1/2 h-full flex justify-start items-center'>
            반대 투표권 {disagreeRate}%
        </div>
        <div className='w-1/2 h-full flex justify-end items-center'>
            {totalVotes} TOK
        </div>
    </div>
  )
}

export default VoteDisagreeNumber;