import axios from 'axios';
import React, { useEffect } from 'react';
import { serverurl } from '../../../components/serverurl';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

interface CompleteDealRequest {
    order_type: string;
    createdAt: string;
    price: number;
    amount: number;
}

const CompleteDeal: React.FC = () => {
    const currentPage = useLocation();

    const completeList = [
        {
            order_type: "판매",
            createdAt: "2023-11-01 09:00",
            price: 4000,
            amount: 5
        },
        {
            order_type: "구매",
            createdAt: "2023-11-01 10:00",
            price: 4000,
            amount: 5
        },
        {
            order_type: "구매",
            createdAt: "2023-11-01 11:00",
            price: 4000,
            amount: 5
        },
        {
            order_type: "판매",
            createdAt: "2023-11-01 12:00",
            price: 4000,
            amount: 5
        }
    ];

    const fetchCompleteDeal = async (): Promise<CompleteDealRequest[]> => {
        const {data} = await axios.get(`${serverurl}/order/conclusion/${currentPage.state.propertyName}`);
        return data;
    };

    const {data,error,isLoading,isError} = useQuery<CompleteDealRequest[]>(
        ["fetchCompleteDeal",currentPage.state.propertyName],
        fetchCompleteDeal
    );

    useEffect(()=>{
        console.log(data);
    },[data])

    const fromRecent = data && data.sort((a,b)=>{
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
    });
    // console.log(fromRecent);

    return (
        <>
            {fromRecent && fromRecent.map((item,index)=>{
                return(
                    <div className='w-full h-[30%] flex flex-col items-center text-sm mt-2 mb-2' key={index}>
                        <div className={`w-[80%] h-1/5 text-xs md:text-lg flex justify-start items-center ${item.order_type === "판매" ? "blueText" : "redText"}`}>{item.order_type}</div>
                        <div className='w-[80%] h-1/5 text-xxs md:text-sm text-slate-400 flex items-center '>{item.createdAt}</div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>가격</p>
                            <div>{item.price} 원</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>수량</p>
                            <div>{item.amount} 개</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>금액</p>
                            <div>{item.price * item.amount} 원</div>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default CompleteDeal;