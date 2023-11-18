import React from 'react';
import PriceBox from './PriceChart';

const OrderInfo: React.FC = () => {

    return (
        <div className='w-3/5 h-full overflow-y-auto xs:text-sm'>
            <PriceBox />
        </div>
    )
}

export default OrderInfo;