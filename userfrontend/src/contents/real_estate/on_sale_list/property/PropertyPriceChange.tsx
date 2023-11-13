import React from 'react';

interface PriceChangeProps {
  priceChange: number;
  priceChangeRate: number;
}

const PropertyPriceChange: React.FC<PriceChangeProps> = ({priceChange,priceChangeRate}) => {
  return (
    <div>PropertyPriceChange</div>
  )
}

export default PropertyPriceChange;