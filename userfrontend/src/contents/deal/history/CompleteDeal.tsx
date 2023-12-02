import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverurl } from "../../../components/serverurl";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Cookies } from "react-cookie";

interface CompleteDealRequest {
  buyer_order_email: string;
  createdAt: string;
  order_type: string;
  seller_order_email: string;
  trade_amount: number;
  trade_price: number;
}

const fetchCompleteDeal = async (
  propertyName: string,
  isCookie: string
): Promise<CompleteDealRequest[]> => {
  const response = await axios.post(
    `${serverurl}/order/conclusion/${propertyName}`,
    { token: isCookie }
  );
  return response.data;
};

const CompleteDeal: React.FC = () => {
  const [fromRecent, setFromRecent] = useState<CompleteDealRequest[]>([]);

  const currentPage = useLocation();

  const cookies = new Cookies();

  const isCookie = cookies.get("accessToken");
  // // console.log(isCookie);

  const { data, error, isLoading, isError } = useQuery<CompleteDealRequest[]>({
    queryKey: ["fetchCompleteDeal", currentPage.state.propertyName],
    queryFn: () => fetchCompleteDeal(currentPage.state.propertyName, isCookie),
  });

  useEffect(() => {
    // console.log(data);
  }, [data]);

  useEffect(() => {
    if(Array.isArray(data)){
      const sortedByDate = data.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        return dateB.getTime() - dateA.getTime();
      });

      setFromRecent(sortedByDate);
    }else{
      setFromRecent([]);
    }
  }, [data]);

  // // console.log(fromRecent);

  return (
    <>
      {fromRecent &&
        fromRecent.map((item, index) => {
          return (
            <div
              className="w-full h-[30%] flex flex-col items-center text-sm mt-2 mb-2"
              key={index}
            >
              <div
                className={`w-[80%] h-1/5 text-xs md:text-lg flex justify-start items-center ${
                  item.order_type === "sell" ? "blueText" : "redText"
                }`}
              >
                {item.order_type === "buy" ? "구매" : "판매"}
              </div>
              <div className="w-[80%] h-1/5 text-xxs md:text-sm text-slate-400 flex items-center ">
                {item.createdAt.slice(0, 10) +
                  " " +
                  item.createdAt.slice(11, 16)}
              </div>
              <div className="w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between">
                <p>가격</p>
                <div>{item.trade_price} 원</div>
              </div>
              <div className="w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between">
                <p>수량</p>
                <div>{item.trade_amount} 개</div>
              </div>
              <div className="w-[80%] h-1/5 text-xs md:text-sm flex flex-row justify-between">
                <p>금액</p>
                <div>{item.trade_price * item.trade_amount} 원</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CompleteDeal;
