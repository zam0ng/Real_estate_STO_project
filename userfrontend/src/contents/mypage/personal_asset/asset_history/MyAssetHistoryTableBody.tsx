import React from 'react';

interface AssetTableBodyProps {
    name: string;
    price: number;
    amount: number;
    valuation: number;
    present_price: number;
    possible_quantity: number;
    rate_of_return: number;
}

const MyAssetHistoryTableBody: React.FC<AssetTableBodyProps> = ({name,price,amount,valuation,present_price,possible_quantity,rate_of_return}) => {
    return (
        <div className='w-full h-[25%] border-dashed border-b border-black flex flex-row'>
            <div className='w-[30%] h-full border-r border-dashed border-black flex justify-center items-center'>
                {name}
            </div>
            <div className='w-1/5 h-full border-r border-dashed border-black flex flex-col'>
                <div className='w-full h-1/2 flex justify-center items-center'>{price}</div>
                <div className='w-full h-1/2 flex justify-center items-center'>{present_price}</div>
            </div>
            <div className='w-1/5 h-full border-r border-dashed border-black'>
                <div className='w-full h-1/2 flex justify-center items-center'>{amount}</div>
                <div className='w-full h-1/2 flex justify-center items-center'>{possible_quantity}</div>
            </div>
            <div className='w-[30%] h-full'>
                <div className='w-full h-1/2 flex justify-center items-center'>{valuation}</div>
                <div className='w-full h-1/2 flex justify-center items-center'>{rate_of_return}%</div>
            </div>
        </div>
    )
}

export default MyAssetHistoryTableBody;