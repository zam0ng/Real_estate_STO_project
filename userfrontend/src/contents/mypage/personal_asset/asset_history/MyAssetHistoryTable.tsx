import React, { useEffect } from "react";
import MyAssetHistoryTableHeader from "./MyAssetHistoryTableHeader";
import MyAssetHistoryTableBody from "./MyAssetHistoryTableBody";
import axios from "axios";
import { serverurl } from "../../../../components/serverurl";
import { UserEmailProps } from "../../personal_info/layout/MyInfo";
import { useQuery } from "@tanstack/react-query";

interface UserAssetsRequest {
  real_estate_name: string;
  price: number;
  amount: number;
  valuation: number;
  present_price: number;
  possible_quantity: number;
  rate_of_return: number;
}

const fetchUserAssets = async (email: string): Promise<UserAssetsRequest[]> => {
  const { data } = await axios.get(`${serverurl}/mypage/asset_information`, {
    params: {
      user_email: email,
    },
  });
  return data;
};

const MyAssetHistoryTable: React.FC<UserEmailProps> = ({ email }) => {
  const { data, isLoading, error, isError } = useQuery<
    UserAssetsRequest[],
    Error
  >({
    queryKey: ["fetchUserAssets", email],
    queryFn: () => fetchUserAssets(email),
    enabled: !!email,
  });

  useEffect(() => {
    // console.log("types : ",data);
  }, [data]);

  return (
    <div className="w-full h-[60%] flex flex-col justify-start items-center rounded-lg">
      <MyAssetHistoryTableHeader />
      <div className="w-full h-[70%] border-b border-slate-200 flex flex-col text-sm overflow-y-scroll">
        {data &&
          data.map((item, index) => (
            <MyAssetHistoryTableBody
              key={index}
              name={item.real_estate_name}
              price={item.price}
              amount={item.amount}
              valuation={item.valuation}
              present_price={item.present_price}
              possible_quantity={item.possible_quantity}
              rate_of_return={item.rate_of_return}
            />
          ))}
      </div>
    </div>
  );
};

export default MyAssetHistoryTable;
