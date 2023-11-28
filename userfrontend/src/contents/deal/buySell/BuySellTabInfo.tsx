import React from 'react';
import BuyTabInfo from './BuyTabInfo';
import SellTabInfo from './SellTabInfo';
import BuySellTabStructure from './BuySellTabStructure';

interface socketProps {
    isSocket: any;
}

const BuySellTabInfo: React.FC<socketProps> = ({isSocket}) => {
    const buySellTabs = [
        {id: "buyTab", title: "매수", content: <BuyTabInfo isSocket={isSocket} />},
        {id: "sellTab", title: "매도", content: <SellTabInfo isSocket={isSocket} />}
    ];

    return (
        <div className='w-full h-[30%] flex flex-col'>
            <BuySellTabStructure tabs={buySellTabs} />
        </div>
    )
}

export default BuySellTabInfo;