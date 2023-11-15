import React, { useContext, useEffect } from 'react';
import { MarketHistoryContext } from '../../../pages/MarketHistory';

const TodayHistoryTable: React.FC = () => {
  const selectedPropertyName = useContext(MarketHistoryContext);

  const fetchTodayHistory = async ()=>{
    const response = await fetch(`http://127.0.0.1:8080/market/detail/dayQuote/${selectedPropertyName}`);
    console.log(response);
  };

  useEffect(()=>{
    
  },[])

  return (
    <div>

    </div>
  )
}

export default TodayHistoryTable;