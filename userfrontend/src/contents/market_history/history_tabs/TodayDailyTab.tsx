import React from 'react';

interface TabProps {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (tabId: string)=>void;
}

const TodayDailyTab: React.FC<TabProps> = ({id,title,activeTab,setActiveTab}) => {
    return (
        <div className={`w-1/2 h-full text-xs border-b border-slate-300 flex justify-center items-center ${activeTab === id ? "historyActive" : "historyNotActive"}`} onClick={()=>setActiveTab(id)}>
            {title}
        </div>
    )
}

export default TodayDailyTab;