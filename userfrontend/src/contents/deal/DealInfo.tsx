import React from 'react';
import Tabs from './TopTabs';

const DealInfo: React.FC = () => {
    const tabs = [
        {id: "tab1", title: "주문", content: <div>주문 컴포넌트</div>},
        {id: "tab2", title: "시세", content: <div>시세 컴포넌트</div>}
    ]

    return (
        <div className='w-full h-5/6 flex justify-center items-center'>
            <Tabs tabs={tabs} />
        </div>
    )
}

export default DealInfo;