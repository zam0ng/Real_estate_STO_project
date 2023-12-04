import React from 'react';

interface PriceChangeProps {
  priceChange: number;
  priceChangeRate: number;
}

const PropertyPriceChange: React.FC<PriceChangeProps> = ({priceChange,priceChangeRate}) => {
  let textColor;
  let plusMinus;
  let twoDecimalChangeRate = (Math.round(priceChangeRate * 100) / 100).toFixed(1) + '%';
  if(priceChange > 0){
    plusMinus = "+";
    textColor = "text-red-500";

    return (
      <div className={`w-full h-1/4 flex justify-end items-center pr-3 text-xs-sm ${textColor}`}>
        {`${plusMinus}${priceChange} (${plusMinus}${twoDecimalChangeRate})`}
      </div>
    )
  }else if(priceChange < 0){
    textColor = "text-blue-500";

    return (
      <div className={`w-full h-1/4 flex justify-end items-center pr-3 text-xs-sm ${textColor}`}>
        {`${priceChange} (${twoDecimalChangeRate})`}
      </div>
    )
  }else{
    return (
      <div className='w-full h-1/4 flex justify-end items-center pr-3 text-xs-sm'>
        {`${priceChange} (${twoDecimalChangeRate})`}
      </div>
    )
  }
}

export default PropertyPriceChange;