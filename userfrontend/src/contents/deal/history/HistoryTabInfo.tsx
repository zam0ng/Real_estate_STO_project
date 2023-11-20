import React from 'react';
import HistoryTabStructure from './HistoryTabStructure';
import CompleteDeal from './CompleteDeal';
import IncompleteDeal from './IncompleteDeal';

const HistoryTabInfo: React.FC = () => {
    const orderHistoryTabs = [
        {id: "tab1", title: "체결", content: <CompleteDeal />},
        {id: "tab2", title: "미체결", content: <IncompleteDeal />}
    ];

    return (
        <div className='w-full h-[70%] flex justify-center items-center'>
            <HistoryTabStructure tabs={orderHistoryTabs} />
        </div>
    )
}

export default HistoryTabInfo;