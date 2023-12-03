import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { serverurl } from "../../../components/serverurl";
import LoadingComponent from "../../../components/LoadingComponent";

interface AdvertisementInfoRequest {
  subscription_img_1: string;
  subscription_description: string;
  subscription_name: string;
  subscription_restdate: number;
}

const SubscriptionAd: React.FC = () => {
  const fetchAdData = async (): Promise<AdvertisementInfoRequest[]> => {
    const { data } = await axios.get(`${serverurl}/main/banner`);
    return data;
  };

  const { data, error, isLoading, isError } = useQuery<
    AdvertisementInfoRequest[]
  >({
    queryKey: ["fetchAdData"],
    queryFn: fetchAdData,
  });

  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <div className="w-[80%] h-20  flex flex-col justify-center  mt-5 bg-[#EDF0F4] rounded-lg shadow-neu2">
      <div className="w-full h-1/2 flex justify-center items-center font-bold ">
        {data && data[0].subscription_name}
      </div>
      <div className="w-full h-1/2 flex justify-center items-center text-xs text-gray-400">
        지금 구매하세요!!
      </div>
    </div>
  );
};

export default SubscriptionAd;
