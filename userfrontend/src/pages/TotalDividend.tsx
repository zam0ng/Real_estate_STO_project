import React from 'react';
import DividendTable from '../contents/total_dividend/DividendTable';

const TotalDividend: React.FC = () => {
    return (
        <div className='w-screen h-screen'>
            <div className='w-full h-28 flex justify-start items-end text-xl font-bold 
            pl-5 pt-5'>
                배당금 내역
            </div>
            <DividendTable />
        </div>
    )
}

export default TotalDividend;