import React, { useEffect } from 'react';
import MyTotalDividend from '../MyTotalDividend';
import MyTotalDividendHistoryTable from '../MyTotalDividendHistoryTable';
import axios from 'axios';
import { serverurl } from '../../../../components/serverurl';
import { UserEmailProps } from '../../personal_info/layout/MyInfo';
import { useQuery } from '@tanstack/react-query';

interface MyTotalDividendsRequest {
  real_estate_name: string;
  user_email: string;
  dividend_price: number;
  amount: number;
  anticipation_dividend: number;
  dividend_status: string;
  dividend_basedate: string;
  dividend_patmentdate: string;
  total_anticipation_dividend: number;
}

const fetchMyTotalDividend = async (email: string): Promise<MyTotalDividendsRequest[]> => {
  const response = await axios.get(`${serverurl}/mypage/dividend_list`,{
    params: {
      user_email: email
    }
  });
  return response.data;
};

const MyDividend: React.FC<UserEmailProps> = ({email}) => {
  const {data,isLoading,error,isError} = useQuery<MyTotalDividendsRequest[]>({
    queryKey: ["fetchMyTotalDividend",email],
    queryFn: ()=>fetchMyTotalDividend(email),
    enabled: !!email
  });

  useEffect(()=>{
    console.log("total dividends : ",data);
  },[data]);

  return (
    <div className='w-[90%] h-96 mt-5 border border-slate-200 rounded-lg shadow-lg pl-5 pr-5'>
      <div className='w-full h-[30%] flex justify-start items-center text-xl'>
        배당금 상세
      </div>
      <MyTotalDividend />
      <MyTotalDividendHistoryTable />
    </div>
  )
}

export default MyDividend;