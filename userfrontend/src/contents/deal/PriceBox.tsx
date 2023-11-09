import React from 'react';

const PriceBox = () => {
    const pricelist = {
        "buy_list": [
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
            {price: 4150, amount: 200},
            {price: 4200, amount: 200},
            {price: 4250, amount: 200},
            {price: 4300, amount: 200},
            {price: 4350, amount: 200},
        ]
    };

    const sortedSellList = pricelist.sell_list.sort((a,b)=>b.price - a.price);
    console.log(sortedSellList);
    const sortedBuyList = pricelist.buy_list.sort((a,b)=>b.price - a.price);
    console.log(sortedBuyList);

    return (
        <>
            {pricelist.sell_list.map((item,index)=>{
                return (
                    <div className='w-full h-9 flex flex-row bg-blue-200' key={index}>
                        <div className='w-2/3 h-full flex justify-end pr-5 items-center'>
                            {item.price}
                        </div>
                        <div className='w-1/3 h-full flex items-center text-xs'>
                            {item.amount}
                        </div>
                    </div>
                )
            })}
            {pricelist.buy_list.map((item,index)=>{
                return (
                    <div className='w-full h-9 flex flex-row bg-red-200' key={index}>
                        <div className='w-2/3 h-full flex justify-end pr-5 items-center'>
                            {item.price}
                        </div>
                        <div className='w-1/3 h-full flex items-center text-xs'>
                            {item.amount}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default PriceBox;