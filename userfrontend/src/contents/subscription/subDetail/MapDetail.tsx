import { SubDetail } from "../../../features/SubDetail";
import KakaoMap from "../../../components/KakaoMap";
import AOS from "aos";
import { useEffect } from "react";

type MapDetailType = {
  detail: SubDetail;
};

export default function MapDetail({ detail }: MapDetailType) {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  function formatCurrency(amount: string) {
    let newNum = parseInt(amount);
    return `${newNum.toLocaleString("ko-KR")}`;
  }

  let BuildingInfo = [
    { feature: "층수", value: detail.floors },
    { feature: "용도 지역", value: detail.purpose },
    { feature: "주용도", value: detail.main_purpose },
    { feature: "대지면적", value: detail.area },
    { feature: "연면적", value: detail.area },
    { feature: "건폐율", value: detail.build_area },
    { feature: "용적률", value: detail.floor_area },
    { feature: "준공일", value: detail.completion },
  ];

  let TokenInfo = [
    { feature: "공모자산", value: detail.subscription_name },
    { feature: "증권종류", value: detail.stock_type },
    { feature: "발행인", value: detail.publisher },
    {
      feature: "발행 증권수",
      value: formatCurrency(detail.subscription_totalsupply),
    },
    {
      feature: "발행 가액",
      value: formatCurrency(detail.subscription_offering_price),
    },
    {
      feature: "총 모집액",
      value: formatCurrency(detail.subscription_totalprice),
    },
    { feature: "청약 일정", value: detail.subscription_start_date },
  ];

  return (
    <div className="w-5/6  m-auto h-auto">
      <div className="text-xl font-bold ">{detail.subscription_name}</div>
      <div className="text-sm font-semibold text-gray-500 mb-3 ">
        📌{detail.subscription_address}
      </div>
      <KakaoMap
        addressKor={detail.subscription_address}
        width="h-5/6"
        height="h-52"
        data-aos="fade-up"
      />
      <div
        className="border rounded-2xl mt-9 bg-[#EDF0F4] rounded-xl shadow-neu2"
        data-aos="fade-up"
      >
        {BuildingInfo.map((i, index) => {
          return (
            <div key={index} className="h-12   flex justify-between ml-5 pt-1">
              <div className=" pt-2 font-extrabold text-sm">{i.feature}</div>
              <div className=" pt-2 text-gray-400 text-sm w-32  text-center">
                {i.value}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xl font-bold mt-9" data-aos="fade-up">
        발행 정보
      </div>
      <div
        className="border rounded-2xl mt-5 bg-[#EDF0F4] rounded-xl shadow-neu2"
        data-aos="fade-up"
      >
        {TokenInfo.map((i, index) => {
          return (
            <div key={index} className="h-12   flex justify-between ml-5 pt-1">
              <div className=" pt-2 font-extrabold text-sm">{i.feature}</div>
              <div className=" pt-2 text-gray-400 text-sm w-32  text-center">
                {i.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
