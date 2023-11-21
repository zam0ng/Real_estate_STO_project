import React from 'react';
import OrderInfo from '../priceChart/OrderInfo';
import BuySellTabInfo from '../buySell/BuySellTabInfo';
import HistoryTabInfo from '../history/HistoryTabInfo';

interface socketProps {
    isSocket: any;
}

const DealMain: React.FC<socketProps> = ({isSocket}) => {

    return (
        <div className='w-full h-5/6 flex flex-col'>
            <div className='w-full h-[5%] flex justify-center items-center border-b border-dashed border-black'>주문</div>
            <div className='w-full h-[95%] flex flex-row'>
                <OrderInfo isSocket = {isSocket}/>
                <div className='w-2/5 h-full flex flex-col'>
                    <BuySellTabInfo isSocket = {isSocket} />
                    <HistoryTabInfo isSocket = {isSocket}/>
                </div>
            </div>
        </div>
    )
}

export default DealMain;