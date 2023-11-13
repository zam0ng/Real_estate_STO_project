import React from 'react';
import PropertyName from './PropertyName';
import PropertyDescription from './PropertyDescription';
import PropertyIcon from './PropertyIcon';
import PropertyRating from './PropertyRating';
import PropertyPriceChange from './PropertyPriceChange';
import PropertyPrice from './PropertyPrice';

interface PropertyProps {
    start_price : number,
    current_price : number,
    fluctuation_rate : number,
    rating : number,
    subscription_img : string,
    subscription_name : string,
    subscription_description : string
}

const PropertyBox: React.FC<PropertyProps> = ({start_price,current_price,fluctuation_rate,rating,subscription_img,subscription_name,subscription_description}) => {
  return (
    <div className='w-full h-32 border border-gray-400 rounded-lg mb-5 flex flex-row'>
      <div className='w-1/2 h-full'>
        <div className='w-full h-1/2'>
          <PropertyName name={subscription_name} />
          <PropertyDescription description={subscription_description} />
        </div>
        <div className='w-full h-1/2'>
          <PropertyIcon img={subscription_img} />
        </div>
      </div>
      <div className='w-1/2 h-full'>
        <div className='w-full h-1/2'>
          <PropertyRating rating={rating} />
        </div>
        <div className='w-full h-1/2'>
          <PropertyPriceChange priceChange={current_price - start_price} priceChangeRate={fluctuation_rate} />
          <PropertyPrice price={current_price} />
        </div>
      </div>
    </div>
  )
}

export default PropertyBox;