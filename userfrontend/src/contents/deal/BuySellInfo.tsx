import React from 'react';
import BuyTabInfo from './BuyTabInfo';
import SellTabInfo from './SellTabInfo';
import BuySellTabStructure from './BuySellTabStructure';
import OrderInfo from './OrderInfo';

const BuySellInfo: React.FC = () => {
    const buySellTabs = [
        {id: "buyTab", title: "매수", content: <BuyTabInfo />},
        {id: "sellTab", title: "매도", content: <SellTabInfo />}
    ]

    return (
        <div className='w-full h-full flex flex-row'>
            <OrderInfo />
            <BuySellTabStructure tabs={buySellTabs} />
        </div>
    )

}

export default BuySellInfo;