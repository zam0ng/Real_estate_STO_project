import React, { useContext } from 'react';
import PropertyDescription from './PropertyDescription';
import PropertyName from './PropertyName';
import WhyDifferentInfo from './WhyDifferentInfo';
import PriceAndValue from './prices/PriceAndValue';
import PropertyDealHistory from './PropertyDealHistory';

const PropertyInfo: React.FC = () => {
    return (
        <div className='w-full h-64 rounded-tl-xl rounded-tr-xl flex flex-col items-center
        justify-around'>
            <div className='w-full h-auto'>
                <div className='w-full h-7 flex flex-row items-center mt-5'>
                    <PropertyDescription />
                    <PropertyDealHistory />
                </div>
                <PropertyName />
            </div>
            <WhyDifferentInfo />
            <PriceAndValue />
        </div>
    )
}

export default PropertyInfo;