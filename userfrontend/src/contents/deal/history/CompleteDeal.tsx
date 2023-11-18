import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../../../components/serverurl';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

interface CompleteDealRequest {
    buyer_order_email: string;
    createdAt: string;
    order_type: string;
    seller_order_email: string;
    trade_amount: number;
    trade_price: number;
}

const CompleteDeal: React.FC = () => {
    const currentPage = useLocation();

    const [orderType,setOrderType] = useState<string>("");
    const [orderDate,setOrderDate] = useState<string>("");

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
        if(data){
            data.map((item,index)=>{
                if(item.order_type === "buy"){
                    setOrderType("구매");
                }else{
                    setOrderType("판매");
                };

                setOrderDate(item.createdAt.slice(0,10)+ " " + item.createdAt.slice(11,16));
            })
        }
    },[data]);

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
                        <div className={`w-[80%] h-1/5 text-xs md:text-lg flex justify-start items-center ${orderType === "판매" ? "blueText" : "redText"}`}>
                            {orderType}
                        </div>
                        <div className='w-[80%] h-1/5 text-xxs md:text-sm text-slate-400 flex items-center '>{orderDate}</div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>가격</p>
                            <div>{item.trade_price} 원</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>수량</p>
                            <div>{item.trade_amount} 개</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>금액</p>
                            <div>{item.trade_price * item.trade_amount} 원</div>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default CompleteDeal;