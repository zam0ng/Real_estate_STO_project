import React from 'react'
import PropertyImg from '../contents/market_detail/layout/PropertyImg';
import PropertyWordBox from '../contents/market_detail/layout/PropertyWordBox';
import ToDealPage from '../contents/market_detail/deal_btn/ToDealPage';

const MarketDetail: React.FC = () => {
  return (
    <div className='w-screen h-screen flex flex-col border border-black'>
      <PropertyImg />
      <div className='w-full h-auto rounded-tl-xl rounded-tr-xl border border-black'>
        <PropertyWordBox />
      </div>
    </div>
  )
}

export default MarketDetail;