import React from 'react';
import DealHeader from '../contents/deal/DealHeader';
import BuySellInfo from '../contents/deal/DealMain';

const Deal: React.FC = () => {
  return (
    <div className='deal w-screen h-screen overflow-hidden flex flex-col justify-center box-border'>
      <div className='w-full h-full'>
        <DealHeader />
        <BuySellInfo />
      </div>
    </div>
  )
}

export default Deal;