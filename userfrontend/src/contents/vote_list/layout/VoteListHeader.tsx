import React from 'react';
import BackBtn from '../../../components/BackBtn';

const VoteListHeader: React.FC = () => {
  return (
    <div className='relative w-full h-16 border-b border-slate-200 shadow-md flex flex-row'>
      <div className='absolute w-[20%] h-full'>
        <BackBtn />
      </div>
      <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
        투표
      </div>
    </div>
  )
}

export default VoteListHeader;