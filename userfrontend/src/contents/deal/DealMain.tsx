import React from 'react';
import BuyTabInfo from './buySell/BuyTabInfo';
import SellTabInfo from './buySell/SellTabInfo';
import BuySellTabStructure from './buySell/BuySellTabStructure';
import OrderInfo from './priceChart/OrderInfo';
import HistoryTabStructure from './history/HistoryTabStructure';

const BuySellInfo: React.FC = () => {
    const buySellTabs = [
        {id: "buyTab", title: "매수", content: <BuyTabInfo />},
        {id: "sellTab", title: "매도", content: <SellTabInfo />}
    ];

    const historyTabs = [
        {id: "completeDeal", title: "체결", content: <div>체결 컴포넌트</div>},
        {id: "incompleteDeal", title: "미체결", content: <div>미체결 컴포넌트</div>}
    ]

    return (
        <div className='w-full h-5/6 flex flex-col'>
            <div className='w-full h-[5%] flex justify-center items-center border-b border-dashed border-black'>주문</div>
            <div className='w-full h-[95%] flex flex-row'>
                <OrderInfo />
                <div className='w-2/5 h-full flex flex-col'>
                    <BuySellTabStructure tabs={buySellTabs} />
                    <HistoryTabStructure tabs={historyTabs} />
                </div>
            </div>
        </div>
    )
}

export default BuySellInfo;