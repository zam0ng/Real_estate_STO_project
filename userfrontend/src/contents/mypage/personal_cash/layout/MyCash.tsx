import React from "react";
import MyTotalDeposit from "../MyTotalDeposit";
import MyTotalWithdrawal from "../MyTotalWithdrawal";
import MyCashHistory from "../MyCashHistory";
import AOS from 'aos'
import { useEffect } from "react";

const MyCash: React.FC = () => {

  useEffect(()=>{
    AOS.init({duration : 1200})
  },[])
  return (
    <div className="w-[90%] h-128" data-aos='slide-right'>
      <div className="w-full h-[10%] flex justify-start items-end pl-3">
        총 입출금액
      </div>
      <div className="w-full h-[20%] flex flex-row justify-evenly items-center">
        <MyTotalDeposit />
        <MyTotalWithdrawal />
      </div>
      <div className="w-full h-[70%] bg-[#EDF0F4] rounded-xl shadow-innerneu2">
        <MyCashHistory />
      </div>
    </div>
  );
};

export default MyCash;
