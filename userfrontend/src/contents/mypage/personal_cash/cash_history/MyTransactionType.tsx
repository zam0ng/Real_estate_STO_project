import React, { useEffect, useState } from 'react';

interface TransactionTypeProps {
    status: string;
}

const MyTransactionType: React.FC<TransactionTypeProps> = ({status}) => {
    const [textColor,setTextColor] = useState<string>("");

    useEffect(()=>{
        if(status === "입금"){
            setTextColor("text-red-500");
        }else{
            setTextColor("text-blue-500");
        }
    },[status]);

    return (
        <div className={`w-full h-[50%] text-lg font-medium flex justify-start items-end ${textColor}`}>
            {status}
        </div>
    )
}

export default MyTransactionType;