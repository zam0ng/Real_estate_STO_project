import React from 'react';
import PriceBox from './PriceBox';

const OrderInfo: React.FC = () => {

    return (
        <div className='buy-sell-chart w-3/5 h-full border-r border-dashed border-slate-300 
        overflow-y-scroll scrollbar-w-0 scrollbar-thumb-white scrollbar-track-white
        flex flex-col justify-between'>
            <PriceBox />
        </div>
    )
}

export default OrderInfo;