import React from 'react';

interface BoardTitleBoxProps {
  notice_title: string|undefined;
  createdAt: string|undefined;
  real_estate_name: string;
}

const BoardDetailTitleBox: React.FC<BoardTitleBoxProps> = ({notice_title,createdAt,real_estate_name}) => {
  const uploadDate = createdAt?.slice(0,10);

  return (
    <div className='w-full h-auto border-b border-slate-300 p-3'>
      <div className='w-full h-auto text-3xl flex justify-start items-center pl-1'>
        {notice_title}
      </div>
      <div className='w-full h-[35%]'>
        <div className='w-full h-auto flex flex-row items-center mt-5 pb-2 pl-2'>
          {uploadDate}
          <div className='h-4 border-r-2 border-slate-300 ml-2 mr-2'></div>
          {real_estate_name}
        </div>
      </div>
    </div>
  )
}

export default BoardDetailTitleBox;