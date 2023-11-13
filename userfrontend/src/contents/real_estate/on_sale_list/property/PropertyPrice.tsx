import React from 'react';

interface PriceProps {
  price: number;
}

const PropertyPrice: React.FC<PriceProps> = ({price}) => {
  return (
    <div>PropertyPrice</div>
  )
}

export default PropertyPrice;