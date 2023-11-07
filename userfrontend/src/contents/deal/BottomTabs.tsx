import React, { useState } from 'react';
import BottomTab from './BottomTab';

interface TabsProps {
    tabs: {
        id: string;
        title: string;
        content: React.ReactNode
    }[];
}

const BottomTabs: React.FC<TabsProps> = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className='tabmenu w-screen h-full'>
            <div className='tab-titles flex flex-row justify-center items-center w-full h-10'>
                {tabs.map((tab)=>(
                    <BottomTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='tab-contents flex justify-center items-center w-full h-5/6'>
                {tabs.map(
                    (tab) => activeTab === tab.id && <div key={tab.id}>{tab.content}</div>
                )}
            </div>
        </div>
    )
}

export default BottomTabs;