import React from 'react';
import { useLocation } from 'react-router-dom';

const TitleHeader: React.FC = () => {
  const currentPage = useLocation();
  const title = currentPage.state.infoType;

  return (
    <div className='w-full h-[15%] flex justify-start items-end text-2xl pl-5'>
      {title}
    </div>
  )
}

export default TitleHeader;