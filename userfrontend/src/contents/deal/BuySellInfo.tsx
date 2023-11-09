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
        <div className='w-full h-5/6 flex flex-col'>
            <div className='w-full h-[5%] flex justify-center items-center border-b border-dashed border-black'>주문</div>
            <div className='w-full h-[95%] flex flex-row'>
                <OrderInfo />
                <BuySellTabStructure tabs={buySellTabs} />
            </div>
        </div>
    )

}

export default BuySellInfo;