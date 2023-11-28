import React, { useEffect, useState } from "react";
import { AdditionalDetailBuildingRequest } from "./DetailBox";

interface AdditionalBuildingInfoProps {
  type: string;
  value: any;
}

const SingleDetail: React.FC<AdditionalBuildingInfoProps> = ({
  type,
  value,
}) => {
  // // console.log(type,value);

  const [typeName, setTypeName] = useState<string>("");
  const [data, setData] = useState<string | number>("");

  useEffect(() => {
    if (type === "floors") {
      setTypeName("층수");
      setData(value);
    } else if (type === "purpose") {
      setTypeName("용도 지역");
      setData(value);
    } else if (type === "main_purpose") {
      setTypeName("주용도");
      setData(value);
    } else if (type === "area") {
      setTypeName("대지면적");
      setData(value);
    } else if (type === "all_area") {
      setTypeName("연면적");
      setData(value);
    } else if (type === "build_area") {
      setTypeName("건폐율");
      setData(value);
    } else if (type === "floor_area") {
      setTypeName("용적률");
      setData(value);
    } else if (type === "completion") {
      setTypeName("준공일");
      if (typeof value === "string") {
        setData(value.slice(0, 10));
      }
    } else if (type === "publisher") {
      setTypeName("발행인");
      setData(value);
    } else if (type === "stock_type") {
      setTypeName("증권 종류");
      setData(value);
    } else if (type === "subscription_address") {
      setTypeName("공모자산 위치");
      setData(value);
    } else if (type === "subscription_name") {
      setTypeName("공모자산");
      setData(value);
    } else if (type === "subscription_end_date") {
      setTypeName("청약 종료");
      if (typeof value === "string") {
        setData(value.slice(0, 10));
      }
    } else if (type === "subscription_offering_price") {
      setTypeName("발행 가액");
      setData(value);
    } else if (type === "subscription_start_date") {
      setTypeName("청약 시작");
      if (typeof value === "string") {
        setData(value.slice(0, 10));
      }
    } else if (type === "subscription_totalprice") {
      setTypeName("총 모집액");
      setData(value);
    } else if (type === "subscription_totalsupply") {
      setTypeName("발행 증권수");
      setData(value);
    }
  }, []);

  return (
    <div className="w-full h-10 flex flex-row justify-between pl-5 pr-5">
      <div className="font-semibold text-sm flex justify-center items-center">
        {typeName}
      </div>
      <div className="text-sm flex justify-center items-center">{data}</div>
    </div>
  );
};

export default SingleDetail;
