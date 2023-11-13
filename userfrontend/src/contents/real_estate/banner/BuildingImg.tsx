import React from 'react';

const BuildingImg: React.FC = () => {
  return (
    <div className='w-[85%] h-80 rounded-lg mt-4'>
      <img className='w-full h-full rounded-lg' src={process.env.PUBLIC_URL + `/images/building/building-example.jpeg`} alt='building image' />
    </div>
  )
}

export default BuildingImg;