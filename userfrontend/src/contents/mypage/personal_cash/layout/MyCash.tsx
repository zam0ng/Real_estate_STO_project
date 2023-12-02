import React from "react";
import MyTotalDeposit from "../MyTotalDeposit";
import MyTotalWithdrawal from "../MyTotalWithdrawal";
import MyCashHistory from "../cash_history/MyCashHistory";
import { UserEmailProps } from "../../personal_info/layout/MyInfo";

const MyCash: React.FC<UserEmailProps> = ({email}) => {
  return (
    <div className="w-[90%] h-128">
      <div className="w-full h-[10%] flex justify-start items-end pl-3">
        총 입출금액
      </div>
      <div className="w-full h-[20%] flex flex-row justify-evenly items-center">
        <MyTotalDeposit email={email} />
        <MyTotalWithdrawal email={email} />
      </div>
      <div className="w-full h-[70%] bg-[#EDF0F4] rounded-xl shadow-innerneu2">
        <MyCashHistory email={email} />
      </div>
    </div>
  );
};

export default MyCash;
