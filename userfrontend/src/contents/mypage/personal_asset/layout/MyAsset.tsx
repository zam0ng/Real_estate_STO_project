import React, { useEffect, useState } from "react";
import MyAssetValueChange from "../MyAssetValueChange";
import MyTotalBuy from "../MyTotalBuy";
import MyTotalValue from "../MyTotalValue";
import MyAssetHistoryTable from "../asset_history/MyAssetHistoryTable";
import { UserEmailProps } from "../../personal_info/layout/MyInfo";
import axios from "axios";
import { serverurl } from "../../../../components/serverurl";
import { useQuery } from "@tanstack/react-query";
import PopupInfo from "../asset_history/PopupInfo";
import AOS from 'aos'


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

  const [popUp,setPopUp] = useState<boolean>(false);

  const togglePopup = () => {
    setPopUp(prev => !prev);
  };

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

  useEffect(()=>{
    AOS.init({duration : 1200})
  })

  return (
    <div className="w-[90%] h-96 mt-5 bg-[#EDF0F4] rounded-xl shadow-innerneu2 pr-5 pl-5" data-aos='fade-up'>
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
      <div className="relative w-full h-[5%] flex flex-row justify-start items-center" onClick={togglePopup}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.08997 9.00008C9.32507 8.33175 9.78912 7.76819 10.3999 7.40921C11.0107 7.05024 11.7289 6.91902 12.4271 7.03879C13.1254 7.15857 13.7588 7.52161 14.215 8.06361C14.6713 8.60561 14.921 9.2916 14.92 10.0001C14.92 12.0001 11.92 13.0001 11.92 13.0001" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17H12.01" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xs-sm flex justify-center items-center ml-1 text-slate-400">MetaMask에 토큰 불러오기</span>
        {popUp && <PopupInfo />}
      </div>
      {totalAsset && totalAsset.length > 0 && (
        <MyAssetHistoryTable email={email} />
      )}
    </div>
  );
};

export default MyAsset;
