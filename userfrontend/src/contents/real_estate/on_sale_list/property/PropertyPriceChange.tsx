import React from 'react';

interface PriceChangeProps {
  priceChange: number;
  priceChangeRate: number;
}

const PropertyPriceChange: React.FC<PriceChangeProps> = ({priceChange,priceChangeRate}) => {
  let textColor;
  let plusMinus;
  if(priceChange > 0){
    plusMinus = "+";
    textColor = "text-red-500";

    return (
      <div className={`w-full h-1/4 flex justify-end items-center pr-3 text-xs-sm ${textColor}`}>
        {`${plusMinus}${priceChange} (${plusMinus}${priceChangeRate})`}
      </div>
    )
  }else if(priceChange < 0){
    textColor = "text-blue-500";

    return (
      <div className={`w-full h-1/4 flex justify-end items-center pr-3 text-xs-sm ${textColor}`}>
        {`${priceChange} (${priceChangeRate})`}
      </div>
    )
  }else{
    return (
      <div className='w-full h-1/4 flex justify-end items-center pr-3 text-xs-sm'>
        {`${priceChange} (${priceChangeRate})`}
      </div>
    )
  }
}

export default PropertyPriceChange;