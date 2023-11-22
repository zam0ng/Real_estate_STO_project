import React from 'react';
import TitleHeader from '../contents/property_additional_detail/TitleHeader';
import DetailBox from '../contents/property_additional_detail/DetailBox';
import BackBtn from '../components/BackBtn';

const PropertyAdditionalInfo: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center'>
      <div className='w-full h-auto'>
        <BackBtn />
      </div>
      <TitleHeader />
      <div className='w-[90%] h-auto pt-5'>
        <DetailBox />
      </div>
    </div>
  )
}

export default PropertyAdditionalInfo;