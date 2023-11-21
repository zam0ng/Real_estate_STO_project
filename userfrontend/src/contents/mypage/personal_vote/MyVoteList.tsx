import React from 'react';

const MyVoteList: React.FC = () => {
  return (
    <div className='w-full h-20 flex flex-row border-b border-black'>
      <div className='w-[20%] h-full border-r border-black'>
        <img src='' />
      </div>
      <div className='w-[40%] h-full border-r border-black'>
        <div className='w-full h-1/3 border-b border-black'></div>
        <div className='w-full h-2/3'></div>
      </div>
      <div className='w-[40%] h-full flex justify-end items-end text-xxs'>
        10.10 ~ 10.31
      </div>
    </div>
  )
}

export default MyVoteList;