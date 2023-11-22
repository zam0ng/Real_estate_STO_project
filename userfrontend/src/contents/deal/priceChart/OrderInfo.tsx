import React from 'react';
import PriceBox from './PriceBox';

interface socketProps {
    isSocket: any;
}

const OrderInfo: React.FC<socketProps> = ({isSocket}) => {

    return (
        <div className='w-3/5 h-full overflow-y-auto xs:text-sm'>
            <PriceBox isSocket = {isSocket}/>
        </div>
    )
}

export default OrderInfo;