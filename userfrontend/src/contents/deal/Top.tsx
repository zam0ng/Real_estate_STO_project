import React from 'react';

const Top: React.FC = () => {
  return (
    <div className='flex flex-col justify-center place-items-center w-full h-1/6'>
        <div className='w-full h-1/2 flex justify-center items-center'>
            {/* title */}
            <p className='text-lg text-yellow-600'>문래 공차</p>
        </div>
        <div className='flex flex-row justify-center items-center w-full h-1/2'>
            <div className='w-15 h-1/2 flex justify-center items-center'>1000</div>
            <div className='w-15 h-1/2 flex justify-center items-center mr-2 ml-2'>+1.83%</div>
            <div className='w-15 h-1/2 flex justify-center items-center'>^ 20</div>
        </div>
    </div>
  )
}

export default Top;