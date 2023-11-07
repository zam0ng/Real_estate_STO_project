import React from 'react';
import Top from '../contents/deal/Top';
import DealInfo from '../contents/deal/DealInfo';
import Buttons from '../contents/deal/Buttons';

const Deal: React.FC = () => {
  return (
    <div className='deal w-screen h-screen overflow-scroll text-home flex flex-col justify-center
    box-border'>
      <div className='w-screen h-[90%]'>
        <Top />
        <DealInfo />
      </div>
      <Buttons />
    </div>
  )
}

export default Deal;