import React from 'react';
import SubscriptionAd from '../contents/real_estate/advertisement/SubscriptionAd';
import Banner from '../contents/real_estate/banner/Banner';
import PropertyListBox from '../contents/real_estate/on_sale_list/PropertyListBox';
import TabBar from '../layouts/tabBar';

const Market: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col items-center pt-5 pb-16 
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