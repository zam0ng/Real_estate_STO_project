import React from 'react';
import SubscriptionAd from '../contents/market/advertisement/SubscriptionAd';
import Banner from '../contents/market/banner/Banner';
import PropertyListBox from '../contents/market/on_sale_list/PropertyListBox';
import TabBar from '../layouts/tabBar';

const Market: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center pb-16 
    overflow-y-scroll'>
      <SubscriptionAd />
      <Banner />
      <PropertyListBox />
      <SubscriptionAd />
      <TabBar />
    </div>
  )
}

export default Market;