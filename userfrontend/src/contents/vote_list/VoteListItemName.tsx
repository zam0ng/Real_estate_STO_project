import React from 'react';

interface VoteTitleProps {
  vote_title: string;
}

const VoteListItemName: React.FC<VoteTitleProps> = ({vote_title}) => {
  return (
    <div className='w-full h-1/3 text-2xl flex justify-start items-center'>
        {vote_title}
    </div>
  )
}

export default VoteListItemName;