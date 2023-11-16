import React, { useContext } from 'react';
import TodayDailyTabInfo from './history_tabs/TodayDailyTabInfo';
import { MarketHistoryContext } from '../../pages/MarketHistory';

const SeparateHistory: React.FC= () => {
    const selectedPropertyName = useContext(MarketHistoryContext);

    return (
        <div className='w-full h-full'>
            <div className='w-full h-[10%] flex justify-center items-center'>
                {selectedPropertyName}
            </div>
            <div className='w-full h-[90%]'>
                <TodayDailyTabInfo />
            </div>
        </div>
    )
}

export default SeparateHistory;