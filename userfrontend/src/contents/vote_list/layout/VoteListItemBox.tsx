import React from 'react';
import VoteListItem from '../VoteListItem';

const VoteListItemBox: React.FC = () => {
  return (
    <div className='w-full h-fit'>
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
      <VoteListItem />
    </div>
  )
}

export default VoteListItemBox;