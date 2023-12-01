import React from 'react';
import MyVoteList from '../MyVoteList';

const MyVote: React.FC = () => {
  return (
    <div className='w-[90%] h-80 mt-5 bg-[#EDF0F4] rounded-xl shadow-innerneu2 pl-5 pr-5'>
      <div className='w-full h-[30%] flex justify-start items-center text-xl'>
        내 투표 목록
      </div>
      <MyVoteList />
    </div>
  )
}

export default MyVote;