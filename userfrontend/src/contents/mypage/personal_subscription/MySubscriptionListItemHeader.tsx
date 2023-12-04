import React from 'react';

const MySubscriptionListItemHeader: React.FC = () => {

    return (
        <>
            <div className='w-full h-1/6 border-b border-white flex flex-row bg-slate-200 text-xs'>
                <div className='w-1/3 h-full border-r border-white flex justify-center items-center'>신청일자</div>
                <div className='w-1/3 h-full border-r border-white flex justify-center items-center'>신청수량</div>
                <div className='w-1/3 h-full flex justify-center items-center'>공모단가</div>
            </div>
            <div className='w-full h-1/6 flex flex-row bg-slate-200 text-xs'>
                <div className='w-1/3 h-full border-r border-white flex justify-center items-center'>확정일자</div>
                <div className='w-1/3 h-full border-r border-white flex justify-center items-center'>배정수량</div>
                <div className='w-1/3 h-full flex justify-center items-center'>환불금액</div>
            </div>
        </>
    )
}

export default MySubscriptionListItemHeader;