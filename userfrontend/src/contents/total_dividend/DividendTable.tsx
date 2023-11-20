import React from 'react';
import DividendTableHeader from './DividendTableHeader';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import DividendPayInfo from './DividendPayInfo';
import axios from 'axios';
import { serverurl } from '../../components/serverurl';

export interface TotalDividendRequest {
    dividend_basedate: any;
    dividend_paymentdate: any;
    dividend_price: any;
}

const DividendTable: React.FC = () => {
    const currentPage = useLocation();
    // console.log(currentPage);
    const propertyName = currentPage.state.propertyName;

    const totalDividendFetch = async (): Promise<TotalDividendRequest[]> => {
        const {data} = await axios.get(`${serverurl}/market/detail/dividend/${propertyName}`);
        return data;
    };

    const {data,error,isLoading,isError} = useQuery<TotalDividendRequest[],Error>(
        {queryKey:["totalDividendQuery",propertyName],
        queryFn:totalDividendFetch}
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