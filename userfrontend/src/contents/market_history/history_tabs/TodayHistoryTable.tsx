import React, { useContext, useEffect } from "react";
import { MarketHistoryContext } from "../../../pages/MarketHistory";
import { useQuery } from "@tanstack/react-query";
import TableHeader from "./TableHeader";
import TodayHistoryTableInfo from "./TodayHistoryTableInfo";
import { serverurl } from "../../../components/serverurl";
import LoadingComponent from "../../../components/LoadingComponent";

export interface TodayHistoryRequest {
  createdAt: string;
  trade_price: number;
  rises_falls: number;
  trade_amount: number;
}

const TodayHistoryTable: React.FC = () => {
  const selectedPropertyName = useContext(MarketHistoryContext);
  // console.log(selectedPropertyName);

  const fetchTodayHistory = async (): Promise<TodayHistoryRequest[]> => {
    const response = await fetch(
      `${serverurl}/market/detail/dayQuote/${selectedPropertyName}`
    );
    // // console.log(response);
    if (!response.ok) {
      throw new Error("Could not fetch data from /market/detail/dayQuote");
    }
    return response.json();
  };

  const { data, error, isLoading, isError } = useQuery<
    TodayHistoryRequest[],
    Error
  >({
    queryKey: ["todayHistoryQuery", selectedPropertyName],
    queryFn: fetchTodayHistory,
  });

  useEffect(() => {
    console.log(data);
  }, []);

  if (isLoading) {
    return(
      <LoadingComponent/>
  );
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div className="w-[90%] h-full">
      <div className="w-full h-[10%]">
        <TableHeader
          header1="체결시각"
          header2="가격"
          header3="등락율"
          header4="수량"
        />
      </div>
      <div className="w-full h-[90%] flex flex-col">
        {data &&
          data.map((item, index) => (
            <TodayHistoryTableInfo
              key={index}
              createdAt={item.createdAt}
              rises_falls={item.rises_falls}
              trade_amount={item.trade_amount}
              trade_price={item.trade_price}
            />
          ))}
      </div>
    </div>
  );
};

export default TodayHistoryTable;
