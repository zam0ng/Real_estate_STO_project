import React, { useState } from 'react';

interface TabProps {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (tabId: string)=>void;
}

const BuySellTab: React.FC<TabProps> = ({ id, title, activeTab, setActiveTab}) => {
    const [currentTab, setCurrentTab] = useState<"buyTab" | "sellTab">("buyTab");

    const handleTabClick = (tab: "buyTab" | "sellTab") => {
        setCurrentTab(tab);
    };

    return (
        <div className={`w-1/2 h-full flex justify-center items-center text-sm ${currentTab === id ? "buyActive" : "sellActive"}`} onClick={()=>{setActiveTab(id);handleTabClick("buyTab")}}>
            {title}
        </div>
    )
}

export default BuySellTab;