import React from 'react';

interface VotePropertyNameProps {
  real_estate_name: string;
}

const VoteListItemProperty: React.FC<VotePropertyNameProps> = ({real_estate_name}) => {
  return (
    <div className='w-full h-1/3 flex justify-start items-end'>
        {real_estate_name}
    </div>
  )
}

export default VoteListItemProperty;