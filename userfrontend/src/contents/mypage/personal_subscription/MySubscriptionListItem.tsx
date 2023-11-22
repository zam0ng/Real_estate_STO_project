import React from 'react';

const MySubscriptionListItem: React.FC = () => {
  return (
    <>
        <div className='w-full h-8 flex flex-row'>
            <div className='w-1/2 h-full flex justify-start items-center text-xl'>
                여의도 자이 1차
            </div>
            <div className='w-1/2 h-full flex justify-start items-center'>
                입고/미입고/진행중
            </div>
        </div>
        <div className='w-full h-28 flex flex-row'>
            <div className='w-[25%] h-full flex justify-center items-center'>
                <img className='w-20 h-20 border border-black rounded-lg' src='' />
            </div>
            <div className='w-[75%] h-full flex flex-col'>
                <div className='w-full h-1/6 border-b border-white flex flex-row bg-slate-200'>
                    <div className='w-1/3 h-full border-r border-white flex justify-center items-center text-sm'>신청일자</div>
                    <div className='w-1/3 h-full border-r border-white flex justify-center items-center text-sm'>신청수량</div>
                    <div className='w-1/3 h-full flex justify-center items-center text-sm'>공모단가</div>
                </div>
                <div className='w-full h-1/6 flex flex-row bg-slate-200'>
                    <div className='w-1/3 h-full border-r border-white flex justify-center items-center text-sm'>확정일자</div>
                    <div className='w-1/3 h-full border-r border-white flex justify-center items-center text-sm'>배정수량</div>
                    <div className='w-1/3 h-full flex justify-center items-center text-sm'>환불금액</div>
                </div>
                <div className='w-full h-1/3 border-b border-slate-300 flex flex-row'>
                    <div className='w-1/3 h-full flex justify-center items-center'>10.10</div>
                    <div className='w-1/3 h-full flex justify-center items-center'>10</div>
                    <div className='w-1/3 h-full flex justify-center items-center'>5,000</div>
                </div>
                <div className='w-full h-1/3 flex flex-row'>
                    <div className='w-1/3 h-full flex justify-center items-center'>10.30</div>
                    <div className='w-1/3 h-full flex justify-center items-center'>5</div>
                    <div className='w-1/3 h-full flex justify-center items-center'>25,000</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MySubscriptionListItem;