import React, { useEffect, useState } from "react";
import MyAssetValueChange from "../MyAssetValueChange";
import MyTotalBuy from "../MyTotalBuy";
import MyTotalValue from "../MyTotalValue";
import MyAssetHistoryTable from "../asset_history/MyAssetHistoryTable";
import { UserEmailProps } from "../../personal_info/layout/MyInfo";
import axios from "axios";
import { serverurl } from "../../../../components/serverurl";
import { useQuery } from "@tanstack/react-query";

interface UserTotalAssetRequest {
  total_profit_loss: number;
  profit_loss_ratio: number;
  balance: number;
  appraise_balance: number;
  total_buy: {
    total_buy: string;
  }
}

const fetchUserTotalAsset = async (
  email: string
): Promise<UserTotalAssetRequest[]> => {
  const { data } = await axios.get(`${serverurl}/mypage/sum_profit_lost`, {
    params: {
      user_email: email,
    },
  });
  return data;
};

// component
const MyAsset: React.FC<UserEmailProps> = ({ email }) => {
  const [totalAssetValue, setTotalAssetValue] = useState<UserTotalAssetRequest>();

  const {data: totalAsset, isLoading: totalAssetLoading, error: totalAssetError} = 
  useQuery<UserTotalAssetRequest[], Error>({
    queryKey: ["fetchUserTotalAsset", email],
    queryFn: () => fetchUserTotalAsset(email),
    enabled: !!email,
  });

  useEffect(() => {
    console.log("total : ",totalAsset);
    if (totalAsset) {
      setTotalAssetValue(totalAsset[0]);
    }
  }, [totalAsset]);

  return (
    <div className="w-[90%] h-96 mt-5 bg-[#EDF0F4] rounded-xl shadow-innerneu2 pr-5 pl-5">
      <div className="w-full h-[15%] flex justify-start items-center text-xl">
        총 자산
      </div>
      <MyAssetValueChange
        total_profit_loss={totalAssetValue?.total_profit_loss}
        profit_loss_ratio={totalAssetValue?.profit_loss_ratio}
      />
      <div className="w-full h-[10%] flex flex-row">
        <MyTotalBuy total_buy={totalAssetValue?.total_buy} />
        <MyTotalValue appraise_balance={totalAssetValue?.appraise_balance} />
      </div>
      <MyAssetHistoryTable email={email} />
    </div>
  );
};

export default MyAsset;
