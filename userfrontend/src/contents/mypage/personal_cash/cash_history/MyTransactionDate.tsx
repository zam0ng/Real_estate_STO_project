import React, { useEffect, useState } from 'react';

interface TransactionDateProps {
    createdAt: string;
}

const MyTransactionDate: React.FC<TransactionDateProps> = ({createdAt}) => {
    const [digitMonth,setDigitMonth] = useState<string>("");
    const [digitDay,setDigitDay] = useState<string>("");
    const [digitMinute,setDigitMinute] = useState<string>("");

    const transactionDate = new Date(createdAt);
    const transactionYear = transactionDate.getFullYear().toString().slice(-2);
    const transactionMonth = transactionDate.getMonth() + 1;
    const transactionDay = transactionDate.getDate();
    const transactionHour = transactionDate.getHours();
    const transactionMinute = transactionDate.getMinutes();

    useEffect(()=>{
        // console.log(transactionYear,transactionMonth,transactionDay,transactionHour,transactionMinute);
        if(transactionMonth < 10){
            setDigitMonth(`0${transactionMonth}`);
        }else{
            setDigitMonth(`${transactionMonth}`);
        }
    },[transactionMonth]);

    useEffect(()=>{
        if(transactionDay < 10){
            setDigitDay(`0${transactionDay}`);
        }else{
            setDigitDay(`${transactionDay}`);
        }
    },[transactionDay]);

    useEffect(()=>{
        if(transactionMinute < 10){
            setDigitMinute(`0${transactionMinute}`);
        }else{
            setDigitMinute(`${transactionMinute}`);
        }
    },[transactionMinute]);

    return (
        <div className='w-full h-[50%] flex justify-start items-start text-sm'>
            <span className='w-auto h-auto text-slate-500 mr-2'>{`${transactionYear}.${digitMonth}.${digitDay}`}</span>
            {`${transactionHour}:${digitMinute}`}
        </div>
    )
}

export default MyTransactionDate;