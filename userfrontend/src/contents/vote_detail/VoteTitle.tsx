import React from 'react';

interface NameProps {
  real_estate_name: string;
  vote_title: string;
}

const VoteTitle: React.FC<NameProps> = ({real_estate_name,vote_title}) => {
  return (
    <div className='w-full h-auto flex justify-start items-end text-2xl pt-2'>
      {real_estate_name} - {vote_title}
    </div>
  )
}

export default VoteTitle;