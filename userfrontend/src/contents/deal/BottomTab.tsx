import React from 'react';

interface TabProps {
    id: string;
    title: string;
    activeTab: string;
    setActiveTab: (tabId: string)=>void;
}

const BottomTab: React.FC<TabProps> = ({ id, title, activeTab, setActiveTab}) => {
    return (
        <div className={`w-1/2 h-full flex justify-center items-center ${activeTab === id ? "active" : "notActive"}`} onClick={()=>setActiveTab(id)}>
            {title}
        </div>
    )
}

export default BottomTab;