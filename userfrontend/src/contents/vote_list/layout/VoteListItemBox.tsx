import React, { useContext } from 'react';
import VoteListItem from '../VoteListItem';
import { VoteListContext } from '../../../pages/VoteList';

const VoteListItemBox: React.FC = () => {
  const data = useContext(VoteListContext);
  // console.log(data);

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

  return (
    <div className='w-full h-fit'>
      {sortedData && sortedData.map((item,index)=>{
        if(checkTwoDaysAgo(item.vote_end_date)){
          return null;
        }
        return (
          <VoteListItem key={index} real_estate_name={item.real_estate_name} vote_title={item.vote_title} 
          vote_start_date={item.vote_start_date} vote_end_date={item.vote_end_date} />
        )
      })}
    </div>
  )
}

export default VoteListItemBox;