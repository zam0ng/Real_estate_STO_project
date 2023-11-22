import React from 'react';

const MyCashHistory: React.FC = () => {
    const walletAddress = "0x1234123412341234123412341234";

    const shortenWalletAddress = (address: string, chars=4)=>{
        return `${address.substring(0,chars+2)}...${address.substring(address.length - chars)}`;
    };

    const shortWalletAddress = shortenWalletAddress(walletAddress);

    return (
        <div className='w-full h-[50%] pt-5'>
            <div className='w-full h-10 text-xl flex justify-start items-center pl-3'>
                입출입 거래 내역
            </div>
            <div className='w-full h-5 text-xs-sm pl-3 mt-5'>
                {/* date */}
                10월 28일
            </div>
            <div className='w-full h-20 flex flex-row'>
                <div className='w-[20%] h-full flex justify-center items-center'>
                    <div className='w-12 h-12 border border-black rounded-full flex justify-center items-center'>
                        img
                    </div>
                </div>
                <div className='w-[40%] h-full flex flex-col'>
                    <div className='w-full h-[50%] text-lg font-medium flex justify-start items-end'>
                        {/* wallet address */}
                        {shortWalletAddress}
                    </div>
                    <div className='w-full h-[50%] flex justify-start items-start text-sm'>
                        {/* time */}
                        15:15
                    </div>
                </div>
                <div className='w-[40%] h-full flex flex-col pr-3'>
                    <div className='w-full h-[50%] flex justify-end items-end text-lg font-medium'>
                        {/* 입출금 양 (+4000) */}
                        +4000원
                    </div>
                    <div className='w-full h-[50%] flex justify-end items-start text-sm'>
                        {/* 잔액 */}
                        1,000,000원
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyCashHistory;