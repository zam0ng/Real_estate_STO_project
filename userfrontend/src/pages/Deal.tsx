import React from 'react';
import OrderHistoryTabs from '../contents/deal/OrderHistoryTabInfo';
import DealHeader from '../contents/deal/DealHeader';

const Deal: React.FC = () => {
  return (
    <div className='deal w-screen h-screen overflow-hidden flex flex-col justify-center box-border'>
      <div className='w-full h-full'>
        <DealHeader />
        <OrderHistoryTabs />
      </div>
    </div>
  )
}

export default Deal;