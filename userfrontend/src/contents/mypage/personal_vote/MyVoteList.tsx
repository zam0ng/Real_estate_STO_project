import React from 'react';
import MyVoteListItem from './MyVoteListItem';

const MyVoteList: React.FC = () => {
  return (
    <div className='w-full h-[65%] overflow-y-scroll'>
      <MyVoteListItem />
      <MyVoteListItem />
      <MyVoteListItem />
      <MyVoteListItem />
    </div>
  )
}

export default MyVoteList;