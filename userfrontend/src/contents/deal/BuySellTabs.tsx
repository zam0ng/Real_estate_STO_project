import React, { useState } from 'react';
import BuySellTab from './BuySellTab';

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
            <div className='buy-sell-titles flex flex-row justify-center items-center w-full h-10'>
                {tabs.map((tab)=>(
                    <BuySellTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='buy-sell-contents flex justify-center items-center w-full h-10'>
                {tabs.map(
                    (tab) => activeTab === tab.id && tab.content
                )}
            </div>
        </div>
    )
}

export default BottomTabs;