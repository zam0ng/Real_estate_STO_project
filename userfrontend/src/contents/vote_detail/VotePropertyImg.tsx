import React from 'react';

interface ImgPathProps {
  img: string;
}

const VotePropertyImg: React.FC<ImgPathProps> = ({img}) => {
  return (
    <div className='w-full h-48 flex justify-center items-center'>
      <img className='w-[90%] h-[90%] rounded-lg' src={img} />
    </div>
  )
}

export default VotePropertyImg;