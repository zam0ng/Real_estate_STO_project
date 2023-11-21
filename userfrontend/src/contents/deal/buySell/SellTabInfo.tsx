import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { serverurl } from '../../../components/serverurl';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

interface SellPost {
    price: number;
    amount: number;
}

const sellPost = async (propertyName: string,sellData:SellPost): Promise<string> => {
    const {data} = await axios.post<string>(`${serverurl}/order/sell/${propertyName}`,sellData);
    // console.log(data);
    return data;
}

const SellTabInfo: React.FC = () => {
    const currentPage = useLocation();

    const queryClient = useQueryClient();

    const [sellPrice,setSellPrice] = useState<any>(0);
    const [sellAmount,setSellAmount] = useState<any>(0);

    const priceInputRef = useRef<HTMLInputElement>(null);
    const amountInputRef = useRef<HTMLInputElement>(null);

    const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const price = parseFloat(event.target.value);
        if(!isNaN(price)){
            setSellPrice(price);
        };
    };

    const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const amount = parseFloat(event.target.value);
        if(!isNaN(amount)){
            setSellAmount(amount);
        };
    };

    // 초기화 버튼 전용
    const clearInputs = (event: React.MouseEvent<HTMLButtonElement>)=>{
        if(priceInputRef.current && priceInputRef.current?.value !== ""){
            priceInputRef.current.value = "";
        };
        if(amountInputRef.current && amountInputRef.current?.value !== ""){
            amountInputRef.current.value = "";
        };
        setSellPrice("");
        setSellAmount("");
    };

    // 매도 완료 혹은 매도 주문 완료 전용
    const clearInputs2 = ()=>{
        if(priceInputRef.current && priceInputRef.current?.value !== ""){
            priceInputRef.current.value = "";
        };
        if(amountInputRef.current && amountInputRef.current?.value !== ""){
            amountInputRef.current.value = "";
        };
        setSellPrice("");
        setSellAmount("");
    };

    const mutation = useMutation<string,Error,{propertyName: string; sellData:SellPost}>(
        {
            mutationFn:({propertyName,sellData})=>sellPost(propertyName,sellData),
            onSuccess: (data)=>{
                console.log(data);
                clearInputs2();
                queryClient.refetchQueries({queryKey:["incompleteDeals"]});
            },
            onError: (error)=>{
                console.log(error);
            }
        }
    );

    const handleSubmit = (propertyName: string, sellData: SellPost)=>{
        mutation.mutate({propertyName,sellData});
    };

    useEffect(()=>{
        console.log(sellPrice);
    },[sellPrice]);

    return (
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            const newData = {price: sellPrice,amount:sellAmount};
            handleSubmit(currentPage.state.propertyName,newData);
        }}>
            <div className='buy-sell-input w-full h-full flex flex-col text-sm'>
                <div className='buy-input w-full h-full border-b border-dashed flex flex-col justify-center items-center'>
                    <div className='w-[70%] flex flex-row justify-end items-center mt-2 mb-1'>
                        <input ref={priceInputRef} className='w-[96%] border border-slate-300 rounded-md text-right pr-1 mr-1' 
                        type='text' placeholder='0' onChange={handlePriceInput} />
                        <span className='w-[4%] h-full flex justify-center items-center'>원</span>
                    </div>
                    <div className='w-[70%] flex flex-row justify-end items-center mt-1 mb-1'>
                        <input ref={amountInputRef} className='w-[96%] border border-slate-300 rounded-md text-right pr-1 mr-1' 
                        type='text' placeholder='0' onChange={handleAmountInput} />
                        <span className='w-[4%] h-full flex justify-center items-center'>개</span>
                    </div>
                    <div className='w-[70%] h-5 flex flex-row justify-end mt-1 mb-1'>
                        총 <span className='ml-2'>{sellPrice * sellAmount} 원</span>
                    </div>
                    <div className='w-[70%] h-5 flex justify-between text-xs'>
                        <button className='bg-slate-400 text-white w-[40%] h-5' onClick={clearInputs}>초기화</button>
                        <button type='submit' className='bg-blue-500 text-white w-[55%] h-5'>매도</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default SellTabInfo;