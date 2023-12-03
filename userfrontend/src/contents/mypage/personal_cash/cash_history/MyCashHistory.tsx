import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../../../../components/serverurl';
import { useQuery } from '@tanstack/react-query';
import { UserEmailProps } from '../../personal_info/layout/MyInfo';
import MyTransactionType from './MyTransactionType';
import MyTransactionDate from './MyTransactionDate';
import MyTransactionAmount from './MyTransactionAmount';
import MyTotalCashAmount from './MyTotalCashAmount';

interface BankTransactionRequest {
    status: string;
    price: number;
    balance: number;
    createdAt: string;
  }
  
  const fetchTransactionHistory = async (email: string): Promise<BankTransactionRequest[]> => {
    const response = await axios.get(`${serverurl}/mypage/transaction_list`,{
        params: {
            user_email: email
        }
    });
    return response.data;
  };

const MyCashHistory: React.FC<UserEmailProps> = ({email}) => {
    const [fromRecent, setFromRecent] = useState<BankTransactionRequest[]>([]);

    const {data,error,isLoading,isError} = useQuery<BankTransactionRequest[]>({
        queryKey: ["fetchTransactionHistory"],
        queryFn: ()=>fetchTransactionHistory(email),
        enabled: !!email
    });

    useEffect(()=>{
        if (data === undefined) {
            return;
          } else {
            const sortedByDate = data.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
      
              return dateB.getTime() - dateA.getTime();
            });
      
            setFromRecent(sortedByDate);
          }
    },[data]);

    return (
        <div className='w-full h-full pt-2 pb-5'>
            <div className='w-full h-[15%] text-xl flex justify-start items-center pl-5'>
                입출입 거래 내역
            </div>
            <div className='w-full h-[80%] flex flex-col overflow-y-scroll'>
                {fromRecent && fromRecent.length > 0 && fromRecent.map((item,index)=>(
                    <div className='w-full h-12 flex flex-row mb-1 mt-1' key={index}>
                        <div className='w-[40%] h-full flex flex-col pl-5'>
                            <MyTransactionType status={item.status} />
                            <MyTransactionDate createdAt={item.createdAt} />
                        </div>
                        <div className='w-[60%] h-full flex flex-col pr-5'>
                            <MyTransactionAmount status={item.status} price={item.price} />
                            <MyTotalCashAmount balance={item.balance} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyCashHistory;