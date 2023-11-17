import React from 'react';
import DividendTableHeader from './DividendTableHeader';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import DividendPayInfo from './DividendPayInfo';
import { serverUrl } from '../../components/serverurl';

export interface TotalDividendRequest {
    dividend_basedate: string;
    dividend_paymentdate: string;
    dividend_price: number;
}

const DividendTable: React.FC = () => {
    const currentPage = useLocation();
    // console.log(currentPage);
    const propertyName = currentPage.state.propertyName;

    const totalDividendFetch = async (): Promise<TotalDividendRequest[]> => {
        const response = await fetch(`${serverUrl}/market/detail/dividend/${propertyName}`);
        if(!response.ok){
            throw new Error("could not fetch data from /market/detail/dividend");
        };
        return response.json();
    };

    const {data,error,isLoading,isError} = useQuery<TotalDividendRequest[],Error>(
        ["totalDividendQuery",propertyName],
        totalDividendFetch
    );

    console.log(data);

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    };

    if(isError){
        return (
            <div>Error : {error.message}</div>
        )
    };

    return (
        <div className='w-full h-[80%] flex flex-col items-center'>
            <DividendTableHeader />
            <div className='w-[90%] h-full overflow-y-scroll'>
                {data && data.map((item,index)=>(
                    <DividendPayInfo key={index} dividend_basedate={item.dividend_basedate} 
                    dividend_paymentdate={item.dividend_paymentdate} dividend_price={item.dividend_price} />
                ))}
            </div>
        </div>
    )
}

export default DividendTable;