import React from "react";
import MyTotalDeposit from "../MyTotalDeposit";
import MyTotalWithdrawal from "../MyTotalWithdrawal";
import MyCashHistory from "../MyCashHistory";

const MyCash: React.FC = () => {
  return (
    <div className="w-[90%] h-128">
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
