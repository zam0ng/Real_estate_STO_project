import React from 'react';
import DealHeader from '../contents/deal/layout/DealHeader';
import DealMain from '../contents/deal/layout/DealMain';

const Deal: React.FC = () => {
  return (
    <div className='deal w-screen h-screen overflow-hidden flex flex-col justify-center box-border'>
      <div className='w-full h-full'>
        <DealHeader />
        <DealMain />
      </div>
    </div>
  )
}

export default Deal;