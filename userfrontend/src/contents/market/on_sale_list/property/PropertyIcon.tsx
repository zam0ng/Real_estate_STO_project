import React from 'react';

interface ImageProps {
  img : string;
}

const PropertyIcon: React.FC<ImageProps> = ({img}) => {
  return (
    <div className='w-full h-full flex justify-start items-center pl-3'>
      <img className='w-12 h-12 border  rounded-lg' 
      src={process.env.PUBLIC_URL + `/images/building/building-example.jpeg`} alt='property image' />
    </div>
  )
}

export default PropertyIcon;