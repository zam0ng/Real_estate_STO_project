import React from 'react';
import { useLocation } from 'react-router-dom';
import BackBtn from '../../../components/BackBtn';

const DealHeader: React.FC = () => {
  const currentPage = useLocation();

  return (
    <div className='flex flex-col justify-center place-items-center w-full h-1/6 border-b border-b-black'>
        <div className='relative w-full h-1/2 flex justify-center items-end text-xl'>
          <div className='absolute top-0 left-0'>
            <BackBtn />
          </div>
            {currentPage.state.propertyName}
        </div>
        <div className='flex flex-row justify-center items-center w-full h-1/2 text-red-500 text-sm'>
            <div className='w-16 h-1/2 flex justify-center items-center'>1000</div>
            <div className='w-16 h-1/2 flex justify-center items-center mr-2 ml-2'>+1.83%</div>
            <div className='w-16 (1rem = font-size/4) h-1/2 flex justify-center items-center'>^ 20</div>
        </div>
    </div>
  )
}

export default DealHeader;