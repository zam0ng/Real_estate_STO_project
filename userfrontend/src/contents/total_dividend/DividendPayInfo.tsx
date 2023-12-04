import React, { useEffect, useState } from "react";
import { TotalDividendRequest } from "./DividendTable";

const DividendPayInfo: React.FC<TotalDividendRequest> = ({
  dividend_basedate,
  dividend_paymentdate,
  dividend_price,
}) => {
  const [baseYear, setBaseYear] = useState<string>("");
  const [payYear, setPayYear] = useState<string>("");

  const [baseMonth, setBaseMonth] = useState<string>("");
  const [payMonth, setPayMonth] = useState<string>("");

  const [baseDay, setBaseDay] = useState<string>("");
  const [payDay, setPayDay] = useState<string>("");

  const baseDate = new Date(dividend_basedate);
  const payDate = new Date(dividend_paymentdate);

  useEffect(() => {
    setBaseYear(baseDate.getFullYear().toString().slice(-2));
    setPayYear(payDate.getFullYear().toString().slice(-2));

        if((baseDate.getMonth() + 1).toString.length === 1){
            setBaseMonth(`0${baseDate.getMonth()}`);
        }else{
            setBaseMonth((baseDate.getMonth() + 1).toString());
        };

        if((baseDate.getMonth() + 1).toString.length === 1){
            setPayMonth(`0${payDate.getMonth()}`);
        }else{
            setPayMonth((payDate.getMonth() + 1).toString());
        };
        
        if(baseDate.getDay().toString().length === 1){
            setBaseDay(`${((baseDate.getDate()).toString()).padStart(2,'0')}`);
        }else{
            setBaseDay(baseDate.getDate().toString());
        };
    
        if(payDate.getDay().toString().length === 1){
            setPayDay(`${((payDate.getDate()).toString()).padStart(2,'0')}`);
        }else{
            setPayDay(payDate.getDate().toString());
        };
    },[]);

  return (
    <div className="w-full h-[8%] flex flex-row">
      <div className="w-[30%] h-full text-sm flex justify-center items-center">
        {`${baseYear}.${baseMonth}.${baseDay}`}
      </div>
      <div className="w-[30%] h-full text-sm flex justify-center items-center">
        {`${payYear}.${payMonth}.${payDay}`}
      </div>
      <div className="w-[40%] h-full text-sm flex justify-center items-center font-semibold">
        {dividend_price}원
      </div>
    </div>
  );
};

export default DividendPayInfo;
