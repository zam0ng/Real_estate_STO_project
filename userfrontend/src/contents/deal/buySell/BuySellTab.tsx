import React, { useState } from 'react';

interface TabProps {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (tabId: string)=>void;
}

const BuySellTab: React.FC<TabProps> = ({ id, title, activeTab, setActiveTab}) => {
    let [currentTab, setCurrentTab] = useState<string>("buyTab");
    currentTab = activeTab;

    const handleTabClick = (tab: "buyTab" | "sellTab") => {
        setCurrentTab(tab);
    };

    return (
        <div className={`w-1/2 h-full flex justify-center items-center text-xs 
        ${currentTab === id ? (id === "buyTab" ? "buyActive" : "sellActive") : "nowNotActive"}`} 
        onClick={()=>{
            setActiveTab(id);
            handleTabClick(id === "buyTab" ? "buyTab" : "sellTab");
        }}>
            {title}
        </div>
    )
}

export default BuySellTab;