import React from 'react';
import DetailIcon from './DetailIcon';

interface DetailProps {
  detail: string;
  icon: React.ReactNode;
}

const Details: React.FC<DetailProps> = ({detail,icon}) => {
  return (
    <div className='w-[85%] h-12 shadow-black flex flex-row justify-center items-center'>
      <DetailIcon icon={icon} />
      <div className='w-[85%] h-full flex justify-center items-center'>
        {detail}
      </div>
    </div>
  )
}

export default Details;