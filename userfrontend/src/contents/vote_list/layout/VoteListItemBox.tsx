import React, { useContext, useEffect, useState } from 'react';
import VoteListItem from '../VoteListItem';
import { VoteListContext } from '../../../pages/VoteList';

const VoteListItemBox: React.FC = () => {
  const data = useContext(VoteListContext);
  // console.log(data);
  const endedVote = [];
  const [done,setDone] = useState<boolean>(false);

  const sortedData = data?.sort((a,b)=>{
    const dateA = new Date(a.vote_end_date);
    const dateB = new Date(b.vote_end_date);
    return dateA.getTime() - dateB.getTime();
  })

  const checkTwoDaysAgo = (date: string) => {
    const endDate = new Date(date);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    return endDate < twoDaysAgo;
  };

  useEffect(()=>{
    if(data){
      data.map((item,index)=>{
        if(checkTwoDaysAgo(item.vote_end_date)){
          endedVote.push(item);
        }
      });
    }
  },[data]);

  return (
    <div className='w-full h-full'>
      {sortedData === undefined && (
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-[50%] h-[50%] flex justify-center items-center text-center'>
            현재 진행중이거나 <br/>예정된 투표가 없습니다.
          </div>
        </div>
      )}
      {(sortedData && (sortedData.length === 0 || sortedData.length === endedVote.length)) && (
        <div className='w-full h-full flex justify-center items-center'>
          <div className='w-[50%] h-[50%] flex justify-center items-center text-center'>
            현재 진행중이거나 예정된 투표가 없습니다.
          </div>
        </div>
      )}
      {sortedData && sortedData.map((item,index)=>{
        if(checkTwoDaysAgo(item.vote_end_date)){
          return null;
        }
        return (
          <VoteListItem key={index} real_estate_name={item.real_estate_name} vote_id={item.vote_id} subscription_img_1={item.subscription_img_1} vote_title={item.vote_title} 
          vote_start_date={item.vote_start_date} vote_end_date={item.vote_end_date} />
        )
      })}
    </div>
  )
}

export default VoteListItemBox;