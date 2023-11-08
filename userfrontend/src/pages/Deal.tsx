import React from 'react';
import Top from '../contents/deal/Top';
import Order from '../contents/deal/Order';
import Buttons from '../contents/deal/Buttons';

const Deal: React.FC = () => {
  return (
    <div className='deal w-screen h-screen overflow-hidden flex flex-col justify-center box-border'>
      <div className='w-full h-full'>
        <Top />
        <Order />
      </div>
    </div>
  )
}

export default Deal;