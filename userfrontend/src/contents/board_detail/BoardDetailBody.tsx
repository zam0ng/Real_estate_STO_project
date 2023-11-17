import React from 'react';

export interface BoardDetailContentProps {
  notice_content: string|undefined;
}

const BoardDetailBody: React.FC<BoardDetailContentProps> = ({notice_content}) => {
  return (
    <div className='w-full h-auto mt-5 pl-5 pr-5'>
      {notice_content}
    </div>
  )
}

export default BoardDetailBody;