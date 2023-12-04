import React, { createContext, useEffect } from "react";
import MySubscriptionList from "../MySubscriptionList";
import axios from "axios";
import { serverurl } from "../../../../components/serverurl";
import { UserEmailProps } from "../../personal_info/layout/MyInfo";
import { useQuery } from "@tanstack/react-query";
import AOS from 'aos'

export interface MySubscriptionListRequest {
  id?: number;
  subscription_name: string;
  subscription_img_1: string;
  application_date: string;
  subscription_end_date: string;
  amount: number;
  subscription_offering_price: string;
  refund_price: string;
  subscription_order_amount: number;
  subscription_totalsupply: number;
}

const fetchMySubscriptionList = async (
  email: string
): Promise<MySubscriptionListRequest[]> => {
  const response = await axios.get(`${serverurl}/mypage/subscription_list`, {
    params: {
      user_email: email,
    },
  });
  return response.data;
};

export const SubscriptionContext = createContext<
  MySubscriptionListRequest[] | undefined
>(undefined);

// 컴포넌트
const MySubscription: React.FC<UserEmailProps> = ({ email }) => {
  const { data, isLoading, error, isError } = useQuery<
    MySubscriptionListRequest[]
  >({
    queryKey: ["fetchMySubscriptionList", email],
    queryFn: () => fetchMySubscriptionList(email),
    enabled: !!email,
  });

  useEffect(() => {
    AOS.init({duration : 1200})
  }, []);
  console.log("data+_+_+_+_+_",data);

  return (
    <SubscriptionContext.Provider value={data}>
      <div className="w-[90%] h-96 mt-5 mb-16 pt-5 pr-5 pl-5 bg-[#EDF0F4] rounded-xl shadow-innerneu2" data-aos='fade-up'>
        <div className="w-full h-[10%] flex justify-start items-start text-xl">
          내 청약 목록
        </div>
        <div className="w-full h-[80%] overflow-y-scroll">
          <MySubscriptionList />
        </div>
      </div>
    </SubscriptionContext.Provider>
  );
};

export default MySubscription;
