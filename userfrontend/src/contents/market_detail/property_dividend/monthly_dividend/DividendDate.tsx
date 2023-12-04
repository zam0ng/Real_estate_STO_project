import React, { useContext, useEffect, useState } from "react";
import { MarketDetailContext } from "../../../../pages/MarketDetail";
import DividendSetDate from "./DividendSetDate";
import DividendGetDate from "./DividendGetDate";

const DividendDate = () => {
  const [baseDate, setBaseDate] = useState<Date>(new Date());
  const [payDate, setPayDate] = useState<Date>(new Date());

  const data = useContext(MarketDetailContext);
  console.log("data_+_+_+_+_",data);

  useEffect(() => {
    if (data?.dividend_basedate !== undefined) {
      setBaseDate(new Date(data.dividend_basedate));
    }

    if (data?.dividend_paymentdate !== undefined) {
      setPayDate(new Date(data.dividend_paymentdate));
    }
  }, [data]);

  const basedateYear = baseDate.getFullYear();
  const basedateMonth = baseDate.getMonth()+1;

  return (
    <div className="w-full h-[55%]">
      <div className="w-full h-[40%] flex items-center ml-5 font-medium">
        {`${basedateYear}년 ${basedateMonth}월`}
      </div>
      <DividendSetDate setDate={baseDate} />
      <DividendGetDate getDate={payDate} />
    </div>
  );
};

export default DividendDate;
