import React from 'react';
import VoteListItem from '../VoteListItem';

const VoteListItemBox: React.FC = () => {
  return (
    <div className='w-full h-auto border border-black'>
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
    </div>
  )
}

export default VoteListItemBox;