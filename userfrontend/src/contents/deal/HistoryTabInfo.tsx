import React from 'react';
import HistoryTabStructure from './HistoryTabStructure';

const HistoryTabInfo: React.FC = () => {
    const orderHistoryTabs = [
        {id: "tab1", title: "체결", content: <div>체결 컴포넌트</div>},
        {id: "tab2", title: "미체결", content: <div>미체결 컴포넌트</div>}
    ];

    return (
        <div className='w-full h-5/6 flex justify-center items-center'>
            <HistoryTabStructure tabs={orderHistoryTabs} />
        </div>
    )
}

export default HistoryTabInfo;