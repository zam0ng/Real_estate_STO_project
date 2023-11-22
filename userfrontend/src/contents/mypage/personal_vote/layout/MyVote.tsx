import React from 'react';
import MyVoteList from '../MyVoteList';

const MyVote: React.FC = () => {
  return (
    <div className='w-[90%] h-80 border-b border-black'>
      <div className='w-full h-[30%] border-b border-black'>내 투표 목록</div>
      <MyVoteList />
    </div>
  )
}

export default MyVote;