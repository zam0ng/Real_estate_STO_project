import React from 'react';

interface BoardItemTitleProps {
    notice_title: string;
}

const BoardItemTitle: React.FC<BoardItemTitleProps> = ({notice_title}) => {
  return (
    <div className='w-full h-3/5 text-lg font-medium flex items-end'>
        {notice_title}
    </div>
  )
}

export default BoardItemTitle;