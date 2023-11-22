import React from 'react';

const MyAssetValueChange: React.FC = () => {
  return (
    <div className='w-full h-[10%] border-b border-black flex flex-row'>
      <div className='w-[20%] h-full flex justify-center items-center'>
        총 손익
      </div>
      <div className='w-[80%] h-full flex justify-center items-center'>
        -173,627원
        <span className='text-xs-sm ml-5 w-[20%] h-full flex justify-center items-center'>-7.66%</span>
      </div>
    </div>
  )
}

export default MyAssetValueChange;