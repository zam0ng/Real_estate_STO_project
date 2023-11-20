import React from 'react';
import BoardTitleHeader from '../contents/board/BoardTitleHeader';
import BoardItemBox from '../contents/board/BoardItemBox';
import BackBtn from '../components/BackBtn';

const Board: React.FC = () => {
  return (
    <div className='w-screen h-screen'>
      <BackBtn />
        <BoardTitleHeader />
        <div className='w-full h-[80%] flex justify-center'>
          <BoardItemBox />
        </div>
    </div>
  )
}

export default Board;