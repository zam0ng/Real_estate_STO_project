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
        <div className='tabmenu w-full h-full'>
            <div className='tab-titles flex flex-row justify-center items-center w-full h-[10%] text-sm'>
                {tabs.map((tab)=>(
                    <HistoryTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='tab-contents flex justify-center items-center w-full h-[90%]'>
                {tabs.map(
                    (tab) => activeTab === tab.id && <div className='w-full h-full flex justify-center items-center' key={tab.id}>{tab.content}</div>
                )}
            </div>
        </div>
    )
}

export default HistoryTabStructure;