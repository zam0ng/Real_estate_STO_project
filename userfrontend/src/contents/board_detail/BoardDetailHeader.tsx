import React from 'react';
import BackBtn from '../../components/BackBtn';

interface BoardCategoryProps {
  category: string|undefined;
}

const BoardDetailHeader: React.FC<BoardCategoryProps> = ({category}) => {
  return (
    <div className='relative w-full h-10 border border-slate-200 flex justify-center items-center shadow-md'>
      <div className='absolute top-[-1] left-0'>
        <BackBtn />
      </div>
      {category}
    </div>
  )
}

export default BoardDetailHeader;