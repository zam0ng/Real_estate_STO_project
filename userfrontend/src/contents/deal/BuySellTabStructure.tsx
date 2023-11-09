import React, { useState } from 'react';
import BuySellTab from './BuySellTab';

interface TabsProps {
    tabs: {
        id: string;
        title: string;
        content: React.ReactNode
    }[];
}

const BuySellTabStructure: React.FC<TabsProps> = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className='tabmenu w-2/5 h-full'>
            <div className='buy-sell-tabs flex flex-row justify-center items-center w-full h-7'>
                {tabs.map((tab)=>(
                    <BuySellTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='buy-sell-contents flex justify-center items-center w-full h-full'>
                {tabs.map(
                    (tab) => activeTab === tab.id && tab.content
                )}
            </div>
        </div>
    )
}

export default BuySellTabStructure;