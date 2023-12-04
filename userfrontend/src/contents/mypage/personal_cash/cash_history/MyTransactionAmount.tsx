import React, { useEffect, useState } from 'react';

interface TransactionAmountProps {
    status: string;
    price: number;
}

const MyTransactionAmount: React.FC<TransactionAmountProps> = ({status,price}) => {
    const [textColor,setTextColor] = useState<string>("");
    const [amount,setAmount] = useState<string>("");

    useEffect(()=>{
        if(status === "입금"){
            setTextColor("text-red-500");
            setAmount(`+${price.toLocaleString()}`);
        }else{
            setTextColor("text-blue-500");
            setAmount(`-${price.toLocaleString()}`);
        }
    },[status,price]);

    return (
        <div className={`w-full h-[50%] flex justify-end items-end text-lg font-medium ${textColor}`}>
            {amount} 원
        </div>
    )
}

export default MyTransactionAmount;