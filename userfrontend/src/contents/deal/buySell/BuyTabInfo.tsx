import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { serverurl } from '../../../components/serverurl';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface BuyPost {
    price: number;
    amount: number;
}

const buyPost = async (propertyName: string,buyData:BuyPost): Promise<string> => {
    const {data} = await axios.post<string>(`${serverurl}/order/buy/${propertyName}`,buyData);
    // console.log(data);
    return data;
}

const BuyTabInfo: React.FC = () => {
    const currentPage = useLocation();
    // console.log(currentPage.state);
    const queryClient = useQueryClient();

    const [buyPrice,setBuyPrice] = useState<any>(0);
    const [buyAmount,setBuyAmount] = useState<any>(0);

    const priceInputRef = useRef<HTMLInputElement>(null);
    const amountInputRef = useRef<HTMLInputElement>(null);

    const handlePriceInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const price = parseFloat(event.target.value);
        if(!isNaN(price)){
            setBuyPrice(price);
        };
    };

    const handleAmountInput = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const amount = parseFloat(event.target.value);
        if(!isNaN(amount)){
            setBuyAmount(amount);
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
        setBuyPrice("");
        setBuyAmount("");
    };

    // 매수 완료 혹은 매수 주문 완료 전용
    const clearInputs2 = ()=>{
        if(priceInputRef.current && priceInputRef.current?.value !== ""){
            priceInputRef.current.value = "";
        };
        if(amountInputRef.current && amountInputRef.current?.value !== ""){
            amountInputRef.current.value = "";
        };
        setBuyPrice("");
        setBuyAmount("");
    };

    const mutation = useMutation<string,Error,{propertyName: string; buyData: BuyPost}>(
        {
            mutationFn:({propertyName,buyData})=>buyPost(propertyName,buyData),
            onSuccess: (data) => {
                console.log(data);
                clearInputs2();
                queryClient.refetchQueries({queryKey:["incompleteDeals"]})
            },
            onError: (error) => {
                console.log(error);
            }
        }
    );
    // event: React.FormEvent<HTMLFormElement>

    const handleSubmit = (propertyName: string, buyData: BuyPost)=>{
        mutation.mutate({propertyName,buyData});
    };

    useEffect(()=>{
        console.log(buyPrice);
    },[buyPrice]);

    return (
        <form onSubmit={(e:React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const newData = {price:buyPrice,amount:buyAmount};
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
                        총 <span className='ml-2'>{buyPrice * buyAmount} 원</span>
                    </div>
                    <div className='w-[70%] h-5 flex justify-between text-xs'>
                        <button className='bg-slate-400 text-white w-[40%] h-5' onClick={clearInputs}>초기화</button>
                        <button type='submit' className='bg-red-500 text-white w-[55%] h-5'>매수</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default BuyTabInfo;