import React from 'react';
import { serverurl } from '../../components/serverurl';

interface ImgPathProps {
  img: string;
}

const VotePropertyImg: React.FC<ImgPathProps> = ({img}) => {
  return (
    <div className='w-full h-auto flex justify-center items-center mb-5'>
      <img className='max-w-[90%] max-h-80 rounded-lg' src={`${serverurl}/estate_img/${(img.split("/")[2])}`} />
    </div>
  )
}

export default VotePropertyImg;