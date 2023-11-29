import React from 'react';

const VoteDisagreeNumber: React.FC = () => {
  return (
    <div className='w-full h-8 flex flex-row'>
        <div className='w-1/2 h-full flex justify-start items-center'>
            반대 투표권 {40}%
        </div>
        <div className='w-1/2 h-full flex justify-end items-center'>
            {160000}TOK
        </div>
    </div>
  )
}

export default VoteDisagreeNumber;