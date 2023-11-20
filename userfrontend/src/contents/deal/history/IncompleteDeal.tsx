import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { serverurl } from '../../../components/serverurl';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface IncompleteDealRequest {
    id: number;
    order_type: string;
    createdAt: string;
    order_price: number;
    possible_amount: number;
}

interface CancelArguments {
    id: number;
}

const fetchIncompleteDeal = async (propertyName: string): Promise<IncompleteDealRequest[]> => {
    const {data} = await axios.get(`${serverurl}/order/not_conclusion/${propertyName}`);
    return data;
};

const cancelIncompleteDeal = async (propertyName:string,id: number):Promise<string> => {
    const {data} = await axios.get(`${serverurl}/order/cancel/${propertyName}/${id}`);
    return data;
};

const IncompleteDeal: React.FC = () => {
    const currentPage = useLocation();

    const queryClient = useQueryClient();

    const [orderType,setOrderType] = useState<string>("");
    const [orderDate,setOrderDate] = useState<string>("");

    const {data: incompleteDeals,isLoading,isError,error} = useQuery(
        ["incompleteDeals",currentPage.state.propertyName],
        () => fetchIncompleteDeal(currentPage.state.propertyName)
    );

    const cancelMutation = useMutation(
        (args: CancelArguments) => cancelIncompleteDeal(currentPage.state.propertyName,args.id),
        {
            onSuccess: (data)=>{
                console.log(data);
                queryClient.refetchQueries("incompleteDeals");
            },
            onError: (error)=>{
                console.log(error);
            }
        }
    );

    const handleCancel = (id: number) => {
        cancelMutation.mutate({id});
    };

    useEffect(()=>{
        console.log(incompleteDeals);
        if(incompleteDeals){
            incompleteDeals.map((item,index)=>{
                if(item.order_type === "buy"){
                    setOrderType("구매");
                }else{
                    setOrderType("판매");
                };

                setOrderDate(item.createdAt.slice(0,10)+ " " + item.createdAt.slice(11,16));
            })
        }
    },[incompleteDeals])

    const fromRecent = incompleteDeals && incompleteDeals.sort((a,b)=>{
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
                        <div className={`w-[80%] h-1/5 text-xs md:text-lg flex justify-between ${orderType === "판매" ? "blueText" : "redText"}`}>
                            <div className='flex justify-center items-center'>{orderType}</div>
                            <button onClick={()=>handleCancel(item.id)} className='w-[30%] h-full bg-slate-400 text-xs text-white rounded-md flex justify-center items-center'>취소</button>
                        </div>
                        <div className='w-[80%] h-1/5 text-xxs md:text-sm text-slate-400 flex items-center '>{orderDate}</div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>가격</p>
                            <div>{item.order_price} 원</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>수량</p>
                            <div>{item.possible_amount} 개</div>
                        </div>
                        <div className='w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between'>
                            <p>금액</p>
                            <div>{item.order_price * item.possible_amount} 원</div>
                        </div>
                    </div>
                )
            })}
        </>
    )
};

export default IncompleteDeal;