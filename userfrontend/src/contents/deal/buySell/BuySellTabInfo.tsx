import React from 'react';
import BuyTabInfo from './BuyTabInfo';
import SellTabInfo from './SellTabInfo';
import BuySellTabStructure from './BuySellTabStructure';

const BuySellTabInfo: React.FC = () => {
    const buySellTabs = [
        {id: "buyTab", title: "매수", content: <BuyTabInfo />},
        {id: "sellTab", title: "매도", content: <SellTabInfo />}
    ];

    return (
        <div className='w-full h-[30%] flex flex-col'>
            <BuySellTabStructure tabs={buySellTabs} />
        </div>
    )
}

export default BuySellTabInfo;