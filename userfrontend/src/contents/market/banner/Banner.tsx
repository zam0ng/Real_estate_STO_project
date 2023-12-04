import React from "react";
import BuildingImg from "./BuildingImg";
import BuildingInfo from "./BuildingInfo";
import BuyBtn from "./BuyBtn";
import { useQuery } from "@tanstack/react-query";
import { serverurl } from "../../../components/serverurl";
import LoadingComponent from "../../../components/LoadingComponent";
import ErrorComponent from "../../../components/ErrorComponent";


interface SubscriptionInfo {
  id: number;
  subscription_img_1: string;
  subscription_totalprice: number;
  subscription_description: string;
  subscription_name: string;
  subscription_order_amount: number;
  subscription_restdate: number;
}

// 이 부분 확인하기
const querySubscriptionInfo = async (): Promise<SubscriptionInfo[]> => {
  const response = await fetch(`${serverurl}/market/subscription`);
  if (!response.ok) {
    throw new Error("Could not fetch data of subscription info");
  }
  return response.json();
};

const Banner: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<
    SubscriptionInfo[],
    Error
  >({ queryKey: ["subscriptionData"], queryFn: querySubscriptionInfo });
  // console.log("subscription info : ", data);
  const dataRep = data && data[0];
  const completionRate = data && ((data[0].subscription_order_amount * 5000) / data[0].subscription_totalprice) * 100;
  // console.log(completionRate);

  if (isError) {
    return <ErrorComponent />
  }

  return (
    <>
      {isLoading ? (
        <LoadingComponent/>
      ) : (
        dataRep && (
          <div
            className="w-[80%] h-4/5  mt-10  flex flex-col items-center justify-around bg-[#EDF0F4] rounded-xl shadow-innerneu2"
          >
            <BuildingImg
              img={dataRep.subscription_img_1}
              totalPrice={dataRep.subscription_totalprice}
            />
            <BuildingInfo
              name={dataRep.subscription_name}
              description={dataRep.subscription_description}
              completionRate={completionRate}
              restdate={dataRep.subscription_restdate}
            />
            <BuyBtn id={dataRep.id} restdate={dataRep.subscription_restdate} />
          </div>
        )
      )}
    </>
  );
};

export default Banner;
