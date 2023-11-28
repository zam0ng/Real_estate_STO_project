import React from 'react';
import BackBtn from '../../../components/BackBtn';

const VoteDetailHeader: React.FC = () => {
  return (
    <div className='relative w-full h-16 border-b border-slate-200 shadow-md'>
      <BackBtn />
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        매각 투표
      </div>
    </div>
  )
}

export default VoteDetailHeader;