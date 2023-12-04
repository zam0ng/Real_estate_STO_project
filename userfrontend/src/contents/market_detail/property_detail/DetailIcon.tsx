import React from 'react';

interface IconProps {
  icon: React.ReactNode;
}

const DetailIcon: React.FC<IconProps> = ({icon}) => {
  return (
    <div className='w-10 h-10 flex justify-center items-center rounded-full border border-blue-500'>
      {icon}
    </div>
  )
}

export default DetailIcon;