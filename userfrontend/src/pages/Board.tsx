import React from 'react';
import BoardTitleHeader from '../contents/board/BoardTitleHeader';
import BoardItemBox from '../contents/board/BoardItemBox';

const Board: React.FC = () => {
  return (
    <div className='w-screen h-screen'>
        <BoardTitleHeader />
        <div className='w-full h-[80%] flex justify-center'>
          <BoardItemBox />
        </div>
    </div>
  )
}

export default Board;