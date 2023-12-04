import React, { useEffect } from "react";
import PropertyBox from "./property/PropertyBox";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { serverurl } from "../../../components/serverurl";
import LoadingComponent from "../../../components/LoadingComponent";
import AOS from "aos";

export interface PropertyInfo {
  start_price: number;
  current_price: number;
  fluctuation_rate: number;
  rating: number;
  "Subscription.subscription_img_1": string;
  "Subscription.subscription_name": string;
  "Subscription.subscription_description": string;
}

const queryPropertyList = async (): Promise<PropertyInfo[]> => {
  const response = await fetch(`${serverurl}/market/tradelist`);
  if (!response.ok) {
    throw new Error("Could not fetch data from /market/tradelist");
  }
  return response.json();
};

const PropertyListBox: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const navigation = useNavigate();

  const { data, error, isLoading, isError } = useQuery<PropertyInfo[], Error>({
    queryKey: ["tradeListData"],
    queryFn: queryPropertyList,
  });
  // console.log("property list data : ", data);

  const goToDetail = (propertyName: string) => {
    let selectedProperty;
    data?.map((item, index) => {
      if (propertyName === item["Subscription.subscription_name"]) {
        selectedProperty = data[index];
      }
    });
    navigation(`/market/${propertyName}`, {
      state: { propertyData: selectedProperty },
    });
  };

  if (isError) {
    return <div>Error : {error.message}</div>;
  }

  return (
    <div className="w-[80%] h-auto mt-10 pb-16 flex flex-col">
      <div className="w-[80%] h-20 flex flex-col justify-center items-start mb-5">
        <div className="text-2xl font-bold">거래중인 건물</div>
        <div className="text-sm text-gray-400">
          지금 바로 소유주가 되어보세요
        </div>
      </div>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        data &&
        data.map((item, index) => (
          <PropertyBox
            key={index}
            start_price={item.start_price}
            current_price={item.current_price}
            fluctuation_rate={item.fluctuation_rate}
            rating={item.rating}
            subscription_img_1={item["Subscription.subscription_img_1"]}
            subscription_name={item["Subscription.subscription_name"]}
            subscription_description={
              item["Subscription.subscription_description"]
            }
            navigator={goToDetail}
          />
        ))
      )}
    </div>
  );
};

export default PropertyListBox;
