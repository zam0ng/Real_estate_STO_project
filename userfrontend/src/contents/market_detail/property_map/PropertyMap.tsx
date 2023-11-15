import React, { useContext } from 'react'
import KakaoMap from '../../../components/kakaoMap';
import { MarketDetailContext } from '../../../pages/MarketDetail';
import PropertyAddress from './PropertyAddress';

const PropertyMap: React.FC = () => {
  const data = useContext(MarketDetailContext);

  return (
    <div className='w-full h-auto flex flex-col items-center'>
      <PropertyAddress />
      {data?.['Subscription.subscription_address'] && (
        <KakaoMap addressKor={data?.['Subscription.subscription_address']} width='w-[90%]' height='h-52' />
      )}
    </div>
  )
}

export default PropertyMap;