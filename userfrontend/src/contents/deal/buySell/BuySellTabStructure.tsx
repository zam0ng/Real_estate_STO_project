import React, { useState } from 'react';
import BuySellTab from './BuySellTab';

interface TabsProps {
    tabs: {
        id: string,
        title: string,
        content: React.ReactNode
    }[]
}

const BuySellTabStructure: React.FC<TabsProps> = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className='buy-sell-tab-menu w-full h-full'>
            <div className='buy-sell-tabs flex flex-row justify-center items-center w-full h-[15%]'>
                {tabs.map((tab)=>(
                    <BuySellTab key={tab.id} id={tab.id} title={tab.title} activeTab={activeTab} setActiveTab={setActiveTab}/>
                ))}
            </div>
            <div className='buy-sell-contents flex flex-col justify-center items-center w-full h-[85%]'>
                {tabs.map(
                    (tab) => activeTab === tab.id && tab.content
                )}
            </div>
        </div>
    )
}

export default BuySellTabStructure;