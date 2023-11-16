import React, { useState } from 'react';
import TodayDailyTab from './TodayDailyTab';

interface TabsProps {
    tabs: {
        id: string;
        title: string;
        content: React.ReactNode
    }[];
}

const TodayDailyTabStructure: React.FC<TabsProps> = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className='history-tab-menu w-full h-full flex flex-col justify-center items-center'>
            <div className='history-tab-titles flex flex-row justify-center items-center w-[90%] h-[7%] text-sm'>
                {tabs.map((tab)=>(
                    <TodayDailyTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='history-tab-contents flex flex-col items-center w-full h-full mt-5'>
                {tabs.map(
                    (tab) => activeTab === tab.id && tab.content
                )}
            </div>
        </div>
    )
}

export default TodayDailyTabStructure;