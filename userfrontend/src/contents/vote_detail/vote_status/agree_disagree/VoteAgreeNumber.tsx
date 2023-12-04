import React, { useEffect, useState } from 'react';

interface AgreeVoteCountProps {
    agreeVotes: number;
    totalVotes: number;
    tokenSymbol: string;
}

const VoteAgreeNumber: React.FC<AgreeVoteCountProps> = ({agreeVotes,totalVotes,tokenSymbol}) => {
    const [agreeRate,setAgreeRate] = useState<number>(0);

    useEffect(()=>{
        setAgreeRate(Math.round((agreeVotes/totalVotes) * 100));
    },[agreeVotes,totalVotes]);

    return (
        <div className='w-full h-8 flex flex-row'>
            <div className='w-1/2 h-full flex justify-start items-center'>
                찬성 투표권 {agreeRate}%
            </div>
            <div className='w-1/2 h-full flex justify-end items-center'>
                {agreeVotes} {tokenSymbol}
            </div>
        </div>
    )
}

export default VoteAgreeNumber;