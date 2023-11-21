import React from 'react';

const MySubscriptionList: React.FC = () => {
  return (
    <div className='w-full h-full border-b border-black'>
      <div className='w-full h-8 flex flex-row border-b border-black'>
        <div className='w-1/2 h-full'>여의도 자이 1차</div>
        <div className='w-1/2 h-full'>입고</div>
      </div>
      <div className='w-full h-28 flex flex-row border-b border-black'>
        <div className='w-[25%] h-full border-r border-black flex justify-center items-center'>
          <img className='w-20 h-20 border border-black rounded-lg' src='' />
        </div>
        <div className='w-[75%] h-full flex flex-col'>
          <div className='w-full h-1/6 border-b border-black flex flex-row'>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>신청일자</div>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>신청수량</div>
            <div className='w-1/3 h-full flex justify-center items-center'>공모단가</div>
          </div>
          <div className='w-full h-1/6 border-b border-black flex flex-row'>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>확정일자</div>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>배정수량</div>
            <div className='w-1/3 h-full flex justify-center items-center'>환불금액</div>
          </div>
          <div className='w-full h-1/3 border-b border-black flex flex-row'>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>10.10</div>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>10</div>
            <div className='w-1/3 h-full flex justify-center items-center'>5,000</div>
          </div>
          <div className='w-full h-1/3 flex flex-row'>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>10.30</div>
            <div className='w-1/3 h-full border-r border-black flex justify-center items-center'>5</div>
            <div className='w-1/3 h-full flex justify-center items-center'>25,000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySubscriptionList;