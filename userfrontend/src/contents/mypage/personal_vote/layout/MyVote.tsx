import React from 'react';
import MyVoteList from '../MyVoteList';

const MyVote: React.FC = () => {
  return (
    <div className='w-full h-96 border-b border-black'>
      <div className='w-full h-[30%] border-b border-black'>내 투표 목록</div>
      <div className='w-full h-[70%] overflow-y-scroll'>
        <MyVoteList />
      </div>
    </div>
  )
}

export default MyVote;