import React, { useEffect } from 'react';
import MySubscriptionList from '../MySubscriptionList';
import axios from 'axios';
import { serverurl } from '../../../../components/serverurl';
import { UserEmailProps } from '../../personal_info/layout/MyInfo';
import { useQuery } from '@tanstack/react-query';

interface MySubscriptionListRequest {
  subscription_name: string;
  subscription_img: string;
  application_date: string;
  subscription_end_date: string;
  subscription_my_amount: number;
  subscription_offering_price: number;
  refund_price: number;
}

const fetchMySubscriptionList = async (email: string): Promise<MySubscriptionListRequest[]> => {
  const response = await axios.get(`${serverurl}/mypage/subscription_list`,{
    params: {
      user_email : email
    }
  });
  return response.data;
}

const MySubscription: React.FC<UserEmailProps> = ({email}) => {
  const {data,isLoading,error,isError} = useQuery<MySubscriptionListRequest[]>({
    queryKey: ["fetchMySubscriptionList",email],
    queryFn: ()=>fetchMySubscriptionList(email),
    enabled: !!email
  });

  useEffect(()=>{
    console.log("subscription : ",data);
  },[data]);

  return (
    <div className='w-[90%] h-96 mt-5 border border-slate-200 rounded-lg shadow-lg pr-5 pl-5'>
      <div className='w-full h-[20%] flex justify-start items-center text-xl'>
        내 청약 목록
      </div>
      <div className='w-full h-[75%] overflow-y-scroll'>
        <MySubscriptionList />
      </div>
    </div>
  )
}

export default MySubscription;