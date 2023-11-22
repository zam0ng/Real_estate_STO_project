import React from 'react';

const MyTotalDividend: React.FC = () => {
  return (
    <div className='w-full h-[30%]'>
      <div className='w-full h-[40%] flex justify-center items-center'>
        총 누적 배당금
      </div>
      <div className='w-full h-[60%] flex justify-center items-start text-2xl font-medium'>
        0원
      </div>
    </div>
  )
}

export default MyTotalDividend;