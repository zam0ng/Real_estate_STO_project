import React, { useState } from 'react';
import HistoryTab from './HistoryTab';

interface TabsProps {
    tabs: {
        id: string;
        title: string;
        content: React.ReactNode
    }[];
}

const HistoryTabStructure: React.FC<TabsProps> = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className='history-tab-menu w-full h-full'>
            <div className='history-tab-titles flex flex-row justify-center items-center w-full h-[7%] text-sm'>
                {tabs.map((tab)=>(
                    <HistoryTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='history-tab-contents flex flex-col items-center w-full h-[93%] overflow-y-scroll'>
                {tabs.map(
                    (tab) => activeTab === tab.id && tab.content
                )}
            </div>
        </div>
    )
}

export default HistoryTabStructure;