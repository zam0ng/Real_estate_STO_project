import React from 'react';
import TopTabs from './TopTabs';

const Order: React.FC = () => {
    const OrderInfo: React.FC = ()=>{
        return (
            <div className='w-full h-full flex flex-row'>
                <div className='buy-sell-chart w-3/5 h-ful border-r border-dashed border-slate-300'>

                </div>
                <div className='buy-sell-input w-2/5 h-full flex flex-col text-sm'>
                    <div className='buy-input w-full h-[40%]'>
                        <input className='w-3/5 border border-slate-300 rounded-md text-right pr-1 mr-1' type='text' placeholder='0' />원
                    </div>
                    <div className='sell-input w-full h-[40%]'>
                        <input />
                    </div>
                </div>
            </div>
        )
    };

    const CompleteDeal: React.FC = ()=>{
        return (
            <div className='w-full h-full flex justify-center items-center'>
                체결/미체결 컴포넌트
            </div>
        )
    }

    const tabs = [
        {id: "tab1", title: "주문", content: <OrderInfo />},
        {id: "tab2", title: "시세", content: <CompleteDeal />}
    ];

    return (
        <div className='w-full h-5/6 flex justify-center items-center'>
            <TopTabs tabs={tabs} />
        </div>
    )
}

export default Order;