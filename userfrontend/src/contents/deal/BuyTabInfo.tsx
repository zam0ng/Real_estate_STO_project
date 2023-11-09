import React from 'react';

const BuyTabInfo: React.FC = () => {
  return (
    <div className='buy-sell-input w-full h-full flex flex-col text-sm'>
        <div className='buy-input w-full h-[40%] border-b border-dashed flex flex-col justify-center items-center'>
            <div className='flex flex-row justify-center items-center mt-2 mb-1'>
                <input className='w-3/5 border border-slate-300 rounded-md text-right pr-1 mr-1' type='text' placeholder='0' />원
            </div>
            <div className='flex flex-row justify-center items-center mt-1 mb-1'>
                <input className='w-3/5 border border-slate-300 rounded-md text-right pr-1 mr-1' type='text' placeholder='0' />개
            </div>
            <div className='w-[70%] h-5 flex flex-row justify-between mt-1 mb-1'>
                총 <span>10000</span>원
            </div>
            <br/>
            <div className='w-[70%] h-5 flex justify-between text-xs'>
                <button className='bg-slate-400 text-white w-[40%] h-5'>초기화</button>
                <button className='bg-red-500 text-white w-[55%] h-5'>매수</button>
            </div>
        </div>
    </div>
  )
}

export default BuyTabInfo;