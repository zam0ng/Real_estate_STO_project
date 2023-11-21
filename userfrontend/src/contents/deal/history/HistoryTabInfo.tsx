import React from 'react';
import HistoryTabStructure from './HistoryTabStructure';
import CompleteDeal from './CompleteDeal';
import IncompleteDeal from './IncompleteDeal';

interface socketProps {
    isSocket: any;
}

const HistoryTabInfo: React.FC<socketProps> = ({isSocket}) => {
    const orderHistoryTabs = [
        {id: "tab1", title: "체결", content: <CompleteDeal />},
        {id: "tab2", title: "미체결", content: <IncompleteDeal isSocket={isSocket} />}
    ];

    return (
        <div className='w-full h-[70%] flex justify-center items-center'>
            <HistoryTabStructure tabs={orderHistoryTabs} />
        </div>
    )
}

export default HistoryTabInfo;