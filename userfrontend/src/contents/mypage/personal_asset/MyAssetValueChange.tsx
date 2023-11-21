import React from 'react';

const MyAssetValueChange: React.FC = () => {
  return (
    <div className='w-full h-[10%] border-b border-black flex flex-row'>
      <div className='w-[20%] h-full border-r border-black'>
        총 손익
      </div>
      <div className='w-[40%] h-full border-r border-black'>
        -173,627원
      </div>
      <div className='w-[40%] h-full'>
        -7.66%
      </div>
    </div>
  )
}

export default MyAssetValueChange;