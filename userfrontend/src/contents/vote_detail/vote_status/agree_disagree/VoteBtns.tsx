import React from 'react';

const VoteBtns: React.FC = () => {
  return (
    <div className='w-full h-16 border-b border-slate-300 flex flex-row justify-evenly items-center'>
        <button className='w-24 h-10 border border-slate-200 rounded-lg text-white bg-blue-500'>찬성</button>
        <button className='w-24 h-10 border border-slate-200 rounded-lg text-white bg-red-500'>반대</button>
    </div>
  )
}

export default VoteBtns;