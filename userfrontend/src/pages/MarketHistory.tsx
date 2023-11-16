import React, { createContext } from 'react';
import { useLocation } from 'react-router-dom';
import SeparateHistory from '../contents/market_history/SeparateHistory';

export const MarketHistoryContext = createContext<string>("");

const MarketHistory: React.FC = () => {
    const currentPage = useLocation();
    const {propertyName} = currentPage.state;
    console.log(propertyName);

    return (
        <MarketHistoryContext.Provider value={propertyName}> 
            <div className='w-screen h-screen'>
                <SeparateHistory />
            </div>
        </MarketHistoryContext.Provider>
    )
}

export default MarketHistory;