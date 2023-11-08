import React, { useState } from 'react';
import TopTab from './TopTab';

interface TabsProps {
    tabs: {
        id: string;
        title: string;
        content: React.ReactNode
    }[];
}

const TopTabs: React.FC<TabsProps> = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className='tabmenu w-full h-full'>
            <div className='tab-titles flex flex-row justify-center items-center w-full h-[7%]'>
                {tabs.map((tab)=>(
                    <TopTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='tab-contents flex justify-center items-center w-full h-[93%]'>
                {tabs.map(
                    (tab) => activeTab === tab.id && <div className='w-full h-full' key={tab.id}>{tab.content}</div>
                )}
            </div>
        </div>
    )
}

export default TopTabs;