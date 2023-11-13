import React from 'react';
import BuildingImg from './BuildingImg';
import BuildingInfo from './BuildingInfo';
import BuyBtn from './BuyBtn';

const Banner: React.FC = () => {
  return (
    <div className='w-[80%] h-4/5 border border-black mt-10 rounded-lg flex flex-col items-center justify-around'>
      <BuildingImg />
      <BuildingInfo />
      <BuyBtn />
    </div>
  )
}

export default Banner;