import React from 'react';
import TodayHistoryTable from './TodayHistoryTable';
import DailyHistoryTable from './DailyHistoryTable';
import TodayDailyTabStructure from './TodayDailyTabStructure';

const TodayDailyTabInfo: React.FC = () => {
    const TodayDailyHistoryTabs = [
        {id: "tab1", title: "당일 시세", content: <TodayHistoryTable />},
        {id: "tab2", title: "일별 시세", content: <DailyHistoryTable />}
    ];

    return (
        <div className='w-full h-[90%] flex justify-center items-center'>
            <TodayDailyTabStructure tabs={TodayDailyHistoryTabs} />
        </div>
    )
}

export default TodayDailyTabInfo;