import React from 'react';

const MyAssetHistoryTableHeader: React.FC = () => {
    return (
        <div className='w-[90%] h-[20%] border border-black flex flex-row bg-slate-200'>
            <div className='w-[30%] h-full border-r border-black flex justify-center items-center text-xs-sm'>
                부동산 이름
            </div>
            <div className='w-1/5 h-full border-r border-black flex flex-col text-xs-sm'>
                <div className='w-full h-1/2 border-b border-black flex justify-center items-center'>매입가</div>
                <div className='w-full h-1/2 flex justify-center items-center'>현재가</div>
            </div>
            <div className='w-1/5 h-full border-r border-black text-xs-sm'>
                <div className='w-full h-1/2 border-b border-black flex justify-center items-center'>보유수량</div>
                <div className='w-full h-1/2 flex justify-center items-center'>가능수량</div>
            </div>
            <div className='w-[30%] h-full text-xs-sm'>
                <div className='w-full h-1/2 border-b border-black flex justify-center items-center'>평가손익</div>
                <div className='w-full h-1/2 flex justify-center items-center'>수익률</div>
            </div>
        </div>
    )
}

export default MyAssetHistoryTableHeader;