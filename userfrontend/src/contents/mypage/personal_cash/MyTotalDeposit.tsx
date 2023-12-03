import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverurl } from '../../../components/serverurl';
import { UserEmailProps } from '../personal_info/layout/MyInfo';
import { useQuery } from '@tanstack/react-query';

interface DepositRequest {
  user_email: string;
  price: string;
}

const fetchDeposit = async (email: string): Promise<DepositRequest[]> => {
  const response = await axios.get(`${serverurl}/mypage/total_deposit`,{
    params: {
      user_email: email
    }
  });
  return response.data;
}

const MyTotalDeposit: React.FC<UserEmailProps> = ({email}) => {
  const [totalDeposit,setTotalDeposit] = useState<string>();

  const {data,error,isLoading,isError} = useQuery<DepositRequest[]>({
    queryKey: ["fetchTotalDeposit",email],
    queryFn: ()=>fetchDeposit(email)
  });

  useEffect(()=>{
    // console.log(data);
    if(data){
      if(data.length > 0){
        setTotalDeposit(data[0].price);
      }else{
        setTotalDeposit("0");
      }
    }
  },[data]);

  return (
    <div className='w-[40%] h-[80%] bg-[#EDF0F4] rounded-lg shadow-neu2 '>
        <div className='w-full h-[50%] border-b border-black flex flex-row justify-start items-center pl-3'>
            <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.66663 11.3332L9.99996 7.99984L6.66663 4.6665" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8H2" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            총 입금액
        </div>
        <div className='w-full h-[50%] flex justify-end items-center pr-3'>
            {Number(totalDeposit).toLocaleString()} 원
        </div>
    </div>
  )
}

export default MyTotalDeposit;