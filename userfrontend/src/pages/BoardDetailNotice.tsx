import React from 'react';
import BoardDetailHeader from '../contents/board_detail/BoardDetailHeader';
import BoardDetailTitleBox from '../contents/board_detail/BoardDetailTitleBox';
import BoardDetailBody from '../contents/board_detail/BoardDetailBody';

const BoardDetailNotice: React.FC = () => {
  return (
    <div className='w-screen h-screen border border-black'>
      <BoardDetailHeader />
      <BoardDetailTitleBox />
      <BoardDetailBody />
    </div>
  )
}

export default BoardDetailNotice;