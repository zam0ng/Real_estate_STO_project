import React from 'react';
import SubscriptionAd from '../contents/real_estate/advertisement/SubscriptionAd';
import Banner from '../contents/real_estate/banner/Banner';
import PropertyListBox from '../contents/real_estate/on_sale_list/PropertyListBox';

const Market: React.FC = () => {
  return (
    <div>
      <SubscriptionAd />
      <Banner />
      <PropertyListBox />
    </div>
  )
}

export default Market;