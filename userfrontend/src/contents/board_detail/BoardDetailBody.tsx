import React from 'react';

export interface BoardDetailContentProps {
  notice_content: string|undefined;
}

const BoardDetailBody: React.FC<BoardDetailContentProps> = ({notice_content}) => {
  // console.log(notice_content);
  return (
    <textarea className='w-full h-3/4 mt-5 pl-5 pr-5 bg-[#EDF0F4] '>
      {notice_content}
    </textarea>
  )
}

export default BoardDetailBody;