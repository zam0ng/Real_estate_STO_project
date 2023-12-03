import React, { useContext, useEffect } from "react";
import { MarketHistoryContext } from "../../../pages/MarketHistory";
import { useQuery } from "@tanstack/react-query";
import TableHeader from "./TableHeader";
import DailyHistoryTableInfo from "./DailyHistoryTableInfo";
import { serverurl } from "../../../components/serverurl";
import LoadingComponent from "../../../components/LoadingComponent";
interface DailyHistoryRequest {
  real_estate_name: string;
  trade_price: number;
  next_trade_price: number;
  date: string;
  total_price: number;
  fluctuation_price: number;
}

const DailyHistoryTable: React.FC = () => {
  const selectedPropertyName = useContext(MarketHistoryContext);
  // console.log(selectedPropertyName);

  const fetchDailyHistory = async (): Promise<DailyHistoryRequest[]> => {
    const response = await fetch(
      `${serverurl}/market/detail/daliyQuote/${selectedPropertyName}`
    );
    // // console.log(response);
    if (!response.ok) {
      throw new Error("Could not fetch data from /market/detail/dayQuote");
    }
    return response.json();
  };

  const { data, error, isLoading, isError } = useQuery<
    DailyHistoryRequest[],
    Error
  >({
    queryKey: ["dailyHistoryQuery", selectedPropertyName],
    queryFn: fetchDailyHistory,
  });

  useEffect(() => {
    // console.log(data);
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
    <div className="w-[90%] h-full ">
      <div className="w-full h-[10%]">
        <TableHeader
          header1="날짜"
          header2="익일기준가"
          header3="변동액"
          header4="거래대금"
        />
      </div>
      <div className="w-full h-[90%] flex flex-col">
        {data &&
          data.map((item, index) => (
            <DailyHistoryTableInfo
              key={index}
              date={item.date}
              next_trade_price={item.next_trade_price}
              fluctuation_price={item.fluctuation_price}
              total_price={item.total_price}
            />
          ))}
      </div>
    </div>
  );
};

export default DailyHistoryTable;
