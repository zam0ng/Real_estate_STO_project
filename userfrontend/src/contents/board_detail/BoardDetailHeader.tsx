import React from 'react';

interface BoardCategoryProps {
  category: string|undefined;
}

const BoardDetailHeader: React.FC<BoardCategoryProps> = ({category}) => {
  return (
    <div className='w-full h-10 border border-slate-200 flex justify-center items-center shadow-md'>
      {category}
    </div>
  )
}

export default BoardDetailHeader;