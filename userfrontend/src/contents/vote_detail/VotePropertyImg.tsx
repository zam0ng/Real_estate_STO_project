import React from 'react';
import { serverurl } from '../../components/serverurl';

interface ImgPathProps {
  img: string;
}

const VotePropertyImg: React.FC<ImgPathProps> = ({img}) => {
  return (
    <div className='w-full h-auto flex justify-center items-center mb-5'>
      <img className='w-[90%] h-80 rounded-lg' src={`${serverurl}/estate_img/${img}`} />
    </div>
  )
}

export default VotePropertyImg;