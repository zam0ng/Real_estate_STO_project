import React from 'react'
import KakaoMap from '../../../components/KakaoMap';
import PropertyMap from './PropertyMap';

const PropertyLocation: React.FC = () => {
  return (
    <div className='w-full h-80'>
      <div className='w-full h-6 mt-5 ml-5'>주변 살펴보기</div>
      <PropertyMap />
    </div>
  )
}

export default PropertyLocation;