import React, { useContext } from 'react';
import { MarketDetailContext } from '../../../pages/MarketDetail';

const PropertyName: React.FC = () => {
  const data = useContext(MarketDetailContext);

  return (
    <div className='w-full h-auto text-2xl ml-5'>
      {data?.['Subscription.subscription_name']}
    </div>
  )
}

export default PropertyName;