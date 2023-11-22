import React from 'react';

const MyAssetHistoryTableHeader: React.FC = () => {
    return (
        <div className='w-full h-[20%] flex flex-row bg-slate-200'>
            <div className='w-[30%] h-full border-r border-white flex justify-center items-center text-xs-sm'>
                부동산 이름
            </div>
            <div className='w-1/5 h-full border-r border-white flex flex-col text-xs-sm'>
                <div className='w-full h-1/2 border-b border-white flex justify-center items-center'>매입가</div>
                <div className='w-full h-1/2 flex justify-center items-center'>현재가</div>
            </div>
            <div className='w-1/5 h-full border-r border-white text-xs-sm'>
                <div className='w-full h-1/2 border-b border-white flex justify-center items-center'>보유수량</div>
                <div className='w-full h-1/2 flex justify-center items-center'>가능수량</div>
            </div>
            <div className='w-[30%] h-full text-xs-sm'>
                <div className='w-full h-1/2 border-b border-white flex justify-center items-center'>평가손익</div>
                <div className='w-full h-1/2 flex justify-center items-center'>수익률</div>
            </div>
        </div>
    )
}

export default MyAssetHistoryTableHeader;