import React, { useLayoutEffect, useRef } from 'react';

const PriceBox: React.FC = () => {
    const pricelist = {
        "buy_list": [
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3750, amount: 200},
            {price: 3800, amount: 200},
            {price: 3850, amount: 200},
            {price: 3900, amount: 200},
            {price: 3950, amount: 200},
            {price: 4000, amount: 200},
        ],
        "sell_list": [
            {price: 4050, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
            {price: 4100, amount: 200},
        ]
    };

    const sortedSellList = pricelist.sell_list.sort((a,b)=>b.price - a.price);
    console.log(sortedSellList);
    const sortedBuyList = pricelist.buy_list.sort((a,b)=>b.price - a.price);
    console.log(sortedBuyList);

    const priceChartRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(()=>{
        if(priceChartRef.current){
            let initalScroll = priceChartRef.current.scrollTop;
            const totalScroll = priceChartRef.current.scrollHeight;
            const wantedScroll = Math.floor(totalScroll / 4);

            initalScroll = wantedScroll;
        }
    },[]);

    return (
        <>
            <div className='buy-sell-chart w-full h-auto border-r border-dashed border-slate-300 flex flex-col'
            ref={priceChartRef}>
                {pricelist.sell_list.map((item,index)=>{
                    return (
                        <div className='w-full h-8 lg:text-base flex flex-row bg-blue-200 border-t border-b border-white' key={index}>
                            {/* 수량 그래프 */}
                            <div className='w-2/5 h-full flex justify-end items-center text-xs pr-5'>
                                {item.amount}
                            </div>
                            <div className='w-1/5 h-full flex justify-center items-center'>
                                {item.price}
                            </div>
                            <div className='w-2/5 h-full'>

                            </div>
                        </div>
                    )
                })}
                {pricelist.buy_list.map((item,index)=>{
                    return (
                        <div className='w-full h-8 flex flex-row bg-red-200 border-t border-b border-white' key={index}>
                            <div className='w-2/5 h-full'>

                            </div>
                            <div className='w-1/5 h-full flex justify-center items-center'>
                                {item.price}
                            </div>
                            <div className='w-2/5 h-full flex justify-start items-center text-xs pl-5'>
                                {item.amount}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PriceBox;