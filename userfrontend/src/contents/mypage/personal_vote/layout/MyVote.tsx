import React from 'react';
import MyVoteList from '../MyVoteList';

const MyVote: React.FC = () => {
  return (
    <div className='w-[90%] h-80 mt-5 border border-slate-200 rounded-lg shadow-lg'>
      <div className='w-full h-[30%] border-b border-black flex justify-start items-center'>
        내 투표 목록
      </div>
      <MyVoteList />
    </div>
  )
}

export default MyVote;