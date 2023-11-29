import React, { useEffect, useState } from 'react';

interface VotePeriodProps {
    vote_start_date: string;
    vote_end_date: string;
  }

const VoteListItemProgress: React.FC<VotePeriodProps> = ({vote_start_date,vote_end_date}) => {
    const [voteStatus,setVoteStatus] = useState<string>("");
    const [textColor,setTextColor] = useState<string>("");
    const [bgColor,setBgColor] = useState<string>("");

    const startDate = new Date(vote_start_date);
    const endDate = new Date(vote_end_date);
    const currentDate = new Date();
    
    const startDateSec = startDate.getTime();
    const endDateSec = endDate.getTime();
    const currentDateSec = currentDate.getTime();

    useEffect(()=>{
        if(currentDateSec < startDateSec){
            setVoteStatus("예정");
            setTextColor("text-yellow-500");
            setBgColor("bg-yellow-200");
        }else if(currentDateSec > endDateSec){
            setVoteStatus("종료");
            setTextColor("text-red-500");
            setBgColor("bg-red-200");
        }else{
            setVoteStatus("진행중");
            setTextColor("text-green-500");
            setBgColor("bg-green-200");
        }
    },[startDateSec,endDateSec,currentDateSec])

    return (
        <div className='w-[20%] h-full flex justify-center items-center pb-3'>
            <div className={`w-16 h-16 rounded-full flex justify-center items-center ${textColor} ${bgColor}`}>
                {voteStatus}
            </div>
        </div>
    )
}

export default VoteListItemProgress;