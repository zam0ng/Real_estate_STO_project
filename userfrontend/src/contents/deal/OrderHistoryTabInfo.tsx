import React from 'react';
import OrderHistoryTabStructure from './OrderHistoryTabStructure';
import BuySellInfo from './BuySellInfo';
import HistoryInfo from './HistoryInfo';

const OrderHistoryTabInfo: React.FC = () => {
    const orderHistoryTabs = [
        {id: "tab1", title: "주문", content: <BuySellInfo />},
        {id: "tab2", title: "내역", content: <HistoryInfo />}
    ];

    return (
        <div className='w-full h-5/6 flex justify-center items-center'>
            <OrderHistoryTabStructure tabs={orderHistoryTabs} />
        </div>
    )
}

export default OrderHistoryTabInfo;