import React from 'react';

interface IconProps {
  icon: React.ReactNode;
}

const DetailIcon: React.FC<IconProps> = ({icon}) => {
  return (
    <div className='w-[15%] h-full flex justify-center items-center rounded-full border border-slate-400'>
      {icon}
    </div>
  )
}

export default DetailIcon;