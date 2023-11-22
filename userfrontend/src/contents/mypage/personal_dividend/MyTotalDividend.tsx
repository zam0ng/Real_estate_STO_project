import React from 'react';

const MyTotalDividend: React.FC = () => {
  return (
    <div className='w-full h-[30%] border-b border-black'>
      <div className='w-full h-[40%] border-b border-black flex justify-center items-center'>
        총 누적 배당금
      </div>
      <div className='w-full h-[60%] border-b border-black flex justify-center items-center'>
        0원
      </div>
    </div>
  )
}

export default MyTotalDividend;