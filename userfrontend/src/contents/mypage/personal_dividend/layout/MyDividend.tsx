import React, { createContext, useEffect } from "react";
import MyTotalDividend from "../MyTotalDividend";
import MyTotalDividendHistoryTable from "../MyTotalDividendHistoryTable";
import axios from "axios";
import { serverurl } from "../../../../components/serverurl";
import { UserEmailProps } from "../../personal_info/layout/MyInfo";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";

interface MyTotalDividendsRequest {
  real_estate_name: string;
  user_email: string;
  dividend_price: number;
  amount: number;
  anticipation_dividend: number;
  dividend_status: string;
  dividend_basedate: string;
  dividend_paymentdate: string;
  total_anticipation_dividend: number;
}

const fetchMyTotalDividend = async (
  email: string
): Promise<MyTotalDividendsRequest[]> => {
  const response = await axios.get(`${serverurl}/mypage/dividend_list`, {
    params: {
      user_email: email,
    },
  });
  return response.data;
};

export const TotalDividendHistoryContext = createContext<
  MyTotalDividendsRequest[] | undefined
>(undefined);

// 컴포넌트
const MyDividend: React.FC<UserEmailProps> = ({ email }) => {
  const { data, isLoading, error, isError } = useQuery<
    MyTotalDividendsRequest[]
  >({
    queryKey: ["fetchMyTotalDividend", email],
    queryFn: () => fetchMyTotalDividend(email),
    enabled: !!email,
  });

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <TotalDividendHistoryContext.Provider value={data}>
      <div
        className="w-[90%] h-60 mt-5 pt-3 pl-5 pr-5  bg-[#EDF0F4] rounded-xl shadow-innerneu2"
        data-aos="fade-up"
      >
        <div className="w-full h-[15%] flex justify-start items-end text-xl">
          배당금 상세
        </div>
        <MyTotalDividend />
        <MyTotalDividendHistoryTable />
      </div>
    </TotalDividendHistoryContext.Provider>
  );
};

export default MyDividend;
