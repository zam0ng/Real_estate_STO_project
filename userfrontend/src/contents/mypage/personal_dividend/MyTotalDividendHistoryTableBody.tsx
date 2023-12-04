import React, { useContext, useEffect, useState } from "react";
import { TotalDividendHistoryContext } from "./layout/MyDividend";

const MyTotalDividendHistoryTableBody: React.FC = () => {
  const [baseDate, setBaseDate] = useState<string>("");
  const [payDate, setPayDate] = useState<string>("");

  const myDividendHistory = useContext(TotalDividendHistoryContext);

  useEffect(() => {
    console.log("myDividendHistory");
    console.log(myDividendHistory);
    if (myDividendHistory !== undefined) {
      const baseDateParts = myDividendHistory[0]?.dividend_basedate.split("-");
      if (baseDateParts !== undefined) {
        setBaseDate(`${baseDateParts[1]}.${baseDateParts[2]}`);
      }
      const payDateParts =
        myDividendHistory[0]?.dividend_paymentdate.split("-");
      if (payDateParts !== undefined) {
        setPayDate(`${payDateParts[1]}.${payDateParts[2]}`);
      }
    }
  }, [myDividendHistory]);

  if (myDividendHistory === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-8 rounded-lg flex flex-row text-xs">
      <div className="w-1/6 h-full flex justify-center items-center">
        {myDividendHistory[0]?.real_estate_name}
      </div>
      <div className="w-1/6 h-full flex justify-center items-center">
        {baseDate}
      </div>
      <div className="w-1/6 h-full flex justify-center items-center">
        {payDate}
      </div>
      <div className="w-1/6 h-full flex justify-center items-center">
        {myDividendHistory[0]?.dividend_price}원
      </div>
      <div className="w-1/6 h-full flex justify-center items-center">
        {myDividendHistory[0]?.anticipation_dividend}원
      </div>
      <div className="w-1/6 h-full flex justify-center items-center">
        {myDividendHistory[0]?.dividend_status}
      </div>
    </div>
  );
};

export default MyTotalDividendHistoryTableBody;
