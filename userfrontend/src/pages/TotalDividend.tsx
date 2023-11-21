import React from 'react';
import DividendTable from '../contents/total_dividend/DividendTable';
import BackBtn from '../components/BackBtn';

const TotalDividend: React.FC = () => {
    return (
        <div className='w-screen h-screen'>
            <BackBtn />
            <div className='w-full h-20 flex flex-col justify-center items-start text-xl font-bold 
            pl-5 pt-5'>
                배당금 내역
            </div>
            <DividendTable />
        </div>
    )
}

export default TotalDividend;