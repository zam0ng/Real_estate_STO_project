import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import SingleDetail from "./SingleDetail";
import { serverurl } from "../../components/serverurl";

export interface AdditionalDetailBuildingRequest {
  floors: string;
  purpose: string;
  main_purpose: string;
  area: number;
  all_area: number;
  build_area: number;
  floor_area: number;
  completion: Date;
}

export interface AdditionalDetailPublishRequest {
  subscription_name: string;
  subscription_address: string;
  stock_type: string;
  publisher: string;
  subscription_totalsupply: number;
  subscription_offering_price: number;
  subscription_totalprice: number;
  subscription_start_date: string;
  subscription_end_date: string;
}

const additionalBuildingInfoFetch = async (
  propertyName: string
): Promise<AdditionalDetailBuildingRequest> => {
  const response = await fetch(
    `${serverurl}/market/detail/budling_info/${propertyName}`
  );
  if (!response.ok) {
    throw new Error("could not fetch data from /market/detail/budling_info");
  }
  return response.json();
};

const additionalPublishInfoFetch = async (
  propertyName: string
): Promise<AdditionalDetailPublishRequest> => {
  const response = await fetch(
    `${serverurl}/market/detail/publish_info/${propertyName}`
  );
  if (!response.ok) {
    throw new Error("could not fetch data from /market/detail/publish_info");
  }
  return response.json();
};

const DetailBox: React.FC = () => {
  const currentPage = useLocation();
  const propertyName = currentPage.state.propertyName;
  // // console.log(propertyName);
  const currentUrl = window.location.href;

  const isBuildingInfo = currentUrl.includes("property-info");
  const queryKey = isBuildingInfo
    ? ["buildingInfoFetch", propertyName]
    : ["publishInfoFetch", propertyName];
  const queryFn = isBuildingInfo
    ? () => additionalBuildingInfoFetch(propertyName)
    : () => additionalPublishInfoFetch(propertyName);

  const { data, error, isLoading, isError } = useQuery<any>({
    queryKey: queryKey,
    queryFn: queryFn,
  });
  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : cannot fetch data</div>;
  }

  return (
    <div className="w-full h-full rounded-lg border border-slate-300">
      {data &&
        Object.entries(data).map(([key, value]) => (
          <SingleDetail key={key} type={key} value={value} />
        ))}
    </div>
  );
};

export default DetailBox;
