import React from 'react';

interface UserProfileImgProps {
  img: string|undefined;
}

const MyProfileImg: React.FC<UserProfileImgProps> = ({img}) => {
  return (
    <div className='w-full h-[50%] flex justify-center items-end'>
        <div className='w-28 h-28 border border-black rounded-full'>
            <img src={img} />
        </div>
    </div>
  )
}

export default MyProfileImg;