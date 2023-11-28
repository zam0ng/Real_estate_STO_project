import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackBtn from "../../../components/BackBtn";
import axios from "../../../components/url";
import { useQuery } from "@tanstack/react-query";

interface socketProps {
  isSocket: any;
}

const DealHeader: React.FC<socketProps> = ({ isSocket }) => {
  // ⭐ 현재 브라우저의 주소와 관련된 정보 제공.
  const currentPage = useLocation();
  // // console.log(currentPage.state.propertyName);
  const headerInfo = async () => {
    // // console.log("실행됨?");
    const { data } = await axios.get(
      `/order/header/${currentPage.state.propertyName}`
    );
    return data;
  };
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["headerInfo", currentPage.state.propertyName],
    queryFn: headerInfo,
  });
  // // console.log(data);
  // text-blue-500

  useEffect(() => {
    isSocket?.on("usequery_refetch", () => {
      refetch();
    });
  }, [isSocket, refetch]);

  return (
    <div className="flex flex-col justify-center place-items-center w-full h-1/6 border-b border-b-black">
      <div className="relative w-full h-1/2 flex justify-center items-end text-xl">
        <div className="absolute top-0 left-0">
          <BackBtn />
        </div>
        {currentPage.state.propertyName}
      </div>
      <div className="flex flex-row justify-center items-center w-full h-1/2 stext-sm">
        <div
          className={`w-16 h-1/2 flex justify-center items-center ${
            data?.rating < 0
              ? "text-blue-500"
              : data?.fluctuation_rate == 0
              ? "text-black-500"
              : "text-red-500"
          }`}
        >
          {data?.current_price}
        </div>
        <div
          className={`w-16 h-1/2 flex justify-center items-center mr-2 ml-2 ${
            data?.rating < 0
              ? "text-blue-500"
              : data?.fluctuation_rate == 0
              ? "text-black-500"
              : "text-red-500"
          }`}
        >
          {data?.fluctuation_rate?.toFixed(2)}%
        </div>
        <div
          className={`w-16 (1rem = font-size/4) h-1/2 flex justify-center items-center ${
            data?.rating < 0
              ? "text-blue-500"
              : data?.fluctuation_rate == 0
              ? "text-black-500"
              : "text-red-500"
          }`}
        >
          {data?.rating > 0 ? "+" + data?.rating : data?.rating}
        </div>
      </div>
    </div>
  );
};

export default DealHeader;
